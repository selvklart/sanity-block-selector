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
        withoutImage: Block[];
    }>();

    useEffect(() => {
        const relevantBlocks = groups
            .filter((group) => activeGroup === null || activeGroup.title === group.title)
            .flatMap((group) => group.blocks)
            .filter((block) => filterBlockByString(block, filter));
        const groupedBlocks = groupBlocksByType(relevantBlocks);
        setBlocks(groupedBlocks);
    }, [groups, filter, activeGroup]);

    if ((blocks?.withImage.length ?? 0) + (blocks?.withoutImage.length ?? 0) === 0) {
        return (
            <div className={cn('mt-12', 'italic')}>{textOptions?.noResults ?? 'No results'}</div>
        );
    }

    return (
        <ul className={cn('mt-12', 'space-y-4')}>
            <BlockGroup blocks={blocks?.withImage} />
            <BlockGroup blocks={blocks?.withoutImage} />
        </ul>
    );
};

const groupBlocksByType = (blocks: Block[]) => {
    const withImage = blocks
        .filter((block) => block.imageURL)
        .sort((a, b) => a.title.localeCompare(b.title));
    const withoutImage = blocks
        .filter((block) => !block.imageURL)
        .sort((a, b) => a.title.localeCompare(b.title));

    return {withImage, withoutImage};
};
