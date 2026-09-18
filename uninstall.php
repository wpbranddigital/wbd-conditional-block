<?php
/**
 * Uninstall handler: removes all plugin data when deleted from wp-admin.
 *
 * @package WBD_Conditional_Block
 */

// Exit if not called by WordPress during uninstall.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

/**
 * Uninstall function to prevent global scope pollution.
 */
function wbd_conditional_block_uninstall() {
	global $wpdb;

	// Only drop tables and data if user explicitly enabled it in settings.
	$settings = get_option( 'cb_settings', array() );
	if ( ! empty( $settings['delete_on_uninstall'] ) ) {
		$table = $wpdb->prefix . 'cb_analytics';
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter
		$wpdb->query( "DROP TABLE IF EXISTS {$table}" );

		// Remove options.
		delete_option( 'cb_settings' );
		delete_option( 'cb_analytics_db_version' );
	}

	// Multisite: repeat for every site in the network.
	if ( is_multisite() ) {
		$site_ids = get_sites( array( 'fields' => 'ids' ) );
		foreach ( $site_ids as $site_id ) {
			switch_to_blog( $site_id );

			$settings = get_option( 'cb_settings', array() );
			if ( ! empty( $settings['delete_on_uninstall'] ) ) {
				$table = $wpdb->prefix . 'cb_analytics';
				// phpcs:ignore WordPress.DB.DirectDatabaseQuery, WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter
				$wpdb->query( "DROP TABLE IF EXISTS {$table}" );

				delete_option( 'cb_settings' );
				delete_option( 'cb_analytics_db_version' );
			}

			restore_current_blog();
		}
	}
}
wbd_conditional_block_uninstall();
