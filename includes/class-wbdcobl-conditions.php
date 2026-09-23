<?php
/**
 * Condition evaluation engine.
 *
 * @package WBD_Conditional_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class WBDCOBL_Conditions
 *
 * Evaluates a single condition (type + value + operator) against the
 * current request. Developers can register additional condition types
 * with the `WBD_Conditional_Block_register_condition` filter, e.g.:
 *
 *     add_filter( 'WBD_Conditional_Block_register_condition', function( $conditions ) {
 *         $conditions['my_condition'] = function( $value, $context ) {
 *             return $value === 'yes';
 *         };
 *         return $conditions;
 *     } );
 */
class WBDCOBL_Conditions {

	/**
	 * Cache of registered custom condition callbacks.
	 *
	 * @var array|null
	 */
	private static $custom_conditions = null;

	/**
	 * Built-in condition types, used by the editor UI and for validation.
	 *
	 * @return array
	 */
	public static function get_condition_types() {
		$types = array(
			'login_status' => __( 'Login Status', 'wbd-conditional-block' ),
			'user_role'    => __( 'User Role', 'wbd-conditional-block' ),
			'device_type'  => __( 'Device Type', 'wbd-conditional-block' ),
			'date_time'    => __( 'Date / Time', 'wbd-conditional-block' ),
			'page_type'    => __( 'Page / Post Type', 'wbd-conditional-block' ),
			'geolocation'  => __( 'Geolocation (Country)', 'wbd-conditional-block' ),
			'browser'      => __( 'Browser', 'wbd-conditional-block' ),
			'os'           => __( 'Operating System', 'wbd-conditional-block' ),
			'referrer'     => __( 'Referrer URL', 'wbd-conditional-block' ),
			'query_string' => __( 'Query String', 'wbd-conditional-block' ),
			'cookie'       => __( 'Cookie Value', 'wbd-conditional-block' ),
			'woocommerce'  => __( 'WooCommerce', 'wbd-conditional-block' ),
			'custom_field' => __( 'Custom Field (Meta/ACF)', 'wbd-conditional-block' ),
			'language'     => __( 'Language', 'wbd-conditional-block' ),
			'ab_test'      => __( 'A/B Test Variant', 'wbd-conditional-block' ),
		);

		/**
		 * Filter the list of human-readable condition type labels
		 * shown in the block editor. Pair with
		 * `WBD_Conditional_Block_register_condition` to add matching logic.
		 *
		 * @param array $types type => label.
		 */
		return apply_filters( 'WBD_Conditional_Block_condition_types', $types );
	}

	/**
	 * Evaluate a single condition rule.
	 *
	 * @param array $condition {
	 *     @type string $type     One of get_condition_types() keys, or a custom registered type.
	 *     @type mixed  $value    Condition-specific value (string, array, etc.).
	 *     @type string $operator 'is' (default) or 'is_not' — negates the result.
	 * }
	 * @return bool
	 */
	public static function evaluate( $condition ) {
		$type     = isset( $condition['type'] ) ? sanitize_key( $condition['type'] ) : '';
		$value    = isset( $condition['value'] ) ? $condition['value'] : '';
		$operator = isset( $condition['operator'] ) && 'is_not' === $condition['operator'] ? 'is_not' : 'is';

		$result = self::check( $type, $value );

		return 'is_not' === $operator ? ! $result : $result;
	}

	/**
	 * Route a condition type to its checker.
	 *
	 * @param string $type  Condition type key.
	 * @param mixed  $value Condition value.
	 * @return bool
	 */
	private static function check( $type, $value ) {
		switch ( $type ) {
			case 'login_status':
				return self::check_login_status( $value );

			case 'user_role':
				return self::check_user_role( $value );

			case 'device_type':
				return self::check_device_type( $value );

			case 'date_time':
				return self::check_date_time( $value );

			case 'page_type':
				return self::check_page_type( $value );

			case 'geolocation':
				return self::check_geolocation( $value );

			case 'browser':
				return self::check_browser( $value );

			case 'os':
				return self::check_os( $value );

			case 'referrer':
				return self::check_referrer( $value );

			case 'query_string':
				return self::check_query_string( $value );

			case 'cookie':
				return self::check_cookie( $value );

			case 'woocommerce':
				return self::check_woocommerce( $value );

			case 'custom_field':
				return self::check_custom_field( $value );

			case 'language':
				return self::check_language( $value );

			case 'ab_test':
				return self::check_ab_test( $value );

			default:
				return self::check_custom( $type, $value );
		}
	}

	/**
	 * Login Status: value is 'logged_in' or 'logged_out'.
	 *
	 * @param string $value Value.
	 * @return bool
	 */
	private static function check_login_status( $value ) {
		$logged_in = is_user_logged_in();
		return 'logged_out' === $value ? ! $logged_in : $logged_in;
	}

	/**
	 * User Role: value is a role slug, or array of role slugs (any match),
	 * plus the special 'wc_customer' pseudo-role.
	 *
	 * @param string|array $value Role slug(s).
	 * @return bool
	 */
	private static function check_user_role( $value ) {
		if ( ! is_user_logged_in() ) {
			return false;
		}

		$roles = is_array( $value ) ? $value : array( $value );
		$roles = array_filter( array_map( 'sanitize_key', $roles ) );

		if ( empty( $roles ) ) {
			return false;
		}

		$user = wp_get_current_user();

		foreach ( $roles as $role ) {
			if ( 'wc_customer' === $role ) {
				if ( class_exists( 'WooCommerce' ) && function_exists( 'wc_customer_bought_product' ) ) {
					if ( wc_customer_bought_product( $user->user_email, $user->ID, 0 ) ) {
						return true;
					}
				}
				continue;
			}

			if ( in_array( $role, (array) $user->roles, true ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Device Type: value is 'mobile' | 'tablet' | 'desktop'.
	 *
	 * Prefers the client-side cookie set by assets/js/detect-device.js
	 * (accurate tablet vs. mobile split); falls back to wp_is_mobile()
	 * server-side for the very first request/cached pages.
	 *
	 * @param string $value Value.
	 * @return bool
	 */
	private static function check_device_type( $value ) {
		$device = isset( $_COOKIE['wbdcobl_device'] ) ? sanitize_key( wp_unslash( $_COOKIE['wbdcobl_device'] ) ) : '';

		if ( in_array( $device, array( 'mobile', 'tablet', 'desktop' ), true ) ) {
			return $device === $value;
		}

		// Fallback: WordPress core only distinguishes mobile vs. not-mobile.
		$is_mobile = wp_is_mobile();

		if ( 'mobile' === $value ) {
			return $is_mobile;
		}

		if ( 'desktop' === $value ) {
			return ! $is_mobile;
		}

		return false; // Can't reliably detect 'tablet' server-side.
	}

	/**
	 * Date/Time: value is an array with:
	 *   mode: 'range' | 'recurring_day' | 'countdown'
	 *   start, end (for range/countdown; ISO 8601 or Y-m-d H:i:s, site timezone)
	 *   days (array of 0-6 for recurring_day, 0=Sunday)
	 *   time_start, time_end (H:i, optional, for recurring_day)
	 *
	 * @param array $value Value.
	 * @return bool
	 */
	private static function check_date_time( $value ) {
		if ( ! is_array( $value ) ) {
			return false;
		}

		$mode = isset( $value['mode'] ) ? $value['mode'] : 'range';
		$now  = current_time( 'timestamp' ); // phpcs:ignore WordPress.DateTime.CurrentTimeTimestamp.Requested

		if ( 'recurring_day' === $mode ) {
			$days = isset( $value['days'] ) && is_array( $value['days'] ) ? array_map( 'intval', $value['days'] ) : array();

			if ( ! in_array( (int) gmdate( 'w', $now ), $days, true ) ) {
				return false;
			}

			if ( ! empty( $value['time_start'] ) && ! empty( $value['time_end'] ) ) {
				$current_hm = gmdate( 'H:i', $now );
				return $current_hm >= $value['time_start'] && $current_hm <= $value['time_end'];
			}

			return true;
		}

		// 'range' and 'countdown' both boil down to "is $now within [start, end]".
		$start = ! empty( $value['start'] ) ? strtotime( $value['start'] ) : false;
		$end   = ! empty( $value['end'] ) ? strtotime( $value['end'] ) : false;

		if ( false === $start && false === $end ) {
			return true; // No bounds set — always active.
		}

		if ( false !== $start && $now < $start ) {
			return false;
		}

		if ( false !== $end && $now > $end ) {
			return false;
		}

		return true;
	}

	/**
	 * Page/Post Type: value is an array with:
	 *   post_types: array of post type slugs, OR
	 *   special: 'front_page' | 'search' | 'archive' | '404' | 'single' | 'blog_home'
	 *   post_ids: array of specific post/page IDs.
	 *
	 * @param array $value Value.
	 * @return bool
	 */
	private static function check_page_type( $value ) {
		if ( ! is_array( $value ) ) {
			return false;
		}

		if ( ! empty( $value['post_ids'] ) ) {
			$ids = array_map( 'intval', (array) $value['post_ids'] );
			if ( is_singular() && in_array( get_the_ID(), $ids, true ) ) {
				return true;
			}
		}

		if ( ! empty( $value['special'] ) ) {
			switch ( $value['special'] ) {
				case 'front_page':
					return is_front_page();
				case 'blog_home':
					return is_home();
				case 'search':
					return is_search();
				case 'archive':
					return is_archive();
				case '404':
					return is_404();
				case 'single':
					return is_single();
			}
		}

		if ( ! empty( $value['post_types'] ) ) {
			$types = array_map( 'sanitize_key', (array) $value['post_types'] );
			return is_singular( $types ) || is_post_type_archive( $types );
		}

		return false;
	}

	/**
	 * Geolocation: value is an array of ISO country codes (any match).
	 *
	 * @param array $value Value.
	 * @return bool
	 */
	private static function check_geolocation( $value ) {
		$countries = is_array( $value ) ? $value : array( $value );
		$countries = array_filter( array_map( 'strtoupper', array_map( 'sanitize_text_field', $countries ) ) );

		if ( empty( $countries ) ) {
			return false;
		}

		$user_country = WBDCOBL_Geolocation::get_country();

		if ( empty( $user_country ) ) {
			return false;
		}

		return in_array( $user_country, $countries, true );
	}

	/**
	 * Browser: value is 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'other'.
	 *
	 * @param string $value Value.
	 * @return bool
	 */
	private static function check_browser( $value ) {
		return self::detect_browser() === $value;
	}

	/**
	 * OS: value is 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'other'.
	 *
	 * @param string $value Value.
	 * @return bool
	 */
	private static function check_os( $value ) {
		return self::detect_os() === $value;
	}

	/**
	 * Detect the browser from the User-Agent header.
	 *
	 * @return string
	 */
	public static function detect_browser() {
		$agent = isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';

		if ( '' === $agent ) {
			return 'other';
		}

		if ( false !== stripos( $agent, 'Edg' ) ) {
			return 'edge';
		}
		if ( false !== stripos( $agent, 'OPR' ) || false !== stripos( $agent, 'Opera' ) ) {
			return 'opera';
		}
		if ( false !== stripos( $agent, 'Chrome' ) ) {
			return 'chrome';
		}
		if ( false !== stripos( $agent, 'Firefox' ) ) {
			return 'firefox';
		}
		if ( false !== stripos( $agent, 'Safari' ) ) {
			return 'safari';
		}

		return 'other';
	}

	/**
	 * Detect the OS from the User-Agent header.
	 *
	 * @return string
	 */
	public static function detect_os() {
		$agent = isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';

		if ( '' === $agent ) {
			return 'other';
		}

		if ( false !== stripos( $agent, 'Android' ) ) {
			return 'android';
		}
		if ( preg_match( '/iPhone|iPad|iPod/i', $agent ) ) {
			return 'ios';
		}
		if ( false !== stripos( $agent, 'Windows' ) ) {
			return 'windows';
		}
		if ( false !== stripos( $agent, 'Macintosh' ) || false !== stripos( $agent, 'Mac OS' ) ) {
			return 'macos';
		}
		if ( false !== stripos( $agent, 'Linux' ) ) {
			return 'linux';
		}

		return 'other';
	}

	/**
	 * Referrer URL: value is a substring to match against HTTP_REFERER,
	 * or one of the special shortcuts: 'google', 'facebook', 'direct', 'any'.
	 *
	 * @param string $value Value.
	 * @return bool
	 */
	private static function check_referrer( $value ) {
		$referrer = isset( $_SERVER['HTTP_REFERER'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) : '';

		if ( 'direct' === $value ) {
			return '' === $referrer;
		}

		if ( 'any' === $value ) {
			return '' !== $referrer;
		}

		if ( '' === $referrer ) {
			return false;
		}

		$shortcuts = array(
			'google'   => 'google.',
			'facebook' => 'facebook.',
			'bing'     => 'bing.',
			'twitter'  => array( 'twitter.', 'x.com' ),
			'linkedin' => 'linkedin.',
			'youtube'  => 'youtube.',
		);

		if ( isset( $shortcuts[ $value ] ) ) {
			foreach ( (array) $shortcuts[ $value ] as $needle ) {
				if ( false !== stripos( $referrer, $needle ) ) {
					return true;
				}
			}
			return false;
		}

		return '' !== $value && false !== stripos( $referrer, $value );
	}

	/**
	 * Query String: value is an array with 'key' and optional 'value'.
	 * If 'value' is empty, only presence of the key is checked.
	 *
	 * @param array $value Value.
	 * @return bool
	 */
	private static function check_query_string( $value ) {
		if ( ! is_array( $value ) || empty( $value['key'] ) ) {
			return false;
		}

		$key = sanitize_key( $value['key'] );

		if ( ! isset( $_GET[ $key ] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return false;
		}

		if ( empty( $value['value'] ) ) {
			return true;
		}

		$actual = sanitize_text_field( wp_unslash( $_GET[ $key ] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return $actual === (string) $value['value'];
	}

	/**
	 * Cookie: value is an array with 'name' and optional 'value'.
	 *
	 * @param array $value Value.
	 * @return bool
	 */
	private static function check_cookie( $value ) {
		if ( ! is_array( $value ) || empty( $value['name'] ) ) {
			return false;
		}

		$name = sanitize_key( $value['name'] );

		if ( ! isset( $_COOKIE[ $name ] ) ) {
			return false;
		}

		if ( empty( $value['value'] ) ) {
			return true;
		}

		$actual = sanitize_text_field( wp_unslash( $_COOKIE[ $name ] ) );
		return $actual === (string) $value['value'];
	}

	/**
	 * WooCommerce: value is an array with:
	 *   check: 'purchased_product' | 'cart_has_items' | 'cart_value_min' | 'customer_vs_guest' | 'total_spent_min'
	 *   product_id, amount, etc. depending on `check`.
	 *
	 * @param array $value Value.
	 * @return bool
	 */
	private static function check_woocommerce( $value ) {
		if ( ! class_exists( 'WooCommerce' ) || ! is_array( $value ) || empty( $value['check'] ) ) {
			return false;
		}

		switch ( $value['check'] ) {
			case 'purchased_product':
				if ( ! is_user_logged_in() || empty( $value['product_id'] ) ) {
					return false;
				}
				return (bool) wc_customer_bought_product( '', get_current_user_id(), (int) $value['product_id'] );

			case 'cart_has_items':
				return function_exists( 'WC' ) && WC()->cart && ! WC()->cart->is_empty();

			case 'cart_value_min':
				if ( ! function_exists( 'WC' ) || ! WC()->cart ) {
					return false;
				}
				$min = isset( $value['amount'] ) ? (float) $value['amount'] : 0;
				return (float) WC()->cart->get_subtotal() >= $min;

			case 'customer_vs_guest':
				$want_customer = ! empty( $value['is_customer'] );
				return $want_customer ? is_user_logged_in() : ! is_user_logged_in();

			case 'total_spent_min':
				if ( ! is_user_logged_in() || ! function_exists( 'wc_get_customer_total_spent' ) ) {
					return false;
				}
				$min = isset( $value['amount'] ) ? (float) $value['amount'] : 0;
				return (float) wc_get_customer_total_spent( get_current_user_id() ) >= $min;
		}

		return false;
	}

	/**
	 * Custom Field: value is an array with 'key', 'compare' (=, !=, >, <, >=, <=, contains, exists), 'value'.
	 * Uses ACF's get_field() when available, falling back to get_post_meta().
	 *
	 * @param array $value Value.
	 * @return bool
	 */
	private static function check_custom_field( $value ) {
		if ( ! is_array( $value ) || empty( $value['key'] ) || ! is_singular() ) {
			return false;
		}

		$post_id = get_the_ID();
		$key     = sanitize_text_field( $value['key'] );
		$compare = isset( $value['compare'] ) ? $value['compare'] : '=';

		$actual = function_exists( 'get_field' ) ? get_field( $key, $post_id ) : get_post_meta( $post_id, $key, true );

		if ( 'exists' === $compare ) {
			return ! empty( $actual ) || ( false !== $actual && '' !== $actual && null !== $actual );
		}

		$expected = isset( $value['value'] ) ? $value['value'] : '';

		switch ( $compare ) {
			case '!=':
				return (string) $actual !== (string) $expected;
			case '>':
				return (float) $actual > (float) $expected;
			case '<':
				return (float) $actual < (float) $expected;
			case '>=':
				return (float) $actual >= (float) $expected;
			case '<=':
				return (float) $actual <= (float) $expected;
			case 'contains':
				return false !== stripos( (string) $actual, (string) $expected );
			default:
				return (string) $actual === (string) $expected;
		}
	}

	/**
	 * Language: value is a WordPress locale code (e.g. 'bn_BD', 'en_US')
	 * or a 2-letter language prefix (e.g. 'bn', 'en'). Compares against
	 * the site's active locale and, if present, the visitor's browser
	 * Accept-Language header.
	 *
	 * @param string $value Value.
	 * @return bool
	 */
	private static function check_language( $value ) {
		$value = sanitize_text_field( $value );

		if ( '' === $value ) {
			return false;
		}

		$site_locale = get_locale();
		if ( 0 === stripos( $site_locale, $value ) ) {
			return true;
		}

		if ( isset( $_SERVER['HTTP_ACCEPT_LANGUAGE'] ) ) {
			$accept = sanitize_text_field( wp_unslash( $_SERVER['HTTP_ACCEPT_LANGUAGE'] ) );
			if ( false !== stripos( $accept, $value ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * A/B Test Variant: value is 'a' or 'b'. Assignment is a 50/50 split
	 * persisted in a first-party cookie so a visitor keeps seeing the
	 * same variant across a session (see assets/js/detect-device.js and
	 * WBDCOBL_Renderer::maybe_set_ab_cookie()).
	 *
	 * @param string $value Value.
	 * @return bool
	 */
	private static function check_ab_test( $value ) {
		$variant = isset( $_COOKIE['wbdcobl_ab_variant'] ) ? sanitize_key( wp_unslash( $_COOKIE['wbdcobl_ab_variant'] ) ) : '';

		if ( ! in_array( $variant, array( 'a', 'b' ), true ) ) {
			$variant = WBDCOBL_Renderer::get_or_assign_ab_variant();
		}

		return strtolower( (string) $value ) === $variant;
	}

	/**
	 * Look up and run a developer-registered custom condition type.
	 *
	 * @param string $type  Condition type key.
	 * @param mixed  $value Condition value.
	 * @return bool
	 */
	private static function check_custom( $type, $value ) {
		if ( null === self::$custom_conditions ) {
			/**
			 * Register custom condition type callbacks.
			 *
			 * @param array $conditions Map of type => callable( $value, $context ): bool.
			 */
			self::$custom_conditions = apply_filters( 'WBD_Conditional_Block_register_condition', array() );
		}

		if ( isset( self::$custom_conditions[ $type ] ) && is_callable( self::$custom_conditions[ $type ] ) ) {
			return (bool) call_user_func( self::$custom_conditions[ $type ], $value, array( 'type' => $type ) );
		}

		return false;
	}
}
