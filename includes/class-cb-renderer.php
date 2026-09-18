<?php
/**
 * Frontend block rendering: applies conditional visibility rules.
 *
 * @package WBD_Conditional_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class CB_Renderer
 */
class CB_Renderer {

	/**
	 * Bootstrap. Currently a no-op placeholder kept for symmetry with the
	 * other subsystems and for future hooks (e.g. output buffering for
	 * A/B cookie assignment before headers are sent).
	 */
	public static function init() {
		add_action( 'template_redirect', array( __CLASS__, 'maybe_assign_ab_cookie_early' ), 1 );
	}

	/**
	 * Filters the rendered HTML of every block. Blocks that carry a
	 * `cbConditions` attribute with `enabled: true` are hidden entirely
	 * (empty string) when their rules evaluate to false.
	 *
	 * @param string $block_content Rendered block HTML.
	 * @param array  $block         Parsed block, including 'attrs' and 'blockName'.
	 * @return string
	 */
	public static function filter_block_output( $block_content, $block ) {
		if ( empty( $block['attrs']['cbConditions'] ) || empty( $block['attrs']['cbConditions']['enabled'] ) ) {
			return $block_content;
		}

		// Never hide anything in the block editor's own REST-driven preview
		// requests; the editor renders its own live preview client-side.
		if ( is_admin() && ! wp_doing_ajax() ) {
			return $block_content;
		}

		$rules       = $block['attrs']['cbConditions'];
		$should_show = self::evaluate_rules( $rules );

		$uid = isset( $rules['uid'] ) ? sanitize_key( $rules['uid'] ) : '';
		if ( '' !== $uid ) {
			CB_Analytics::track( $uid, $should_show, isset( $block['blockName'] ) ? $block['blockName'] : '' );
		}

		/**
		 * Filter the final show/hide decision for a block, after the
		 * plugin's own conditions have been evaluated.
		 *
		 * @param bool   $should_show Whether the block should render.
		 * @param array  $rules       The block's cbConditions attribute.
		 * @param array  $block       The full parsed block.
		 */
		$should_show = apply_filters( 'WBD_Conditional_Block_should_show_block', $should_show, $rules, $block );

		if ( ! $should_show ) {
			return '';
		}

		return $block_content;
	}

	/**
	 * Evaluate a rule set: { logic: 'all'|'any', conditions: [ {...} ] }.
	 *
	 * @param array $rules Conditions payload.
	 * @return bool
	 */
	public static function evaluate_rules( $rules ) {
		$conditions = isset( $rules['conditions'] ) && is_array( $rules['conditions'] ) ? $rules['conditions'] : array();

		if ( empty( $conditions ) ) {
			return true; // Enabled with no rules yet — don't hide by accident.
		}

		$logic   = isset( $rules['logic'] ) && 'any' === $rules['logic'] ? 'any' : 'all';
		$results = array();

		foreach ( $conditions as $condition ) {
			if ( ! is_array( $condition ) || empty( $condition['type'] ) ) {
				continue;
			}
			$results[] = CB_Conditions::evaluate( $condition );
		}

		if ( empty( $results ) ) {
			return true;
		}

		if ( 'any' === $logic ) {
			return in_array( true, $results, true );
		}

		return ! in_array( false, $results, true );
	}

	/**
	 * Ensure a visitor has an A/B variant cookie as early as possible
	 * (template_redirect) so PHP-side condition checks during this same
	 * request see a consistent value, without waiting on JS.
	 */
	public static function maybe_assign_ab_cookie_early() {
		if ( headers_sent() ) {
			return;
		}
		self::get_or_assign_ab_variant();
	}

	/**
	 * Read the visitor's A/B variant cookie, assigning a random 50/50
	 * variant and setting the cookie if one doesn't exist yet.
	 *
	 * @return string 'a' or 'b'.
	 */
	public static function get_or_assign_ab_variant() {
		if ( isset( $_COOKIE['cb_ab_variant'] ) ) {
			$existing = sanitize_key( wp_unslash( $_COOKIE['cb_ab_variant'] ) );
			if ( in_array( $existing, array( 'a', 'b' ), true ) ) {
				return $existing;
			}
		}

		$variant = ( wp_rand( 0, 1 ) === 0 ) ? 'a' : 'b';

		if ( ! headers_sent() ) {
			wbd_conditional_block_set_cookie( 'cb_ab_variant', $variant, time() + 30 * DAY_IN_SECONDS );
		}

		$_COOKIE['cb_ab_variant'] = $variant;

		return $variant;
	}
}
