<?php
/**
 * wp-admin: settings page + analytics dashboard.
 *
 * @package WBD_Conditional_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class WBDCOBL_Admin
 */
class WBDCOBL_Admin {

	/**
	 * Bootstrap.
	 */
	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'register_menu' ) );
		add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_admin_assets' ) );
		add_action( 'admin_post_cb_reset_analytics', array( __CLASS__, 'handle_reset_analytics' ) );
		add_filter( 'plugin_action_links_' . WBDCOBL_PLUGIN_BASENAME, array( __CLASS__, 'add_settings_link' ) );
	}

	/**
	 * The plugin's display name in wp-admin — the raw "WBD_Conditional_Block"
	 * unless a white-label name has been set in Settings.
	 *
	 * @return string
	 */
	public static function get_display_name() {
		$settings = get_option( 'wbdcobl_settings', array() );
		if ( ! empty( $settings['white_label_name'] ) ) {
			return $settings['white_label_name'];
		}
		return 'WBD_Conditional_Block';
	}

	/**
	 * Register the top-level admin menu and its two subpages.
	 */
	public static function register_menu() {
		$name = self::get_display_name();

		$hook = add_menu_page(
			$name,
			$name,
			'manage_options',
			'wbd-conditional-block',
			array( __CLASS__, 'render_analytics_page' ),
			'dashicons-visibility',
			58
		);

		add_submenu_page(
			'wbd-conditional-block',
			sprintf( /* translators: %s: plugin display name. */ __( '%s Analytics', 'wbd-conditional-block' ), $name ),
			__( 'Analytics', 'wbd-conditional-block' ),
			'manage_options',
			'wbd-conditional-block',
			array( __CLASS__, 'render_analytics_page' )
		);

		add_submenu_page(
			'wbd-conditional-block',
			sprintf( /* translators: %s: plugin display name. */ __( '%s Settings', 'wbd-conditional-block' ), $name ),
			__( 'Settings', 'wbd-conditional-block' ),
			'manage_options',
			'wbd-conditional-block-settings',
			array( __CLASS__, 'render_settings_page' )
		);

		add_action( 'load-' . $hook, array( __CLASS__, 'add_help_tab' ) );
	}

	/**
	 * Add a "Settings" link on the Plugins list screen.
	 *
	 * @param array $links Existing action links.
	 * @return array
	 */
	public static function add_settings_link( $links ) {
		$settings_link = sprintf(
			'<a href="%s">%s</a>',
			esc_url( admin_url( 'admin.php?page=wbd-conditional-block-settings' ) ),
			esc_html__( 'Settings', 'wbd-conditional-block' )
		);
		array_unshift( $links, $settings_link );
		return $links;
	}

	/**
	 * Register the Settings API fields for the Settings screen.
	 */
	public static function register_settings() {
		register_setting(
			'wbdcobl_settings_group',
			'wbdcobl_settings',
			array(
				'type'              => 'array',
				'sanitize_callback' => array( __CLASS__, 'sanitize_settings' ),
				'default'           => array(
					'white_label_name'     => '',
					'geolocation_provider' => 'auto',
					'analytics_enabled'    => true,
					'ab_testing_enabled'   => true,
				),
			)
		);
	}

	/**
	 * Sanitize the settings array on save.
	 *
	 * @param array $input Raw settings input.
	 * @return array
	 */
	public static function sanitize_settings( $input ) {
		$input = is_array( $input ) ? $input : array();

		return array(
			'white_label_name'     => isset( $input['white_label_name'] ) ? sanitize_text_field( $input['white_label_name'] ) : '',
			'geolocation_provider' => isset( $input['geolocation_provider'] ) && in_array( $input['geolocation_provider'], array( 'auto', 'header_only', 'disabled' ), true )
				? $input['geolocation_provider']
				: 'auto',
			'analytics_enabled'    => ! empty( $input['analytics_enabled'] ),
			'ab_testing_enabled'   => ! empty( $input['ab_testing_enabled'] ),
		);
	}

	/**
	 * Enqueue admin CSS only on our own screens.
	 *
	 * @param string $hook Current admin page hook.
	 */
	public static function enqueue_admin_assets( $hook ) {
		if ( false === strpos( $hook, 'wbd-conditional-block' ) ) {
			return;
		}

		wp_enqueue_style( 'wbd-conditional-block-admin', WBDCOBL_PLUGIN_URL . 'assets/css/admin.css', array(), WBDCOBL_VERSION );
	}

	/**
	 * Contextual help tab explaining the plugin briefly.
	 */
	public static function add_help_tab() {
		$screen = get_current_screen();
		if ( ! $screen ) {
			return;
		}
		$screen->add_help_tab(
			array(
				'id'      => 'wbdcobl-overview',
				'title'   => __( 'Overview', 'wbd-conditional-block' ),
				'content' => '<p>' . esc_html__( 'Add conditions to any block from the block editor sidebar (Conditional Visibility panel) to show or hide it for logged-in users, specific roles, devices, dates, countries, and more.', 'wbd-conditional-block' ) . '</p>',
			)
		);
	}

	/**
	 * Handle the "Reset analytics" form submission.
	 */
	public static function handle_reset_analytics() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to do this.', 'wbd-conditional-block' ) );
		}

		check_admin_referer( 'wbdcobl_reset_analytics' );

		require_once WBDCOBL_PLUGIN_DIR . 'includes/class-wbdcobl-analytics.php';
		WBDCOBL_Analytics::truncate();

		wp_safe_redirect(
			add_query_arg(
				array(
					'page'     => 'wbd-conditional-block',
					'wbdcobl_reset' => '1',
				),
				admin_url( 'admin.php' )
			)
		);
		exit;
	}

	/**
	 * Render the Analytics dashboard page.
	 */
	public static function render_analytics_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		require_once WBDCOBL_PLUGIN_DIR . 'includes/class-wbdcobl-analytics.php';

		$days    = isset( $_GET['wbdcobl_range'] ) ? max( 0, (int) $_GET['wbdcobl_range'] ) : 30; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$summary = WBDCOBL_Analytics::get_summary( $days );
		$daily   = WBDCOBL_Analytics::get_daily_totals( $days );
		$name    = self::get_display_name();

		include WBDCOBL_PLUGIN_DIR . 'includes/views/analytics-page.php';
	}

	/**
	 * Render the Settings page.
	 */
	public static function render_settings_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$settings = wp_parse_args(
			get_option( 'wbdcobl_settings', array() ),
			array(
				'white_label_name'     => '',
				'geolocation_provider' => 'auto',
				'analytics_enabled'    => true,
				'ab_testing_enabled'   => true,
			)
		);

		include WBDCOBL_PLUGIN_DIR . 'includes/views/settings-page.php';
	}
}
