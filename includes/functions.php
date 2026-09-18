<?php
/**
 * Small procedural helpers shared across classes.
 *
 * @package WBD_Conditional_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'wbd_conditional_block_set_cookie' ) ) {
	/**
	 * Thin wrapper around setcookie() so behavior is consistent across
	 * PHP versions (the options-array signature was added in PHP 7.3).
	 *
	 * @param string $name   Cookie name.
	 * @param string $value  Cookie value.
	 * @param int    $expire Expiry timestamp.
	 */
	function wbd_conditional_block_set_cookie( $name, $value, $expire ) {
		$secure = is_ssl();

		if ( PHP_VERSION_ID >= 70300 ) {
			setcookie(
				$name,
				$value,
				array(
					'expires'  => $expire,
					'path'     => defined( 'COOKIEPATH' ) ? COOKIEPATH : '/',
					'domain'   => defined( 'COOKIE_DOMAIN' ) ? COOKIE_DOMAIN : '',
					'secure'   => $secure,
					'httponly' => false,
					'samesite' => 'Lax',
				)
			);
		} else {
			setcookie( $name, $value, $expire, defined( 'COOKIEPATH' ) ? COOKIEPATH : '/', defined( 'COOKIE_DOMAIN' ) ? COOKIE_DOMAIN : '', $secure );
		}
	}
}
