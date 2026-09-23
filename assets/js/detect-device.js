/**
 * WBD_Conditional_Block — client-side device/browser detection.
 *
 * Sets short-lived first-party cookies that the PHP condition engine
 * reads on the *next* page load/navigation, plus a body class for pure
 * CSS-based responsive tweaks. Runs as early as possible (loaded
 * blocking, in the head) with no external dependencies.
 *
 * This is intentionally plain, dependency-free JavaScript — it must run
 * on the frontend for every visitor, logged in or not, so it stays out
 * of the block-editor bundle entirely.
 */
( function () {
	'use strict';

	function setCookie( name, value, days ) {
		var expires = '';
		if ( days ) {
			var date = new Date();
			date.setTime( date.getTime() + days * 24 * 60 * 60 * 1000 );
			expires = '; expires=' + date.toUTCString();
		}
		document.cookie = name + '=' + encodeURIComponent( value ) + expires + '; path=/; SameSite=Lax';
	}

	function getCookie( name ) {
		var match = document.cookie.match( new RegExp( '(?:^|; )' + name + '=([^;]*)' ) );
		return match ? decodeURIComponent( match[ 1 ] ) : '';
	}

	function detectDeviceType() {
		var ua = navigator.userAgent || '';
		var isTablet =
			/iPad/i.test( ua ) ||
			( /Android/i.test( ua ) && ! /Mobile/i.test( ua ) ) ||
			( /Macintosh/i.test( ua ) && typeof document !== 'undefined' && 'ontouchend' in document );
		var isMobile = ! isTablet && /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test( ua );

		// Fall back to viewport width so window-resized/responsive testing
		// (and desktop browsers with small windows) still behaves sensibly.
		var width = window.innerWidth || document.documentElement.clientWidth;

		if ( isTablet || ( ! isMobile && width >= 600 && width < 960 ) ) {
			return 'tablet';
		}
		if ( isMobile || width < 600 ) {
			return 'mobile';
		}
		return 'desktop';
	}

	function detectBrowser() {
		var ua = navigator.userAgent || '';
		if ( ua.indexOf( 'Edg' ) > -1 ) return 'edge';
		if ( ua.indexOf( 'OPR' ) > -1 || ua.indexOf( 'Opera' ) > -1 ) return 'opera';
		if ( ua.indexOf( 'Chrome' ) > -1 ) return 'chrome';
		if ( ua.indexOf( 'Firefox' ) > -1 ) return 'firefox';
		if ( ua.indexOf( 'Safari' ) > -1 ) return 'safari';
		return 'other';
	}

	var device = detectDeviceType();
	var browser = detectBrowser();

	if ( getCookie( 'wbdcobl_device' ) !== device ) {
		setCookie( 'wbdcobl_device', device, 1 );
	}
	if ( getCookie( 'wbdcobl_browser' ) !== browser ) {
		setCookie( 'wbdcobl_browser', browser, 1 );
	}

	if ( document.body ) {
		applyBodyClasses();
	} else {
		document.addEventListener( 'DOMContentLoaded', applyBodyClasses );
	}

	function applyBodyClasses() {
		document.body.classList.add( 'wbdcobl-device-' + device );
		document.body.classList.add( 'wbdcobl-browser-' + browser );
	}
} )();
