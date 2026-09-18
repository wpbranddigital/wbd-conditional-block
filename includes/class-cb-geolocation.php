<?php
/**
 * Geolocation helper: resolves a visitor's country code.
 *
 * @package WBD_Conditional_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class CB_Geolocation
 *
 * Free-tier friendly IP-to-country lookup. Order of preference:
 *  1. A hosting/CDN header, when present (Cloudflare's CF-IPCountry,
 *     or a country header a developer maps via the
 *     `WBD_Conditional_Block_geolocation_header` filter) — free and instant.
 *  2. A developer-supplied resolver via `WBD_Conditional_Block_geolocation_country`.
 *  3. A best-effort external lookup (ip-api.com), cached in a transient
 *     per IP for 12 hours to stay within free rate limits and keep
 *     pages fast. Failures are cached too (short TTL) so a slow/broken
 *     API never blocks rendering.
 */
class CB_Geolocation {

	/**
	 * Get the ISO 3166-1 alpha-2 country code for the current visitor.
	 *
	 * @return string Two-letter country code, or '' if unknown.
	 */
	public static function get_country() {
		/**
		 * Short-circuit geolocation with a developer-supplied value
		 * (e.g. from a premium GeoIP database/service already in use
		 * on the site).
		 *
		 * @param string|null $country Return a 2-letter code to short-circuit, null to continue.
		 */
		$override = apply_filters( 'WBD_Conditional_Block_geolocation_country', null );
		if ( is_string( $override ) && '' !== $override ) {
			return strtoupper( $override );
		}

		// 1) CDN/hosting headers (no network request needed).
		$header_map = apply_filters(
			'WBD_Conditional_Block_geolocation_header',
			array( 'HTTP_CF_IPCOUNTRY', 'HTTP_X_COUNTRY_CODE', 'HTTP_X_APPENGINE_COUNTRY' )
		);

		foreach ( (array) $header_map as $header ) {
			if ( ! empty( $_SERVER[ $header ] ) ) {
				$code = strtoupper( sanitize_text_field( wp_unslash( $_SERVER[ $header ] ) ) );
				if ( preg_match( '/^[A-Z]{2}$/', $code ) && 'XX' !== $code ) {
					return $code;
				}
			}
		}

		// 2) Best-effort external API lookup, heavily cached.
		$ip = self::get_client_ip();
		if ( '' === $ip ) {
			return '';
		}

		$cache_key = 'cb_geo_' . md5( $ip );
		$cached    = get_transient( $cache_key );
		if ( false !== $cached ) {
			return $cached;
		}

		$country = self::lookup_via_api( $ip );

		// Cache the result (even an empty one) so a single visitor never
		// triggers more than one outbound request per 12 hours.
		set_transient( $cache_key, $country, $country ? 12 * HOUR_IN_SECONDS : 15 * MINUTE_IN_SECONDS );

		return $country;
	}

	/**
	 * Call a free IP geolocation API. Wrapped in try/catch-equivalent
	 * error checks so a network hiccup never surfaces to the visitor.
	 *
	 * @param string $ip IP address.
	 * @return string Two-letter country code, or ''.
	 */
	private static function lookup_via_api( $ip ) {
		if ( ! self::is_public_ip( $ip ) ) {
			return '';
		}

		$url = apply_filters(
			'WBD_Conditional_Block_geolocation_api_url',
			sprintf( 'https://ip-api.com/json/%s?fields=status,countryCode', rawurlencode( $ip ) ),
			$ip
		);

		$response = wp_remote_get(
			$url,
			array(
				'timeout' => 2,
			)
		);

		if ( is_wp_error( $response ) || 200 !== (int) wp_remote_retrieve_response_code( $response ) ) {
			return '';
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( empty( $body['status'] ) || 'success' !== $body['status'] || empty( $body['countryCode'] ) ) {
			return '';
		}

		return strtoupper( sanitize_text_field( $body['countryCode'] ) );
	}

	/**
	 * Get the visitor's IP address, respecting common proxy headers.
	 *
	 * @return string
	 */
	private static function get_client_ip() {
		$candidates = array( 'HTTP_CF_CONNECTING_IP', 'HTTP_X_REAL_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR' );

		foreach ( $candidates as $key ) {
			if ( empty( $_SERVER[ $key ] ) ) {
				continue;
			}

			$value = sanitize_text_field( wp_unslash( $_SERVER[ $key ] ) );
			$parts = explode( ',', $value );
			$ip    = trim( $parts[0] );

			if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
				return $ip;
			}
		}

		return '';
	}

	/**
	 * Check whether an IP is public (skip lookups for local/dev IPs).
	 *
	 * @param string $ip IP address.
	 * @return bool
	 */
	private static function is_public_ip( $ip ) {
		return false !== filter_var( $ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE );
	}
}
