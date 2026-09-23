/**
 * Shared constants for the Conditional Visibility editor UI.
 */
import { __ } from '@wordpress/i18n';

/**
 * Condition type option list. Keep the `value`s in sync with the PHP
 * switch statement in includes/class-wbdcobl-conditions.php.
 */
export const CONDITION_TYPES = [
	{
		value: 'login_status',
		label: __( 'Login Status', 'wbd-conditional-block' ),
	},
	{ value: 'user_role', label: __( 'User Role', 'wbd-conditional-block' ) },
	{ value: 'device_type', label: __( 'Device Type', 'wbd-conditional-block' ) },
	{ value: 'date_time', label: __( 'Date / Time', 'wbd-conditional-block' ) },
	{
		value: 'page_type',
		label: __( 'Page / Post Type', 'wbd-conditional-block' ),
	},
	{
		value: 'geolocation',
		label: __( 'Geolocation (Country)', 'wbd-conditional-block' ),
	},
	{ value: 'browser', label: __( 'Browser', 'wbd-conditional-block' ) },
	{ value: 'os', label: __( 'Operating System', 'wbd-conditional-block' ) },
	{ value: 'referrer', label: __( 'Referrer URL', 'wbd-conditional-block' ) },
	{
		value: 'query_string',
		label: __( 'Query String', 'wbd-conditional-block' ),
	},
	{ value: 'cookie', label: __( 'Cookie Value', 'wbd-conditional-block' ) },
	{ value: 'woocommerce', label: __( 'WooCommerce', 'wbd-conditional-block' ) },
	{
		value: 'custom_field',
		label: __( 'Custom Field (Meta/ACF)', 'wbd-conditional-block' ),
	},
	{ value: 'language', label: __( 'Language', 'wbd-conditional-block' ) },
	{ value: 'ab_test', label: __( 'A/B Test Variant', 'wbd-conditional-block' ) },
];

export const DEVICE_OPTIONS = [
	{ value: 'mobile', label: __( 'Mobile', 'wbd-conditional-block' ) },
	{ value: 'tablet', label: __( 'Tablet', 'wbd-conditional-block' ) },
	{ value: 'desktop', label: __( 'Desktop', 'wbd-conditional-block' ) },
];

export const BROWSER_OPTIONS = [
	{ value: 'chrome', label: 'Chrome' },
	{ value: 'firefox', label: 'Firefox' },
	{ value: 'safari', label: 'Safari' },
	{ value: 'edge', label: 'Edge' },
	{ value: 'opera', label: 'Opera' },
	{ value: 'other', label: __( 'Other', 'wbd-conditional-block' ) },
];

export const OS_OPTIONS = [
	{ value: 'windows', label: 'Windows' },
	{ value: 'macos', label: 'macOS' },
	{ value: 'linux', label: 'Linux' },
	{ value: 'ios', label: 'iOS' },
	{ value: 'android', label: 'Android' },
	{ value: 'other', label: __( 'Other', 'wbd-conditional-block' ) },
];

export const REFERRER_OPTIONS = [
	{ value: 'any', label: __( 'Any referrer', 'wbd-conditional-block' ) },
	{
		value: 'direct',
		label: __( 'Direct (no referrer)', 'wbd-conditional-block' ),
	},
	{ value: 'google', label: 'Google' },
	{ value: 'facebook', label: 'Facebook' },
	{ value: 'bing', label: 'Bing' },
	{ value: 'twitter', label: 'Twitter / X' },
	{ value: 'linkedin', label: 'LinkedIn' },
	{ value: 'youtube', label: 'YouTube' },
	{
		value: 'custom',
		label: __( 'Custom (contains…)', 'wbd-conditional-block' ),
	},
];

export const PAGE_SPECIAL_OPTIONS = [
	{
		value: '',
		label: __( 'Specific post types / posts', 'wbd-conditional-block' ),
	},
	{ value: 'front_page', label: __( 'Front page', 'wbd-conditional-block' ) },
	{ value: 'blog_home', label: __( 'Blog index', 'wbd-conditional-block' ) },
	{ value: 'single', label: __( 'Any single post', 'wbd-conditional-block' ) },
	{ value: 'archive', label: __( 'Any archive', 'wbd-conditional-block' ) },
	{ value: 'search', label: __( 'Search results', 'wbd-conditional-block' ) },
	{ value: '404', label: __( '404 (not found)', 'wbd-conditional-block' ) },
];

export const WOOCOMMERCE_CHECKS = [
	{
		value: 'cart_has_items',
		label: __( 'Cart has items', 'wbd-conditional-block' ),
	},
	{
		value: 'cart_value_min',
		label: __( 'Cart subtotal is at least…', 'wbd-conditional-block' ),
	},
	{
		value: 'purchased_product',
		label: __( 'Customer purchased product ID…', 'wbd-conditional-block' ),
	},
	{
		value: 'total_spent_min',
		label: __(
			'Customer lifetime spend is at least…',
			'wbd-conditional-block'
		),
	},
	{
		value: 'customer_vs_guest',
		label: __(
			'Is a logged-in customer (vs. guest)',
			'wbd-conditional-block'
		),
	},
];

export const CUSTOM_FIELD_COMPARES = [
	{ value: '=', label: __( 'Equals', 'wbd-conditional-block' ) },
	{ value: '!=', label: __( 'Does not equal', 'wbd-conditional-block' ) },
	{ value: '>', label: __( 'Greater than', 'wbd-conditional-block' ) },
	{ value: '<', label: __( 'Less than', 'wbd-conditional-block' ) },
	{
		value: '>=',
		label: __( 'Greater than or equal to', 'wbd-conditional-block' ),
	},
	{ value: '<=', label: __( 'Less than or equal to', 'wbd-conditional-block' ) },
	{ value: 'contains', label: __( 'Contains', 'wbd-conditional-block' ) },
	{ value: 'exists', label: __( 'Has any value', 'wbd-conditional-block' ) },
];

export const WEEKDAYS = [
	{ value: 0, label: __( 'Sun', 'wbd-conditional-block' ) },
	{ value: 1, label: __( 'Mon', 'wbd-conditional-block' ) },
	{ value: 2, label: __( 'Tue', 'wbd-conditional-block' ) },
	{ value: 3, label: __( 'Wed', 'wbd-conditional-block' ) },
	{ value: 4, label: __( 'Thu', 'wbd-conditional-block' ) },
	{ value: 5, label: __( 'Fri', 'wbd-conditional-block' ) },
	{ value: 6, label: __( 'Sat', 'wbd-conditional-block' ) },
];

/**
 * A fresh, empty condition row for the given type.
 *
 * @param {string} type Condition type key.
 * @return {Object} condition
 */
export function createEmptyCondition( type = 'login_status' ) {
	const defaults = {
		login_status: 'logged_in',
		user_role: [ 'administrator' ],
		device_type: 'mobile',
		date_time: { mode: 'range', start: '', end: '' },
		page_type: { special: 'front_page', post_types: [], post_ids: [] },
		geolocation: [ 'US' ],
		browser: 'chrome',
		os: 'windows',
		referrer: 'any',
		query_string: { key: '', value: '' },
		cookie: { name: '', value: '' },
		woocommerce: { check: 'cart_has_items' },
		custom_field: { key: '', compare: '=', value: '' },
		language: 'en',
		ab_test: 'a',
	};

	return {
		type,
		operator: 'is',
		value: defaults[ type ] !== undefined ? defaults[ type ] : '',
	};
}

/**
 * Generate a short, url-safe unique id for a block instance so analytics
 * can track it across renders/edits.
 *
 * @return {string} id
 */
export function generateUid() {
	return (
		'cb' +
		Math.random().toString( 36 ).slice( 2, 10 ) +
		Date.now().toString( 36 ).slice( -4 )
	);
}
