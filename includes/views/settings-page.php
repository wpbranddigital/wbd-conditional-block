<?php
/**
 * View: Settings page.
 *
 * Expects $settings (array) from CB_Admin::render_settings_page().
 *
 * @package WBD_Conditional_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="wrap cb-wrap">
	<h1><?php esc_html_e( 'WBD_Conditional_Block Settings', 'wbd-conditional-block' ); ?></h1>

	<form method="post" action="options.php">
		<?php settings_fields( 'cb_settings_group' ); ?>

		<table class="form-table" role="presentation">
			<tr>
				<th scope="row">
					<label for="cb_white_label_name"><?php esc_html_e( 'White-label name', 'wbd-conditional-block' ); ?></label>
				</th>
				<td>
					<input
						type="text"
						id="cb_white_label_name"
						name="cb_settings[white_label_name]"
						value="<?php echo esc_attr( $settings['white_label_name'] ); ?>"
						class="regular-text"
						placeholder="WBD_Conditional_Block"
					/>
					<p class="description"><?php esc_html_e( 'Optional. Replace the plugin name shown in wp-admin with your own agency/client-facing brand.', 'wbd-conditional-block' ); ?></p>
				</td>
			</tr>
			<tr>
				<th scope="row"><?php esc_html_e( 'Geolocation lookup', 'wbd-conditional-block' ); ?></th>
				<td>
					<select name="cb_settings[geolocation_provider]">
						<option value="auto" <?php selected( $settings['geolocation_provider'], 'auto' ); ?>><?php esc_html_e( 'Automatic (CDN header, then free API fallback)', 'wbd-conditional-block' ); ?></option>
						<option value="header_only" <?php selected( $settings['geolocation_provider'], 'header_only' ); ?>><?php esc_html_e( 'CDN header only (e.g. Cloudflare) — no outbound requests', 'wbd-conditional-block' ); ?></option>
						<option value="disabled" <?php selected( $settings['geolocation_provider'], 'disabled' ); ?>><?php esc_html_e( 'Disabled', 'wbd-conditional-block' ); ?></option>
					</select>
					<p class="description"><?php esc_html_e( 'Controls the "Geolocation" condition type. Results are cached per visitor for 12 hours.', 'wbd-conditional-block' ); ?></p>
				</td>
			</tr>
			<tr>
				<th scope="row"><?php esc_html_e( 'Analytics', 'wbd-conditional-block' ); ?></th>
				<td>
					<label>
						<input type="checkbox" name="cb_settings[analytics_enabled]" value="1" <?php checked( ! empty( $settings['analytics_enabled'] ) ); ?> />
						<?php esc_html_e( 'Track how often conditional blocks are shown/hidden', 'wbd-conditional-block' ); ?>
					</label>
				</td>
			</tr>
			<tr>
				<th scope="row"><?php esc_html_e( 'A/B testing', 'wbd-conditional-block' ); ?></th>
				<td>
					<label>
						<input type="checkbox" name="cb_settings[ab_testing_enabled]" value="1" <?php checked( ! empty( $settings['ab_testing_enabled'] ) ); ?> />
						<?php esc_html_e( 'Enable the "A/B Test Variant" condition type', 'wbd-conditional-block' ); ?>
					</label>
				</td>
			</tr>
		</table>

		<?php submit_button(); ?>
	</form>
</div>
