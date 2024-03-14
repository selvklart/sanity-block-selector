import {useEffect, useMemo, useState} from 'react';
import {Disclosure} from '@headlessui/react';
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/outline';

import type {Block, Group} from '../types.d';
import {cn} from '../utils';

import {BlockButton} from './block-button';

interface Props {
    group: Group;
    filter: string;
    onClick: () => void;
}

export const AccordionTab = ({group, filter = '', onClick}: Props) => {
    const {title, blocks, defaultOpen} = group;

    const [groupedBlocks, setGroupedBlocks] = useState<{
        withImage: Block[];
        withDescription: Block[];
        plain: Block[];
    }>();
    useEffect(() => {
        const updateBlocks = async () => {
            const images = resolveImages(blocks);
            const validImages = await Promise.all(images.map(checkImageValidity));
            const {withImage, withDescription, plain} = groupBlocksByType(blocks, validImages);
            setGroupedBlocks({
                withImage,
                withDescription,
                plain,
            });
        };
        updateBlocks();
    }, [blocks]);

    const [filteredBlocks, setFilteredBlocks] = useState<{
        withImage: Block[];
        withDescription: Block[];
        plain: Block[];
    }>();
    useEffect(() => {
        if (!groupedBlocks) {
            return;
        }

        const {withImage, withDescription, plain} = groupedBlocks;
        const filterFn = (block: Block) => filterBlockByString(block, filter);
        setFilteredBlocks({
            withImage: withImage.filter(filterFn),
            withDescription: withDescription.filter(filterFn),
            plain: plain.filter(filterFn),
        });
    }, [filter, groupedBlocks]);

    const blockCount = useMemo(() => {
        return (
            (filteredBlocks?.withImage.length || 0) +
            (filteredBlocks?.withDescription.length || 0) +
            (filteredBlocks?.plain.length || 0)
        );
    }, [filteredBlocks]);

    return (
        <Disclosure
            as="div"
            key={title}
            className={cn('ring-1', 'ring-outset', 'ring-gray-300', 'rounded-lg')}
            defaultOpen={defaultOpen}
        >
            {({open}) => (
                <>
                    <dt>
                        <Disclosure.Button
                            className={cn(
                                'flex',
                                'w-full',
                                'items-start',
                                'justify-between',
                                'text-left',
                                'text-gray-900',
                                'hover:enabled:bg-stone-50',
                                'p-4',
                                'rounded-lg',
                                'disabled:opacity-50',
                                'disabled:cursor-not-allowed',
                                'disabled:bg-stone-50/80',
                            )}
                            disabled={blockCount === 0}
                        >
                            <div className={cn('flex', 'items-center', 'gap-4')}>
                                <span className={cn('text-base', 'font-semibold', 'leading-7')}>
                                    {title}
                                </span>
                                <span
                                    className={cn(
                                        'ml-auto',
                                        'w-8',
                                        'min-w-max',
                                        'whitespace-nowrap',
                                        'rounded-full',
                                        'px-2.5',
                                        'py-0.5',
                                        'text-center',
                                        'text-xs',
                                        'font-medium',
                                        'leading-5',
                                        'ring-1',
                                        'ring-inset',
                                        'ring-gray-900',
                                    )}
                                    aria-hidden="true"
                                >
                                    {blockCount}
                                </span>
                            </div>

                            <span className={cn('ml-6', 'flex', 'h-7', 'items-center')}>
                                {open ? (
                                    <ChevronUpIcon className={cn('size-5')} aria-hidden="true" />
                                ) : (
                                    <ChevronDownIcon className={cn('size-5')} aria-hidden="true" />
                                )}
                            </span>
                        </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel
                        as="dd"
                        className={cn('mt-2', 'p-2', 'flex', 'flex-col', 'gap-8', 'mb-20')}
                    >
                        <BlockGroup blocks={filteredBlocks?.withImage} onClick={onClick} />
                        <BlockGroup blocks={filteredBlocks?.withDescription} onClick={onClick} />
                        <BlockGroup blocks={filteredBlocks?.plain} onClick={onClick} />
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

interface BlockGroupProps {
    blocks?: Block[];
    onClick: () => void;
}

const BlockGroup = ({blocks, onClick}: BlockGroupProps) => {
    if (!blocks || blocks.length === 0) {
        return null;
    }

    return (
        <div className={cn('grid', 'grid-cols-2', 'gap-4')}>
            {blocks.map((block) => (
                <BlockButton key={block.title} block={block} onClick={onClick} />
            ))}
        </div>
    );
};

const filterBlockByString = (block: Block, filter: string) => {
    if (filter.length === 0) {
        return true;
    }
    const title = block.title.toLocaleLowerCase();
    const description = block.description?.toLocaleLowerCase();
    const filterLower = filter.toLocaleLowerCase();
    return title.includes(filterLower) || (description && description.includes(filterLower));
};

const resolveImages = (blocks: Block[]) => {
    return blocks.map((block) => {
        if (!block.imageURL) {
            return undefined;
        }
        const image = new Image();
        image.src = block.imageURL.href;
        return image;
    });
};

const checkImageValidity = async (image?: HTMLImageElement) => {
    if (!image) {
        return false;
    }
    return new Promise<boolean>((resolve) => {
        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
    });
};

const groupBlocksByType = (blocks: Block[], validImages: boolean[]) => {
    const withImage: Block[] = [];
    const withDescription: Block[] = [];
    const plain: Block[] = [];

    for (const [index, block] of blocks.entries()) {
        if (validImages[index]) {
            withImage.push(block);
        } else if (block.description) {
            withDescription.push(block);
        } else {
            plain.push(block);
        }
    }

    return {withImage, withDescription, plain};
};
