<?php
/**
 * Registers the "Conditional Group" block (blocks/conditional-group).
 *
 * A dedicated container block for wrapping several inner blocks — or
 * blocks/content that can't easily be filtered individually (classic
 * content, shortcodes, third-party blocks) — under one set of rules.
 *
 * @package WBD_Conditional_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class WBDCOBL_Block_Group
 */
class WBDCOBL_Block_Group {

	/**
	 * Bootstrap.
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'register_block' ) );
	}

	/**
	 * Register the block type from block.json, wiring in the dynamic
	 * render callback (visibility is evaluated the same way as any
	 * other block, via WBDCOBL_Renderer — see filter_block_output(), which
	 * fires for this block too since render_block runs for all blocks).
	 */
	public static function register_block() {
		register_block_type(
			WBDCOBL_PLUGIN_DIR . 'blocks/conditional-group',
			array(
				'render_callback' => array( __CLASS__, 'render' ),
			)
		);
	}

	/**
	 * Render callback: outputs the wrapped inner block content as-is.
	 * The actual show/hide decision happens in WBDCOBL_Renderer::filter_block_output()
	 * via the generic `render_block` filter, which runs on top of this
	 * callback's output — so this method only needs to produce the normal
	 * wrapper markup.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Inner block content (already rendered).
	 * @return string
	 */
	public static function render( $attributes, $content ) {
		$tag_name = isset( $attributes['tagName'] ) && preg_match( '/^[a-z][a-z0-9]*$/i', $attributes['tagName'] ) ? $attributes['tagName'] : 'div';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => 'wbdcobl-conditional-group',
			)
		);

		return sprintf( '<%1$s %2$s>%3$s</%1$s>', tag_escape( $tag_name ), $wrapper_attributes, $content );
	}
}
