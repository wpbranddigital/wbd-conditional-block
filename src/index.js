/**
 * WBD_Conditional_Block block editor integration.
 *
 * Adds a "Conditional Visibility" panel to the Inspector Controls of
 * EVERY block (not just a custom one) via the `editor.BlockEdit` filter,
 * and registers the dedicated "Conditional Group" container block for
 * wrapping multiple blocks under one rule set.
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { registerBlockType, getBlockType } from '@wordpress/blocks';
import { seen } from '@wordpress/icons';

import ConditionalPanel from './components/conditional-panel';
import groupMetadata from '../blocks/conditional-group/block.json';
import groupEdit from './blocks/conditional-group/edit';
import groupSave from './blocks/conditional-group/save';

import './editor.scss';

const EXCLUDED_BLOCKS = [
	'core/freeform',
	'core/legacy-widget',
	'core/widget-area',
];

const CB_CONDITIONS_DEFAULT = {
	enabled: false,
	logic: 'all',
	conditions: [],
	uid: '',
	fallback: 'hide',
};

/**
 * Add the `cbConditions` attribute to every block's CLIENT-SIDE schema.
 *
 * This mirrors add_condition_attribute() in wbd-conditional-block.php: that
 * PHP filter registers the attribute on the *server* block type registry
 * (used by the REST API and PHP-side validation), but the block editor's
 * own registry is populated independently by each block's JS
 * registerBlockType() call. Without also declaring the attribute here,
 * WordPress's block serializer would silently drop `cbConditions` when
 * saving (getCommentAttributes() only persists attributes declared in
 * the block's registered schema), so both filters are required.
 *
 * @param {Object} settings Block settings.
 * @param {string} name     Block name.
 * @return {Object} Modified block settings.
 */
function addConditionsAttribute( settings, name ) {
	if ( EXCLUDED_BLOCKS.includes( name ) ) {
		return settings;
	}
	if ( ! settings.attributes ) {
		return settings;
	}
	if ( settings.attributes.cbConditions ) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		cbConditions: {
			type: 'object',
			default: CB_CONDITIONS_DEFAULT,
		},
	};

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'wbd-conditional-block/add-attribute',
	addConditionsAttribute
);

/**
 * HOC: inject the Conditional Visibility panel into every block's
 * Inspector Controls.
 */
const withConditionalControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes, isSelected } = props;

		if ( EXCLUDED_BLOCKS.includes( name ) ) {
			return <BlockEdit { ...props } />;
		}

		const blockType = getBlockType( name );
		const supportsConditions =
			blockType &&
			blockType.attributes &&
			blockType.attributes.cbConditions;

		if ( ! supportsConditions ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && (
					<InspectorControls>
						<ConditionalPanel
							value={ attributes.cbConditions }
							onChange={ ( cbConditions ) =>
								setAttributes( { cbConditions } )
							}
						/>
					</InspectorControls>
				) }
			</Fragment>
		);
	};
}, 'withConditionalControls' );

addFilter(
	'editor.BlockEdit',
	'wbd-conditional-block/with-inspector-controls',
	withConditionalControls
);

/**
 * HOC: add a visual "has conditions" indicator to the block in the
 * editor canvas, and an eye-off badge, so authors can spot at a glance
 * which blocks carry visibility rules while editing.
 */
const withConditionalIndicator = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			const conditions =
				props.attributes && props.attributes.cbConditions;
			if ( ! conditions || ! conditions.enabled ) {
				return <BlockListBlock { ...props } />;
			}

			return (
				<BlockListBlock
					{ ...props }
					className={
						( props.className ? props.className + ' ' : '' ) +
						'cb-has-conditions'
					}
				>
					{ props.children }
				</BlockListBlock>
			);
		};
	},
	'withConditionalIndicator'
);

addFilter(
	'editor.BlockListBlock',
	'wbd-conditional-block/with-indicator',
	withConditionalIndicator
);

/**
 * Register the "Conditional Group" block.
 */
registerBlockType( groupMetadata.name, {
	...groupMetadata,
	icon: seen,
	edit: groupEdit,
	save: groupSave,
} );
