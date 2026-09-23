<?php
/**
 * Lightweight analytics: how often each conditional block is shown/hidden.
 *
 * @package WBD_Conditional_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class WBDCOBL_Analytics
 */
class WBDCOBL_Analytics {
	// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching

	/**
	 * Get the analytics table name (with the site's table prefix).
	 *
	 * @return string
	 */
	public static function table_name() {
		global $wpdb;
		return $wpdb->prefix . 'wbdcobl_analytics';
	}

	/**
	 * Bootstrap hooks.
	 */
	public static function init() {
		add_action( 'admin_init', array( __CLASS__, 'maybe_upgrade_table' ) );
	}

	/**
	 * Create (or upgrade) the analytics table via dbDelta.
	 */
	public static function create_table() {
		global $wpdb;

		$table_name      = self::table_name();
		$charset_collate = $wpdb->get_charset_collate();

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		$sql = "CREATE TABLE {$table_name} (
			id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
			block_uid VARCHAR(64) NOT NULL,
			block_name VARCHAR(191) NOT NULL DEFAULT '',
			variant VARCHAR(8) NOT NULL DEFAULT '',
			day DATE NOT NULL,
			shown_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
			hidden_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
			PRIMARY KEY  (id),
			UNIQUE KEY wbdcobl_uid_variant_day (block_uid, variant, day),
			KEY block_uid (block_uid)
		) {$charset_collate};";

		dbDelta( $sql );
	}

	/**
	 * Run create_table() again if the stored schema version is stale.
	 */
	public static function maybe_upgrade_table() {
		if ( get_option( 'wbdcobl_analytics_db_version' ) !== WBDCOBL_ANALYTICS_TABLE_VERSION ) {
			self::create_table();
			update_option( 'wbdcobl_analytics_db_version', WBDCOBL_ANALYTICS_TABLE_VERSION );
		}
	}

	/**
	 * Record a single block render decision (shown or hidden) for today.
	 *
	 * @param string $uid        Block instance UID (client-generated in the editor).
	 * @param bool   $shown      Whether the block was shown.
	 * @param string $block_name Block type name, e.g. 'core/paragraph'.
	 */
	public static function track( $uid, $shown, $block_name = '' ) {
		$settings = get_option( 'wbdcobl_settings', array() );
		if ( isset( $settings['analytics_enabled'] ) && ! $settings['analytics_enabled'] ) {
			return;
		}

		global $wpdb;

		$uid     = substr( sanitize_key( $uid ), 0, 64 );
		$today   = current_time( 'Y-m-d' );
		$variant = isset( $_COOKIE['wbdcobl_ab_variant'] ) ? sanitize_key( wp_unslash( $_COOKIE['wbdcobl_ab_variant'] ) ) : '';
		$variant = in_array( $variant, array( 'a', 'b' ), true ) ? $variant : '';

		if ( '' === $uid ) {
			return;
		}

		$table = self::table_name();

		// Portable upsert: try UPDATE first, INSERT if no row matched.
		// Avoids relying on MySQL-only "ON DUPLICATE KEY UPDATE" syntax
		// so the plugin behaves the same on any SQLite/MySQL emulation
		// layer used during development or hosting. %i (identifier
		// placeholder) requires WP 6.2+; this plugin requires 6.5+.
		$shown_col  = 'shown_count';
		$hidden_col = 'hidden_count';

		if ( $shown ) {
			$updated = $wpdb->query(
				$wpdb->prepare(
					'UPDATE %i SET %i = %i + 1 WHERE block_uid = %s AND variant = %s AND day = %s',
					$table,
					$shown_col,
					$shown_col,
					$uid,
					$variant,
					$today
				)
			);
		} else {
			$updated = $wpdb->query(
				$wpdb->prepare(
					'UPDATE %i SET %i = %i + 1 WHERE block_uid = %s AND variant = %s AND day = %s',
					$table,
					$hidden_col,
					$hidden_col,
					$uid,
					$variant,
					$today
				)
			);
		}

		if ( empty( $updated ) ) {
			$wpdb->query(
				$wpdb->prepare(
					'INSERT IGNORE INTO %i (block_uid, block_name, variant, day, shown_count, hidden_count) VALUES (%s, %s, %s, %s, %d, %d)',
					$table,
					$uid,
					substr( $block_name, 0, 191 ),
					$variant,
					$today,
					$shown ? 1 : 0,
					$shown ? 0 : 1
				)
			);
		}
	}

	/**
	 * Aggregate totals per block, most active first.
	 *
	 * @param int $days Look back this many days (0 = all time).
	 * @return array[] Rows: block_uid, block_name, shown, hidden, variant_a_shown, variant_b_shown.
	 */
	public static function get_summary( $days = 30 ) {
		global $wpdb;
		$table = self::table_name();

		if ( $days > 0 ) {
			$since = gmdate( 'Y-m-d', strtotime( '-' . (int) $days . ' days', current_time( 'timestamp' ) ) ); // phpcs:ignore WordPress.DateTime.CurrentTimeTimestamp.Requested

			$rows = $wpdb->get_results(
				$wpdb->prepare(
					"SELECT block_uid,
						MAX(block_name) AS block_name,
						SUM(shown_count) AS shown,
						SUM(hidden_count) AS hidden,
						SUM(CASE WHEN variant = 'a' THEN shown_count ELSE 0 END) AS variant_a_shown,
						SUM(CASE WHEN variant = 'b' THEN shown_count ELSE 0 END) AS variant_b_shown
					FROM %i
					WHERE day >= %s
					GROUP BY block_uid
					ORDER BY (SUM(shown_count) + SUM(hidden_count)) DESC",
					$table,
					$since
				),
				ARRAY_A
			);
		} else {
			$rows = $wpdb->get_results(
				$wpdb->prepare(
					"SELECT block_uid,
						MAX(block_name) AS block_name,
						SUM(shown_count) AS shown,
						SUM(hidden_count) AS hidden,
						SUM(CASE WHEN variant = 'a' THEN shown_count ELSE 0 END) AS variant_a_shown,
						SUM(CASE WHEN variant = 'b' THEN shown_count ELSE 0 END) AS variant_b_shown
					FROM %i
					GROUP BY block_uid
					ORDER BY (SUM(shown_count) + SUM(hidden_count)) DESC",
					$table
				),
				ARRAY_A
			);
		}

		return is_array( $rows ) ? $rows : array();
	}

	/**
	 * Daily totals across all blocks, for the trend chart.
	 *
	 * @param int $days Look back this many days.
	 * @return array[] Rows: day, shown, hidden.
	 */
	public static function get_daily_totals( $days = 30 ) {
		global $wpdb;
		$table = self::table_name();
		$since = gmdate( 'Y-m-d', strtotime( '-' . (int) $days . ' days', current_time( 'timestamp' ) ) ); // phpcs:ignore WordPress.DateTime.CurrentTimeTimestamp.Requested

		$rows = $wpdb->get_results(
			$wpdb->prepare(
				'SELECT day, SUM(shown_count) AS shown, SUM(hidden_count) AS hidden FROM %i WHERE day >= %s GROUP BY day ORDER BY day ASC',
				$table,
				$since
			),
			ARRAY_A
		);

		return is_array( $rows ) ? $rows : array();
	}

	/**
	 * Total row count, used to show/hide the "no data yet" empty state.
	 *
	 * @return int
	 */
	public static function has_any_data() {
		global $wpdb;
		$table = self::table_name();
		return (int) $wpdb->get_var( $wpdb->prepare( 'SELECT COUNT(*) FROM %i', $table ) ) > 0;
	}

	/**
	 * Delete all analytics data (used by the admin "reset analytics" action).
	 */
	public static function truncate() {
		global $wpdb;
		$table = self::table_name();
		$wpdb->query( $wpdb->prepare( 'TRUNCATE TABLE %i', $table ) );
	}
}
