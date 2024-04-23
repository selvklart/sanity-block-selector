import {useContext, useEffect, useState} from 'react';

import type {Block, Group} from '../types.d';
import {cn, filterBlockByString} from '../utils';

import {BlockGroup} from './block-group';
import {BlockSelectorContext} from './provider';

interface Props {
    groups: Group[];
    filter: string;
    activeGroup: Group | null;
}

export const BlockList = ({groups, filter = '', activeGroup}: Props) => {
    const {textOptions} = useContext(BlockSelectorContext);
    const [blocks, setBlocks] = useState<{
        withImage: Block[];
        withDescription: Block[];
        plain: Block[];
    }>();

    useEffect(() => {
        const updateBlocks = async () => {
            const relevantBlocks = groups
                .filter((group) => activeGroup === null || activeGroup === group)
                .flatMap((group) => group.blocks)
                .filter((block) => filterBlockByString(block, filter));
            setBlocks(await groupBlocks(relevantBlocks));
        };

        updateBlocks();
    }, [groups, filter, activeGroup]);

    if (
        (blocks?.withImage.length ?? 0) +
            (blocks?.withDescription.length ?? 0) +
            (blocks?.plain.length ?? 0) ===
        0
    ) {
        return (
            <div className={cn('mt-12', 'italic')}>{textOptions?.noResults ?? 'No results'}</div>
        );
    }

    return (
        <ul className={cn('mt-12', 'space-y-4')}>
            <BlockGroup blocks={blocks?.withImage} />
            <BlockGroup blocks={blocks?.withDescription} />
            <BlockGroup blocks={blocks?.plain} />
        </ul>
    );
};

const groupBlocks = async (blocks: Block[]) => {
    const images = resolveImages(blocks);
    const validImages = await Promise.all(images.map(checkImageValidity));
    return groupBlocksByType(blocks, validImages);
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
