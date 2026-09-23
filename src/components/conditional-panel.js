/**
 * The "Conditional Visibility" Inspector Controls panel, injected into
 * every block's settings sidebar.
 */
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	Button,
	Notice,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { plus } from '@wordpress/icons';
import ConditionRow from './condition-row';
import templates from '../utils/templates';
import { createEmptyCondition, generateUid } from '../utils/constants';

const data =
	typeof window !== 'undefined' && window.WBD_Conditional_BlockData
		? window.WBD_Conditional_BlockData
		: {};

/**
 * @param {Object}   props
 * @param {Object}   props.value    Current cbConditions attribute value.
 * @param {Function} props.onChange Called with the updated cbConditions object.
 */
export default function ConditionalPanel( { value, onChange } ) {
	const conditions = value || {};
	const enabled = !! conditions.enabled;
	const rules = Array.isArray( conditions.conditions )
		? conditions.conditions
		: [];

	function update( patch ) {
		onChange( { ...conditions, ...patch } );
	}

	function toggleEnabled( isEnabled ) {
		const patch = { enabled: isEnabled };
		if ( isEnabled && ! conditions.uid ) {
			patch.uid = generateUid();
		}
		if ( isEnabled && rules.length === 0 ) {
			patch.conditions = [ createEmptyCondition() ];
			patch.logic = conditions.logic || 'all';
		}
		update( patch );
	}

	function applyTemplate( templateKey ) {
		const template = templates.find( ( t ) => t.key === templateKey );
		if ( ! template ) {
			return;
		}
		update( {
			enabled: true,
			uid: conditions.uid || generateUid(),
			logic: template.rules.logic,
			conditions: template.rules.conditions.map( ( c ) => ( { ...c } ) ),
		} );
	}

	return (
		<PanelBody
			title={ __( 'Conditional Visibility', 'wbd-conditional-block' ) }
			initialOpen={ enabled }
			className="wbdcobl-panel"
		>
			<ToggleControl
				label={ __(
					'Show/hide this block based on conditions',
					'wbd-conditional-block'
				) }
				checked={ enabled }
				onChange={ toggleEnabled }
				__nextHasNoMarginBottom
			/>

			{ enabled && (
				<>
					<SelectControl
						label={ __( 'Quick template', 'wbd-conditional-block' ) }
						value=""
						options={ [
							{
								value: '',
								label: __(
									'— Apply a template —',
									'wbd-conditional-block'
								),
							},
							...templates.map( ( t ) => ( {
								value: t.key,
								label: t.label,
							} ) ),
						] }
						onChange={ applyTemplate }
						__next40pxDefaultSize
					/>

					{ rules.length > 1 && (
						<SelectControl
							label={ __( 'Logic', 'wbd-conditional-block' ) }
							value={ conditions.logic || 'all' }
							options={ [
								{
									value: 'all',
									label: __(
										'Match ALL conditions (AND)',
										'wbd-conditional-block'
									),
								},
								{
									value: 'any',
									label: __(
										'Match ANY condition (OR)',
										'wbd-conditional-block'
									),
								},
							] }
							onChange={ ( logic ) => update( { logic } ) }
							__next40pxDefaultSize
						/>
					) }

					{ rules.map( ( condition, index ) => (
						<ConditionRow
							key={ index }
							condition={ condition }
							onChange={ ( newCondition ) => {
								const next = rules.slice();
								next[ index ] = newCondition;
								update( { conditions: next } );
							} }
							onRemove={ () => {
								const next = rules.slice();
								next.splice( index, 1 );
								update( { conditions: next } );
							} }
						/>
					) ) }

					<Button
						variant="secondary"
						icon={ plus }
						onClick={ () =>
							update( {
								conditions: [
									...rules,
									createEmptyCondition(),
								],
							} )
						}
						className="wbdcobl-add-condition"
					>
						{ __( 'Add condition', 'wbd-conditional-block' ) }
					</Button>

					{ rules.length === 0 && (
						<Notice status="warning" isDismissible={ false }>
							{ __(
								'No conditions set — this block will always be visible.',
								'wbd-conditional-block'
							) }
						</Notice>
					) }

					{ data.adminUrl && (
						<p className="wbdcobl-analytics-link">
							<a
								href={ data.adminUrl }
								target="_blank"
								rel="noreferrer"
							>
								{ __(
									'View analytics for conditional blocks →',
									'wbd-conditional-block'
								) }
							</a>
						</p>
					) }
				</>
			) }
		</PanelBody>
	);
}
