/**
 * Async post/page picker backed by the plugin's REST search endpoint.
 */
import { FormTokenField } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

/**
 * @param {Object}   props
 * @param {string}   props.postType Post type to search within.
 * @param {number[]} props.value    Currently selected post IDs.
 * @param {Function} props.onChange Called with the new array of post IDs.
 */
export default function PostPicker( { postType, value, onChange } ) {
	const [ suggestions, setSuggestions ] = useState( [] );
	const [ knownLabels, setKnownLabels ] = useState( {} );
	const requestRef = useRef( 0 );

	useEffect( () => {
		// Resolve existing IDs to labels once, so tokens don't show as raw numbers.
		if ( ! value || ! value.length ) {
			return;
		}
		const missing = value.filter( ( id ) => ! knownLabels[ id ] );
		if ( ! missing.length ) {
			return;
		}
		search( '' );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ postType ] );

	function search( text ) {
		const reqId = ++requestRef.current;
		apiFetch( {
			path: `/wbd-conditional-block/v1/search-posts?post_type=${ encodeURIComponent(
				postType
			) }&search=${ encodeURIComponent( text ) }`,
		} )
			.then( ( results ) => {
				if ( requestRef.current !== reqId ) {
					return; // Stale response.
				}
				const labels = {};
				results.forEach( ( r ) => {
					labels[ r.id ] = r.title;
				} );
				setKnownLabels( ( prev ) => ( { ...prev, ...labels } ) );
				setSuggestions(
					results.map( ( r ) => `${ r.title } (#${ r.id })` )
				);
			} )
			.catch( () => {
				setSuggestions( [] );
			} );
	}

	const tokens = ( value || [] ).map( ( id ) =>
		knownLabels[ id ] ? `${ knownLabels[ id ] } (#${ id })` : `#${ id }`
	);

	return (
		<FormTokenField
			label={ __( 'Specific posts/pages', 'wbd-conditional-block' ) }
			value={ tokens }
			suggestions={ suggestions }
			onInputChange={ search }
			onChange={ ( newTokens ) => {
				const ids = newTokens
					.map( ( token ) => {
						const match = /#(\d+)\)?$/.exec( token );
						if ( match ) {
							return parseInt( match[ 1 ], 10 );
						}
						const foundId = Object.keys( knownLabels ).find(
							( id ) =>
								`${ knownLabels[ id ] } (#${ id })` === token
						);
						return foundId ? parseInt( foundId, 10 ) : null;
					} )
					.filter( ( id ) => Number.isInteger( id ) );
				onChange( ids );
			} }
			__experimentalExpandOnFocus
			__next40pxDefaultSize
		/>
	);
}
