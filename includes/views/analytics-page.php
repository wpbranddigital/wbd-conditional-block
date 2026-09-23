<?php
/**
 * View: Analytics dashboard.
 *
 * Expects $summary (array[]), $daily (array[]), $days (int), $name (string)
 * from WBDCOBL_Admin::render_analytics_page().
 *
 * @package WBD_Conditional_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound


$max_daily = 1;
foreach ( $daily as $row ) {
	$max_daily = max( $max_daily, (int) $row['shown'] + (int) $row['hidden'] );
}
?>
<div class="wrap wbdcobl-wrap">
	<h1><?php echo esc_html( $name ); ?> — <?php esc_html_e( 'Analytics', 'wbd-conditional-block' ); ?></h1>

	<?php if ( isset( $_GET['wbdcobl_reset'] ) ) : // phpcs:ignore WordPress.Security.NonceVerification.Recommended ?>
		<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Analytics data has been reset.', 'wbd-conditional-block' ); ?></p></div>
	<?php endif; ?>

	<p class="description">
		<?php esc_html_e( 'Every block with a Conditional Visibility rule reports here each time it is shown or hidden for a visitor.', 'wbd-conditional-block' ); ?>
	</p>

	<ul class="subsubsub wbdcobl-range-tabs">
		<?php
		$ranges = array(
			7  => __( 'Last 7 days', 'wbd-conditional-block' ),
			30 => __( 'Last 30 days', 'wbd-conditional-block' ),
			90 => __( 'Last 90 days', 'wbd-conditional-block' ),
			0  => __( 'All time', 'wbd-conditional-block' ),
		);
		$i      = 0;
		foreach ( $ranges as $range_days => $label ) {
			++$i;
			$url = add_query_arg(
				array(
					'page'     => 'wbd-conditional-block',
					'wbdcobl_range' => $range_days,
				),
				admin_url( 'admin.php' )
			);
			$sep = $i < count( $ranges ) ? ' | ' : '';
			printf(
				'<li><a href="%1$s"%2$s>%3$s</a>%4$s</li>',
				esc_url( $url ),
				$days === (int) $range_days ? ' class="current"' : '',
				esc_html( $label ),
				$sep // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static separator string.
			);
		}
		?>
	</ul>
	<div style="clear:both;"></div>

	<?php if ( empty( $summary ) ) : ?>
		<div class="wbdcobl-empty-state">
			<p><strong><?php esc_html_e( 'No analytics data yet.', 'wbd-conditional-block' ); ?></strong></p>
			<p><?php esc_html_e( 'Add a Conditional Visibility rule to any block in the editor, publish the page, and visit it — data will show up here.', 'wbd-conditional-block' ); ?></p>
		</div>
	<?php else : ?>

		<h2><?php esc_html_e( 'Daily views', 'wbd-conditional-block' ); ?></h2>
		<div class="wbdcobl-chart" role="img" aria-label="<?php esc_attr_e( 'Bar chart of daily shown vs. hidden block renders', 'wbd-conditional-block' ); ?>">
			<?php foreach ( $daily as $row ) : ?>
				<?php
				$shown      = (int) $row['shown'];
				$hidden     = (int) $row['hidden'];
				$shown_pct  = round( ( $shown / $max_daily ) * 100, 2 );
				$hidden_pct = round( ( $hidden / $max_daily ) * 100, 2 );
				?>
				<div class="wbdcobl-chart-col" title="<?php echo esc_attr( $row['day'] . ': ' . $shown . ' shown, ' . $hidden . ' hidden' ); ?>">
					<div class="wbdcobl-chart-bars">
						<span class="wbdcobl-bar wbdcobl-bar-shown" style="height:<?php echo esc_attr( $shown_pct ); ?>%"></span>
						<span class="wbdcobl-bar wbdcobl-bar-hidden" style="height:<?php echo esc_attr( $hidden_pct ); ?>%"></span>
					</div>
					<span class="wbdcobl-chart-label"><?php echo esc_html( gmdate( 'M j', strtotime( $row['day'] ) ) ); ?></span>
				</div>
			<?php endforeach; ?>
		</div>
		<p class="wbdcobl-legend">
			<span class="wbdcobl-legend-swatch wbdcobl-bar-shown"></span> <?php esc_html_e( 'Shown', 'wbd-conditional-block' ); ?>
			&nbsp;&nbsp;
			<span class="wbdcobl-legend-swatch wbdcobl-bar-hidden"></span> <?php esc_html_e( 'Hidden', 'wbd-conditional-block' ); ?>
		</p>

		<h2><?php esc_html_e( 'By block', 'wbd-conditional-block' ); ?></h2>
		<table class="widefat striped wbdcobl-table">
			<thead>
				<tr>
					<th><?php esc_html_e( 'Block', 'wbd-conditional-block' ); ?></th>
					<th><?php esc_html_e( 'Shown', 'wbd-conditional-block' ); ?></th>
					<th><?php esc_html_e( 'Hidden', 'wbd-conditional-block' ); ?></th>
					<th><?php esc_html_e( 'Show rate', 'wbd-conditional-block' ); ?></th>
					<th><?php esc_html_e( 'A/B split (shown)', 'wbd-conditional-block' ); ?></th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ( $summary as $row ) : ?>
					<?php
					$shown_total  = (int) $row['shown'];
					$hidden_total = (int) $row['hidden'];
					$total        = $shown_total + $hidden_total;
					$rate         = $total > 0 ? round( ( $shown_total / $total ) * 100, 1 ) : 0;
					$a            = (int) $row['variant_a_shown'];
					$b            = (int) $row['variant_b_shown'];
					?>
					<tr>
						<td>
							<code><?php echo esc_html( $row['block_name'] ? $row['block_name'] : __( '(unknown)', 'wbd-conditional-block' ) ); ?></code>
							<br /><span class="description"><?php echo esc_html( $row['block_uid'] ); ?></span>
						</td>
						<td><?php echo esc_html( number_format_i18n( $shown_total ) ); ?></td>
						<td><?php echo esc_html( number_format_i18n( $hidden_total ) ); ?></td>
						<td><?php echo esc_html( $rate ); ?>%</td>
						<td><?php echo ( $a || $b ) ? esc_html( sprintf( 'A: %d / B: %d', $a, $b ) ) : '—'; ?></td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>

		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" class="wbdcobl-reset-form" onsubmit="return confirm('<?php echo esc_js( __( 'This will permanently delete all analytics data. Continue?', 'wbd-conditional-block' ) ); ?>');">
			<input type="hidden" name="action" value="wbdcobl_reset_analytics" />
			<?php wp_nonce_field( 'wbdcobl_reset_analytics' ); ?>
			<?php submit_button( __( 'Reset analytics data', 'wbd-conditional-block' ), 'delete', 'submit', false ); ?>
		</form>

	<?php endif; ?>
</div>
