/**
 * Save callback for the "Conditional Group" block. The block is rendered
 * dynamically on the frontend (see WBDCOBL_Block_Group::render() in PHP), but
 * WordPress still needs save() to serialize the inner block markup into
 * post_content so it survives edits, exports, and revisions.
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save();
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
