import {useEffect, useState} from 'react';
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

    return (
        <Disclosure as="div" key={title} className={cn('pt-6')} defaultOpen={defaultOpen}>
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
                            )}
                        >
                            <span className={cn('text-base', 'font-semibold', 'leading-7')}>
                                {title}
                            </span>
                            <span className={cn('ml-6', 'flex', 'h-7', 'items-center')}>
                                {open ? (
                                    <ChevronUpIcon className={cn('size-6')} aria-hidden="true" />
                                ) : (
                                    <ChevronDownIcon className={cn('size-6')} aria-hidden="true" />
                                )}
                            </span>
                        </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className={cn('mt-2', 'flex', 'flex-col', 'gap-8')}>
                        <div className={cn('grid', 'grid-cols-2', 'gap-4')}>
                            {filteredBlocks?.withImage.map((block) => (
                                <BlockButton key={block.title} block={block} onClick={onClick} />
                            ))}
                        </div>

                        <div className={cn('grid', 'grid-cols-2', 'gap-4')}>
                            {filteredBlocks?.withDescription.map((block) => (
                                <BlockButton key={block.title} block={block} onClick={onClick} />
                            ))}
                        </div>

                        <div className={cn('grid', 'grid-cols-2', 'gap-4')}>
                            {filteredBlocks?.plain.map((block) => (
                                <BlockButton key={block.title} block={block} onClick={onClick} />
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
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
