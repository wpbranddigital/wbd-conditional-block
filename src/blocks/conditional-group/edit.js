/**
 * Editor view for the "Conditional Group" block: a plain wrapper that
 * lets authors drop any blocks inside and apply one set of conditions
 * to the whole group (the Conditional Visibility panel itself is added
 * automatically to every block, including this one, by src/index.js).
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes } ) {
	const blockProps = useBlockProps( {
		className: 'cb-conditional-group-editor',
	} );

	const isActive = !! (
		attributes.cbConditions && attributes.cbConditions.enabled
	);

	return (
		<div { ...blockProps }>
			{ isActive && (
				<div className="cb-group-badge">
					{ __(
						'Conditional Group — rules active',
						'wbd-conditional-block'
					) }
				</div>
			) }
			<InnerBlocks
				templateLock={ false }
				renderAppender={ InnerBlocks.DefaultBlockAppender }
			/>
		</div>
	);
}
