/**
 * One condition row: type + operator (is/is not) + value + remove button.
 */
import {
	SelectControl,
	Button,
	Flex,
	FlexBlock,
	FlexItem,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { CONDITION_TYPES, createEmptyCondition } from '../utils/constants';
import ConditionValueControl from './condition-value-control';

export default function ConditionRow( { condition, onChange, onRemove } ) {
	return (
		<div className="wbdcobl-condition-row">
			<Flex align="flex-start" gap={ 2 }>
				<FlexBlock>
					<SelectControl
						label={ __( 'Condition type', 'wbd-conditional-block' ) }
						value={ condition.type }
						options={ CONDITION_TYPES }
						onChange={ ( type ) =>
							onChange( createEmptyCondition( type ) )
						}
						__next40pxDefaultSize
					/>
				</FlexBlock>
				<FlexItem>
					<SelectControl
						label={ __( 'Operator', 'wbd-conditional-block' ) }
						value={ condition.operator || 'is' }
						options={ [
							{
								value: 'is',
								label: __( 'Is', 'wbd-conditional-block' ),
							},
							{
								value: 'is_not',
								label: __( 'Is not', 'wbd-conditional-block' ),
							},
						] }
						onChange={ ( operator ) =>
							onChange( { ...condition, operator } )
						}
						__next40pxDefaultSize
					/>
				</FlexItem>
				<FlexItem>
					<Button
						icon={ closeSmall }
						label={ __( 'Remove condition', 'wbd-conditional-block' ) }
						onClick={ onRemove }
						isSmall
						className="wbdcobl-remove-condition"
					/>
				</FlexItem>
			</Flex>

			<div className="wbdcobl-condition-value">
				<ConditionValueControl
					type={ condition.type }
					value={ condition.value }
					onChange={ ( value ) =>
						onChange( { ...condition, value } )
					}
				/>
			</div>
		</div>
	);
}
