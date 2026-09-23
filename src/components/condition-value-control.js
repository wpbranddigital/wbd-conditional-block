/**
 * Renders the correct value input(s) for a given condition type.
 */
import {
	SelectControl,
	TextControl,
	FormTokenField,
	CheckboxControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PostPicker from './post-picker';
import {
	DEVICE_OPTIONS,
	BROWSER_OPTIONS,
	OS_OPTIONS,
	REFERRER_OPTIONS,
	PAGE_SPECIAL_OPTIONS,
	WOOCOMMERCE_CHECKS,
	CUSTOM_FIELD_COMPARES,
	WEEKDAYS,
} from '../utils/constants';

const data =
	typeof window !== 'undefined' && window.ConditionalBlocksData
		? window.ConditionalBlocksData
		: {};
const ROLE_OPTIONS = ( data.roles || [] ).concat( [
	{
		value: 'wc_customer',
		label: __( 'WooCommerce Customer', 'wbd-conditional-block' ),
	},
] );
const POST_TYPE_OPTIONS = data.postTypes || [];

function updateValue( value, patch, onChange ) {
	onChange( {
		...( typeof value === 'object' && value ? value : {} ),
		...patch,
	} );
}

export default function ConditionValueControl( { type, value, onChange } ) {
	switch ( type ) {
		case 'login_status':
			return (
				<SelectControl
					label={ __( 'Visitor is', 'wbd-conditional-block' ) }
					value={ value }
					options={ [
						{
							value: 'logged_in',
							label: __( 'Logged in', 'wbd-conditional-block' ),
						},
						{
							value: 'logged_out',
							label: __( 'Logged out', 'wbd-conditional-block' ),
						},
					] }
					onChange={ onChange }
					__next40pxDefaultSize
				/>
			);

		case 'user_role':
			return (
				<FormTokenField
					label={ __( 'Roles (any match)', 'wbd-conditional-block' ) }
					value={ ( Array.isArray( value ) ? value : [] ).map(
						( slug ) =>
							(
								ROLE_OPTIONS.find(
									( r ) => r.value === slug
								) || { label: slug }
							).label
					) }
					suggestions={ ROLE_OPTIONS.map( ( r ) => r.label ) }
					onChange={ ( labels ) => {
						const slugs = labels
							.map( ( label ) => {
								const found = ROLE_OPTIONS.find(
									( r ) => r.label === label
								);
								return found ? found.value : null;
							} )
							.filter( Boolean );
						onChange( slugs );
					} }
					__experimentalExpandOnFocus
					__next40pxDefaultSize
				/>
			);

		case 'device_type':
			return (
				<SelectControl
					label={ __( 'Device', 'wbd-conditional-block' ) }
					value={ value }
					options={ DEVICE_OPTIONS }
					onChange={ onChange }
					__next40pxDefaultSize
				/>
			);

		case 'date_time':
			return <DateTimeValue value={ value } onChange={ onChange } />;

		case 'page_type':
			return <PageTypeValue value={ value } onChange={ onChange } />;

		case 'geolocation':
			return (
				<FormTokenField
					label={ __(
						'Country codes (ISO 2-letter, any match)',
						'wbd-conditional-block'
					) }
					value={ Array.isArray( value ) ? value : [] }
					onChange={ ( codes ) =>
						onChange(
							codes
								.map( ( c ) => c.toUpperCase().trim() )
								.filter( Boolean )
						)
					}
					__experimentalExpandOnFocus
					__next40pxDefaultSize
				/>
			);

		case 'browser':
			return (
				<SelectControl
					label={ __( 'Browser', 'wbd-conditional-block' ) }
					value={ value }
					options={ BROWSER_OPTIONS }
					onChange={ onChange }
					__next40pxDefaultSize
				/>
			);

		case 'os':
			return (
				<SelectControl
					label={ __( 'Operating system', 'wbd-conditional-block' ) }
					value={ value }
					options={ OS_OPTIONS }
					onChange={ onChange }
					__next40pxDefaultSize
				/>
			);

		case 'referrer':
			return <ReferrerValue value={ value } onChange={ onChange } />;

		case 'query_string':
			return (
				<>
					<TextControl
						label={ __( 'Parameter name', 'wbd-conditional-block' ) }
						value={ ( value && value.key ) || '' }
						onChange={ ( key ) =>
							updateValue( value, { key }, onChange )
						}
						placeholder="source"
						__next40pxDefaultSize
					/>
					<TextControl
						label={ __(
							'Expected value (optional — leave blank to just check it exists)',
							'wbd-conditional-block'
						) }
						value={ ( value && value.value ) || '' }
						onChange={ ( fieldValue ) =>
							updateValue(
								value,
								{ value: fieldValue },
								onChange
							)
						}
						placeholder="facebook"
						__next40pxDefaultSize
					/>
				</>
			);

		case 'cookie':
			return (
				<>
					<TextControl
						label={ __( 'Cookie name', 'wbd-conditional-block' ) }
						value={ ( value && value.name ) || '' }
						onChange={ ( name ) =>
							updateValue( value, { name }, onChange )
						}
						placeholder="visited_before"
						__next40pxDefaultSize
					/>
					<TextControl
						label={ __(
							'Expected value (optional — leave blank to just check it exists)',
							'wbd-conditional-block'
						) }
						value={ ( value && value.value ) || '' }
						onChange={ ( fieldValue ) =>
							updateValue(
								value,
								{ value: fieldValue },
								onChange
							)
						}
						__next40pxDefaultSize
					/>
				</>
			);

		case 'woocommerce':
			return <WooCommerceValue value={ value } onChange={ onChange } />;

		case 'custom_field':
			return <CustomFieldValue value={ value } onChange={ onChange } />;

		case 'language':
			return (
				<TextControl
					label={ __(
						'Language code (e.g. bn, en, bn_BD)',
						'wbd-conditional-block'
					) }
					value={ value || '' }
					onChange={ onChange }
					placeholder="bn"
					__next40pxDefaultSize
				/>
			);

		case 'ab_test':
			return (
				<SelectControl
					label={ __( 'Variant', 'wbd-conditional-block' ) }
					value={ value }
					options={ [
						{
							value: 'a',
							label: __( 'Variant A', 'wbd-conditional-block' ),
						},
						{
							value: 'b',
							label: __( 'Variant B', 'wbd-conditional-block' ),
						},
					] }
					onChange={ onChange }
					help={ __(
						'Visitors are randomly (and consistently) split 50/50 between A and B.',
						'wbd-conditional-block'
					) }
					__next40pxDefaultSize
				/>
			);

		default:
			return (
				<TextControl
					label={ __( 'Value', 'wbd-conditional-block' ) }
					value={
						typeof value === 'string'
							? value
							: JSON.stringify( value )
					}
					onChange={ onChange }
					help={ __(
						'Custom condition type registered by a developer.',
						'wbd-conditional-block'
					) }
					__next40pxDefaultSize
				/>
			);
	}
}

function DateTimeValue( { value, onChange } ) {
	const v = value && typeof value === 'object' ? value : {};
	const mode = v.mode || 'range';

	return (
		<>
			<SelectControl
				label={ __( 'Mode', 'wbd-conditional-block' ) }
				value={ mode }
				options={ [
					{
						value: 'range',
						label: __(
							'Date range (or countdown end date)',
							'wbd-conditional-block'
						),
					},
					{
						value: 'recurring_day',
						label: __(
							'Recurring day of week',
							'wbd-conditional-block'
						),
					},
				] }
				onChange={ ( newMode ) =>
					updateValue( v, { mode: newMode }, onChange )
				}
				__next40pxDefaultSize
			/>
			{ mode === 'range' ? (
				<>
					<TextControl
						label={ __( 'Start (optional)', 'wbd-conditional-block' ) }
						type="datetime-local"
						value={ v.start || '' }
						onChange={ ( start ) =>
							updateValue( v, { start }, onChange )
						}
						__next40pxDefaultSize
					/>
					<TextControl
						label={ __( 'End (optional)', 'wbd-conditional-block' ) }
						type="datetime-local"
						value={ v.end || '' }
						onChange={ ( end ) =>
							updateValue( v, { end }, onChange )
						}
						__next40pxDefaultSize
					/>
				</>
			) : (
				<>
					<p className="wbdcobl-field-label">
						{ __( 'Days', 'wbd-conditional-block' ) }
					</p>
					<div className="wbdcobl-weekday-grid">
						{ WEEKDAYS.map( ( day ) => (
							<CheckboxControl
								key={ day.value }
								label={ day.label }
								checked={ ( v.days || [] ).includes(
									day.value
								) }
								onChange={ ( checked ) => {
									const days = new Set( v.days || [] );
									if ( checked ) {
										days.add( day.value );
									} else {
										days.delete( day.value );
									}
									updateValue(
										v,
										{ days: Array.from( days ).sort() },
										onChange
									);
								} }
							/>
						) ) }
					</div>
					<TextControl
						label={ __(
							'Start time (optional, HH:MM)',
							'wbd-conditional-block'
						) }
						type="time"
						value={ v.time_start || '' }
						onChange={ ( startTime ) =>
							updateValue(
								v,
								{ time_start: startTime },
								onChange
							)
						}
						__next40pxDefaultSize
					/>
					<TextControl
						label={ __(
							'End time (optional, HH:MM)',
							'wbd-conditional-block'
						) }
						type="time"
						value={ v.time_end || '' }
						onChange={ ( endTime ) =>
							updateValue( v, { time_end: endTime }, onChange )
						}
						__next40pxDefaultSize
					/>
				</>
			) }
		</>
	);
}

function PageTypeValue( { value, onChange } ) {
	const v = value && typeof value === 'object' ? value : {};

	return (
		<>
			<SelectControl
				label={ __( 'Show on', 'wbd-conditional-block' ) }
				value={ v.special || '' }
				options={ PAGE_SPECIAL_OPTIONS }
				onChange={ ( special ) =>
					updateValue( v, { special }, onChange )
				}
				__next40pxDefaultSize
			/>
			{ ! v.special && (
				<>
					<FormTokenField
						label={ __(
							'Post types (any match)',
							'wbd-conditional-block'
						) }
						value={ ( v.post_types || [] ).map(
							( slug ) =>
								(
									POST_TYPE_OPTIONS.find(
										( p ) => p.value === slug
									) || { label: slug }
								).label
						) }
						suggestions={ POST_TYPE_OPTIONS.map(
							( p ) => p.label
						) }
						onChange={ ( labels ) => {
							const slugs = labels
								.map( ( label ) => {
									const found = POST_TYPE_OPTIONS.find(
										( p ) => p.label === label
									);
									return found ? found.value : null;
								} )
								.filter( Boolean );
							updateValue( v, { post_types: slugs }, onChange );
						} }
						__next40pxDefaultSize
					/>
					<PostPicker
						postType={
							( v.post_types && v.post_types[ 0 ] ) || 'page'
						}
						value={ v.post_ids || [] }
						onChange={ ( postIds ) =>
							updateValue( v, { post_ids: postIds }, onChange )
						}
					/>
				</>
			) }
		</>
	);
}

function ReferrerValue( { value, onChange } ) {
	const isCustom =
		! REFERRER_OPTIONS.some( ( o ) => o.value === value ) ||
		value === 'custom';

	return (
		<>
			<SelectControl
				label={ __( 'Referrer', 'wbd-conditional-block' ) }
				value={ isCustom ? 'custom' : value }
				options={ REFERRER_OPTIONS }
				onChange={ onChange }
				__next40pxDefaultSize
			/>
			{ isCustom && (
				<TextControl
					label={ __(
						'Referrer URL contains…',
						'wbd-conditional-block'
					) }
					value={ value === 'custom' ? '' : value }
					onChange={ onChange }
					placeholder="example.com"
					__next40pxDefaultSize
				/>
			) }
		</>
	);
}

function WooCommerceValue( { value, onChange } ) {
	const v = value && typeof value === 'object' ? value : {};

	if ( ! data.hasWooCommerce ) {
		return (
			<p className="wbdcobl-notice">
				{ __(
					'WooCommerce is not active. This condition will always evaluate to false.',
					'wbd-conditional-block'
				) }
			</p>
		);
	}

	return (
		<>
			<SelectControl
				label={ __( 'Check', 'wbd-conditional-block' ) }
				value={ v.check || 'cart_has_items' }
				options={ WOOCOMMERCE_CHECKS }
				onChange={ ( check ) => updateValue( v, { check }, onChange ) }
				__next40pxDefaultSize
			/>
			{ v.check === 'cart_value_min' && (
				<TextControl
					label={ __(
						'Minimum cart subtotal',
						'wbd-conditional-block'
					) }
					type="number"
					value={ v.amount || 0 }
					onChange={ ( amount ) =>
						updateValue(
							v,
							{ amount: parseFloat( amount ) || 0 },
							onChange
						)
					}
					__next40pxDefaultSize
				/>
			) }
			{ v.check === 'purchased_product' && (
				<TextControl
					label={ __( 'Product ID', 'wbd-conditional-block' ) }
					type="number"
					value={ v.product_id || '' }
					onChange={ ( productId ) =>
						updateValue(
							v,
							{ product_id: parseInt( productId, 10 ) || '' },
							onChange
						)
					}
					__next40pxDefaultSize
				/>
			) }
			{ v.check === 'total_spent_min' && (
				<TextControl
					label={ __(
						'Minimum lifetime spend',
						'wbd-conditional-block'
					) }
					type="number"
					value={ v.amount || 0 }
					onChange={ ( amount ) =>
						updateValue(
							v,
							{ amount: parseFloat( amount ) || 0 },
							onChange
						)
					}
					__next40pxDefaultSize
				/>
			) }
			{ v.check === 'customer_vs_guest' && (
				<CheckboxControl
					label={ __(
						'Must be a logged-in customer (unchecked = must be a guest)',
						'wbd-conditional-block'
					) }
					checked={ !! v.is_customer }
					onChange={ ( isCustomer ) =>
						updateValue( v, { is_customer: isCustomer }, onChange )
					}
				/>
			) }
		</>
	);
}

function CustomFieldValue( { value, onChange } ) {
	const v = value && typeof value === 'object' ? value : {};

	return (
		<>
			{ ! data.hasACF && (
				<p className="wbdcobl-notice">
					{ __(
						'ACF not detected — falling back to plain post meta lookup by key.',
						'wbd-conditional-block'
					) }
				</p>
			) }
			<TextControl
				label={ __( 'Field key', 'wbd-conditional-block' ) }
				value={ v.key || '' }
				onChange={ ( key ) => updateValue( v, { key }, onChange ) }
				placeholder="price"
				__next40pxDefaultSize
			/>
			<SelectControl
				label={ __( 'Compare', 'wbd-conditional-block' ) }
				value={ v.compare || '=' }
				options={ CUSTOM_FIELD_COMPARES }
				onChange={ ( compare ) =>
					updateValue( v, { compare }, onChange )
				}
				__next40pxDefaultSize
			/>
			{ v.compare !== 'exists' && (
				<TextControl
					label={ __( 'Expected value', 'wbd-conditional-block' ) }
					value={ v.value || '' }
					onChange={ ( fieldValue ) =>
						updateValue( v, { value: fieldValue }, onChange )
					}
					__next40pxDefaultSize
				/>
			) }
		</>
	);
}
