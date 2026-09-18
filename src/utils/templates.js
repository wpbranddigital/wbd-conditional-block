/**
 * Pre-built condition templates — one click fills in a common scenario.
 */
import { __ } from '@wordpress/i18n';

const templates = [
	{
		key: 'logged_in_only',
		label: __( 'Show only to logged-in users', 'wbd-conditional-block' ),
		rules: {
			logic: 'all',
			conditions: [
				{ type: 'login_status', operator: 'is', value: 'logged_in' },
			],
		},
	},
	{
		key: 'logged_out_only',
		label: __( 'Show only to logged-out visitors', 'wbd-conditional-block' ),
		rules: {
			logic: 'all',
			conditions: [
				{ type: 'login_status', operator: 'is', value: 'logged_out' },
			],
		},
	},
	{
		key: 'hide_on_mobile',
		label: __( 'Hide on mobile devices', 'wbd-conditional-block' ),
		rules: {
			logic: 'all',
			conditions: [
				{ type: 'device_type', operator: 'is_not', value: 'mobile' },
			],
		},
	},
	{
		key: 'mobile_only_cta',
		label: __( 'Mobile-only call to action', 'wbd-conditional-block' ),
		rules: {
			logic: 'all',
			conditions: [
				{ type: 'device_type', operator: 'is', value: 'mobile' },
			],
		},
	},
	{
		key: 'admins_only',
		label: __( 'Show only to administrators', 'wbd-conditional-block' ),
		rules: {
			logic: 'all',
			conditions: [
				{
					type: 'user_role',
					operator: 'is',
					value: [ 'administrator' ],
				},
			],
		},
	},
	{
		key: 'members_offer',
		label: __(
			'Exclusive offer for logged-in members',
			'wbd-conditional-block'
		),
		rules: {
			logic: 'all',
			conditions: [
				{ type: 'login_status', operator: 'is', value: 'logged_in' },
				{
					type: 'user_role',
					operator: 'is',
					value: [ 'subscriber', 'customer' ],
				},
			],
		},
	},
	{
		key: 'ab_test_split',
		label: __( 'A/B test this block (Variant A)', 'wbd-conditional-block' ),
		rules: {
			logic: 'all',
			conditions: [ { type: 'ab_test', operator: 'is', value: 'a' } ],
		},
	},
];

export default templates;
