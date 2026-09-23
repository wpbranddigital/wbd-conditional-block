<?php
/**
 * Plugin Name:       WBD Conditional Block
 * Description:       Show or hide any Gutenberg block based on login status, user role, device, date/time, page type, country, WooCommerce, custom fields, language, and A/B testing — with AND/OR logic and built-in analytics. All features are free.
 * Version:           1.0.1
 * Requires at least: 6.5 
 * Requires PHP:      7.4
 * Author:            WPBrand Digital
 * Author URI:        https://wpbranddigital.org
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wbd-conditional-block
 * Domain Path:       /languages
 *
 * @package WBD_Conditional_Block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Plugin constants.
 */
define( 'WBDCOBL_VERSION', '1.0.1' );
define( 'WBDCOBL_PLUGIN_FILE', __FILE__ );
define( 'WBDCOBL_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'WBDCOBL_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'WBDCOBL_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
define( 'WBDCOBL_ANALYTICS_TABLE_VERSION', '1.0' );

/**
 * Main plugin bootstrap class.
 *
 * Loads all subsystems and wires up WordPress hooks. Kept intentionally
 * small: each subsystem lives in its own class under includes/ so the
 * plugin stays easy to extend (see the WBD_Conditional_Block_register_condition
 * developer filter for adding custom condition types).
 */
final class WBD_Conditional_Block {

	/**
	 * Singleton instance.
	 *
	 * @var WBD_Conditional_Block|null
	 */
	private static $instance = null;

	/**
	 * Get (or create) the singleton instance.
	 *
	 * @return WBD_Conditional_Block
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor. Private — use instance().
	 */
	private function __construct() {
		$this->includes();
		$this->init_hooks();
	}

	/**
	 * Require all class files.
	 */
	private function includes() {
		require_once WBDCOBL_PLUGIN_DIR . 'includes/functions.php';
		require_once WBDCOBL_PLUGIN_DIR . 'includes/class-wbdcobl-conditions.php';
		require_once WBDCOBL_PLUGIN_DIR . 'includes/class-wbdcobl-geolocation.php';
		require_once WBDCOBL_PLUGIN_DIR . 'includes/class-wbdcobl-renderer.php';
		require_once WBDCOBL_PLUGIN_DIR . 'includes/class-wbdcobl-analytics.php';
		require_once WBDCOBL_PLUGIN_DIR . 'includes/class-wbdcobl-rest-api.php';
		require_once WBDCOBL_PLUGIN_DIR . 'includes/class-wbdcobl-admin.php';
		require_once WBDCOBL_PLUGIN_DIR . 'includes/class-wbdcobl-block-group.php';
	}

	/**
	 * Register WordPress hooks.
	 */
	private function init_hooks() {
		register_activation_hook( WBDCOBL_PLUGIN_FILE, array( __CLASS__, 'activate' ) );
		register_deactivation_hook( WBDCOBL_PLUGIN_FILE, array( __CLASS__, 'deactivate' ) );

		add_action( 'init', array( $this, 'register_block_attributes' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_assets' ) );

		// Subsystem bootstraps.
		WBDCOBL_Renderer::init();
		WBDCOBL_Analytics::init();
		WBDCOBL_REST_API::init();
		WBDCOBL_Admin::init();
		WBDCOBL_Block_Group::init();
	}



	/**
	 * Register the `cbConditions` attribute on every core block via
	 * `register_block_type_args`. This lets the block editor filter
	 * (src/index.js) persist condition data on ANY block — not just a
	 * custom one — which is the plugin's core USP.
	 */
	public function register_block_attributes() {
		add_filter( 'register_block_type_args', array( $this, 'add_condition_attribute' ), 10, 2 );
	}

	/**
	 * Add the cbConditions attribute definition to a block's args.
	 *
	 * @param array  $args       Block type args.
	 * @param string $block_name Block name.
	 * @return array
	 */
	public function add_condition_attribute( $args, $block_name ) {
		$excluded = array( 'core/freeform', 'core/legacy-widget', 'core/widget-area' );

		if ( in_array( $block_name, $excluded, true ) ) {
			return $args;
		}

		if ( ! isset( $args['attributes'] ) || ! is_array( $args['attributes'] ) ) {
			$args['attributes'] = array();
		}

		if ( ! isset( $args['attributes']['cbConditions'] ) ) {
			$args['attributes']['cbConditions'] = array(
				'type'    => 'object',
				'default' => array(
					'enabled'    => false,
					'logic'      => 'all',
					'conditions' => array(),
					'uid'        => '',
					'fallback'   => 'hide',
				),
			);
		}

		return $args;
	}

	/**
	 * Enqueue block-editor-only assets (the Conditional Visibility panel).
	 */
	public function enqueue_editor_assets() {
		$asset_file = WBDCOBL_PLUGIN_DIR . 'build/index.asset.php';
		$asset      = file_exists( $asset_file )
			? include $asset_file
			: array(
				'dependencies' => array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-hooks', 'wp-compose', 'wp-data', 'wp-block-editor' ),
				'version'      => WBDCOBL_VERSION,
			);

		wp_enqueue_script(
			'wbd-conditional-block-editor',
			WBDCOBL_PLUGIN_URL . 'build/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_set_script_translations( 'wbd-conditional-block-editor', 'wbd-conditional-block', WBDCOBL_PLUGIN_DIR . 'languages' );

		wp_enqueue_style(
			'wbd-conditional-block-editor',
			WBDCOBL_PLUGIN_URL . 'build/index.css',
			array( 'wp-components' ),
			file_exists( WBDCOBL_PLUGIN_DIR . 'build/index.css' ) ? filemtime( WBDCOBL_PLUGIN_DIR . 'build/index.css' ) : WBDCOBL_VERSION
		);

		$roles = array();
		foreach ( wp_roles()->roles as $slug => $role ) {
			$roles[] = array(
				'value' => $slug,
				'label' => translate_user_role( $role['name'] ),
			);
		}

		wp_localize_script(
			'wbd-conditional-block-editor',
			'WBD_Conditional_BlockData',
			array(
				'roles'          => $roles,
				'postTypes'      => $this->get_public_post_type_options(),
				'hasWooCommerce' => class_exists( 'WooCommerce' ),
				'hasACF'         => function_exists( 'get_field' ),
				'restUrl'        => esc_url_raw( rest_url( 'wbd-conditional-block/v1/' ) ),
				'nonce'          => wp_create_nonce( 'wp_rest' ),
				'adminUrl'       => esc_url_raw( admin_url( 'admin.php?page=wbd-conditional-block' ) ),
				'pluginName'     => WBDCOBL_Admin::get_display_name(),
			)
		);
	}

	/**
	 * Build the list of public post types for the "Page/Post Type" condition.
	 *
	 * @return array
	 */
	private function get_public_post_type_options() {
		$options    = array();
		$post_types = get_post_types( array( 'public' => true ), 'objects' );

		foreach ( $post_types as $post_type ) {
			$options[] = array(
				'value' => $post_type->name,
				'label' => $post_type->labels->singular_name,
			);
		}

		return $options;
	}

	/**
	 * Enqueue the tiny frontend helper (device/browser detection cookies).
	 */
	public function enqueue_frontend_assets() {
		if ( ! has_blocks() ) {
			return;
		}

		wp_enqueue_script(
			'wbd-conditional-block-detect',
			WBDCOBL_PLUGIN_URL . 'assets/js/detect-device.js',
			array(),
			WBDCOBL_VERSION,
			array(
				'in_footer' => false, // Needs to run before render-blocking content is evaluated on next load.
			)
		);

		wp_enqueue_style(
			'wbd-conditional-block-frontend',
			WBDCOBL_PLUGIN_URL . 'assets/css/frontend.css',
			array(),
			WBDCOBL_VERSION
		);
	}

	/**
	 * Activation callback — create the analytics table and seed default options.
	 */
	public static function activate() {
		require_once WBDCOBL_PLUGIN_DIR . 'includes/class-wbdcobl-analytics.php';
		WBDCOBL_Analytics::create_table();

		if ( false === get_option( 'wbdcobl_settings' ) ) {
			add_option(
				'wbdcobl_settings',
				array(
					'white_label_name'     => '',
					'geolocation_provider' => 'auto',
					'analytics_enabled'    => true,
					'ab_testing_enabled'   => true,
				)
			);
		}

		update_option( 'wbdcobl_analytics_db_version', WBDCOBL_ANALYTICS_TABLE_VERSION );
	}

	/**
	 * Deactivation callback. Data is intentionally kept — cleanup happens in uninstall.php.
	 */
	public static function deactivate() {
		// Nothing to clean up on deactivation by design; see uninstall.php.
	}
}

WBD_Conditional_Block::instance();

/**
 * Filter block output for ANY block that carries `cbConditions` and legacy
 * blocks that don't expose attrs through render_block (rare, but some
 * dynamic blocks strip attrs) is handled defensively inside the renderer.
 */
add_filter( 'render_block', array( 'WBDCOBL_Renderer', 'filter_block_output' ), 10, 2 );
