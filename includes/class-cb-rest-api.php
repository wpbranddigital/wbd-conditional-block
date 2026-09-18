<?php
/**
 * REST API endpoints used by the block editor UI.
 *
 * @package WBD_Conditional_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class CB_REST_API
 */
class CB_REST_API {

	/**
	 * REST namespace.
	 *
	 * @var string
	 */
	const NAMESPACE_V1 = 'wbd-conditional-block/v1';

	/**
	 * Bootstrap.
	 */
	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'register_routes' ) );
	}

	/**
	 * Register routes.
	 */
	public static function register_routes() {
		register_rest_route(
			self::NAMESPACE_V1,
			'/search-posts',
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'search_posts' ),
				'permission_callback' => array( __CLASS__, 'can_edit_posts' ),
				'args'                => array(
					'post_type' => array(
						'type'    => 'string',
						'default' => 'page',
					),
					'search'    => array(
						'type'    => 'string',
						'default' => '',
					),
				),
			)
		);

		register_rest_route(
			self::NAMESPACE_V1,
			'/analytics-summary',
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'analytics_summary' ),
				'permission_callback' => array( __CLASS__, 'can_manage' ),
				'args'                => array(
					'days' => array(
						'type'    => 'integer',
						'default' => 30,
					),
				),
			)
		);
	}

	/**
	 * Permission check: anyone who can edit posts (block editor users).
	 *
	 * @return bool
	 */
	public static function can_edit_posts() {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Permission check: admins/managers only (analytics dashboard data).
	 *
	 * @return bool
	 */
	public static function can_manage() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Search posts/pages by title for the "Page/Post Type" condition's
	 * "specific post" picker.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public static function search_posts( $request ) {
		$post_type = sanitize_key( $request->get_param( 'post_type' ) );
		$search    = sanitize_text_field( $request->get_param( 'search' ) );

		if ( ! post_type_exists( $post_type ) ) {
			$post_type = 'page';
		}

		$query = new WP_Query(
			array(
				'post_type'              => $post_type,
				's'                      => $search,
				'posts_per_page'         => 20,
				'post_status'            => 'publish',
				'orderby'                => 'title',
				'order'                  => 'ASC',
				'no_found_rows'          => true,
				'update_post_meta_cache' => false,
				'update_post_term_cache' => false,
			)
		);

		$results = array();
		foreach ( $query->posts as $post ) {
			$results[] = array(
				'id'    => $post->ID,
				'title' => $post->post_title ? $post->post_title : __( '(no title)', 'wbd-conditional-block' ),
			);
		}

		return rest_ensure_response( $results );
	}

	/**
	 * Analytics summary data for the (optional) JS-rendered dashboard widget.
	 * The main wp-admin analytics screen renders server-side; this exists
	 * for extensibility (e.g. a future "Site Health"-style widget).
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public static function analytics_summary( $request ) {
		require_once CB_PLUGIN_DIR . 'includes/class-cb-analytics.php';

		$days = max( 0, (int) $request->get_param( 'days' ) );

		return rest_ensure_response(
			array(
				'summary' => CB_Analytics::get_summary( $days ),
				'daily'   => CB_Analytics::get_daily_totals( $days ),
			)
		);
	}
}
