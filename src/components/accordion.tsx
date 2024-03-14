import type {Group} from '../types.d';
import {cn} from '../utils';

import {AccordionTab} from './accordion-tab';

interface Props {
    groups: Group[];
    filter: string;
}

export const Accordion = ({groups, filter = ''}: Props) => {
    return (
        <dl className={cn('mt-8', 'space-y-3')}>
            {groups.map((group) => (
                <AccordionTab key={group.title} group={group} filter={filter} onClick={() => {}} />
            ))}
        </dl>
    );
};

/* import React, {useEffect, useId, useState} from 'react';
import {PatchEvent, PortableTextInputProps, SchemaTypeDefinition, set} from 'sanity';
import {Box, Button, Dialog, Stack, Text} from '@sanity/ui';
import {createPortal} from 'react-dom';
import {EllipsisHorizontalIcon} from '@heroicons/react/24/outline';
import {v4 as uuid} from 'uuid';

type Options = {
	blockPreviews: BlockPreview[],
	excludedBlocks: string[],
	showOther: boolean
}

export const WithPortableTextBlockSelector = (options: Options) => function RichPortableText(props: PortableTextInputProps) {
	const id = useId();
	const {renderDefault} = props;
	const [container, setContainer] = useState<HTMLElement | null>(null);
	const [inlineEditor, setInlineEditor] = useState<HTMLElement | null>(null);
	const [paneEditor, setPaneEditor] = useState<HTMLElement | null>(null);

	// Observer for inline editor
	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach(() => {
				const showMoreButton = container?.querySelector('#menu-button[data-testid="insert-menu-button"]');
				if (showMoreButton) {
					(showMoreButton as HTMLButtonElement).style.display = 'none';
				}
				const portalContainer = showMoreButton?.parentElement;
				setInlineEditor(portalContainer ?? null);
			});
		});

		if (container) {
			observer.observe(container, {childList: true, subtree: true});
		}

		return () => {
			observer.disconnect();
		};
	}, [container]);

	// Observer for pane editor
	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach(() => {
				const showMoreButton = document?.querySelector('div[data-testid="document-panel-portal"] #menu-button[data-testid="insert-menu-button"]');
				if (showMoreButton) {
					(showMoreButton as HTMLButtonElement).style.display = 'none';
				}
				const portalContainer = showMoreButton?.parentElement;
				setPaneEditor(portalContainer ?? null);
			});
		});

		observer.observe(document, {childList: true, subtree: true});

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div id={id} ref={setContainer} style={{display: 'contents'}}>
			{renderDefault(props)}
			{inlineEditor && createPortal(
				<Render {...props} options={options} />,
				inlineEditor
			)}
			{paneEditor && createPortal(
				<Render {...props} options={options} />,
				paneEditor
			)}
		</div>
	);
};


const Render = (props: PortableTextInputProps & {options: Options}) => {
	const {useCallback, useState} = React;
	const [open, setOpen] = useState(false);
	const onClose = useCallback(() => setOpen(false), []);
	const onOpen = useCallback(() => setOpen(true), []);
	const schema = props.schemaType as unknown as {of: SchemaTypeDefinition[]};
	const blocks = schema.of.filter((block) => !props.options.excludedBlocks.includes(block.name));
	const [focusedBlock, setFocusedBlock] = useState<string | null>(null);

	const onClick = useCallback((block: SchemaTypeDefinition) => {
		const focusedIndex = props.value?.findIndex((block) => block._key === focusedBlock);
		const newPortableText = [...props.value ?? []];
		if (focusedIndex !== undefined && focusedIndex !== -1) {
			newPortableText.splice(focusedIndex + 1, 0, {
				_key: uuid(),
				_type: block.name
			});
		} else {
			newPortableText.push({
				_key: uuid(),
				_type: block.name
			});
		}
		props.onChange(PatchEvent.from(set(newPortableText)));
		onClose();
	}, [props, focusedBlock, onClose]);

	useEffect(() => {
		const block = props.focusPath.at(0);
		if (typeof block !== 'string' && typeof block !== 'undefined' && typeof block !== 'number' && !Array.isArray(block)) {
			setFocusedBlock(block._key);
		}
	}, [props.focusPath]);

	useEffect(() => {
		onOpen();
	}, []);

	const groups = blocksToGroupPreviews(blocks, props.options);
	return (
		<>
			<Button tone='default' mode="bleed" onClick={onOpen} padding={1}>
				<EllipsisHorizontalIcon height={21} width={21} />
			</Button>
			{
				open && (
					<Dialog
						header="Select block"
						id="dialog-select-block"
						onClose={onClose}
						zOffset={200}
						width={1}
					>
						<Stack space={6} padding={4}>
							{groups.map((group) => (
								<RenderGroup
									key={group.title}
									group={group}
									onClick={onClick}
								/>
							))}
						</Stack>
					</Dialog>
				)
			}
		</>
	);
};

interface RenderGroupProps {
	group: GroupPreview;
	onClick: (block: SchemaTypeDefinition) => void;
}

const RenderGroup = ({group, onClick}: RenderGroupProps) => {
	return (
		<Stack space={3}>
			<Text size={2} weight='bold'>{group.title}</Text>
			<Box style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
				{group.blocks.map((block) => (
					<Button
						key={block.type}
						tone='default'
						mode="bleed"
						style={{
							borderRadius: '3px',
							flexBasis: 'calc(50% - 1rem)',
							maxWidth: 'calc(50% - 1rem)'
						}}
						onClick={() => onClick(block)}
						padding={4}
					>
						<Stack space={3}>
							<Text size={1} weight='medium'>{block.title}</Text>
							{block.previewImage && <img src={block.previewImage} alt=""></img>}
						</Stack>
					</Button>
				))}
			</Box>
		</Stack>
	);
};

type BlockPreview = {
	title: string;
	blocks: {
		[key: string]: string;
	}
}

type GroupPreview = {
	title: string;
	blocks: (SchemaTypeDefinition & {previewImage: string})[];
}

const blocksToGroupPreviews = (blocks: SchemaTypeDefinition[], options: Options): GroupPreview[] => {
	const {blockPreviews, excludedBlocks} = options;
	let blockCount = 0;
	const groups = blockPreviews.map((group) => {
		return {
			title: group.title,
			blocks: blocks.filter((block) => Object.keys(group.blocks).includes(block.name)).map((block) => {
				blockCount++;
				return {
					...block,
					previewImage: group.blocks[block.name]
				};
			})
		};
	});

	if (blockCount < blocks.length - excludedBlocks.length && options.showOther) {
		groups.push({
			title: 'Other',
			blocks: blocks.filter((block) => !blockPreviews.some((group) => Object.keys(group.blocks).includes(block.name))).map((block) => {
				return {
					...block,
					previewImage: ''
				};
			})
		});
	}

	return groups;
};
 */
