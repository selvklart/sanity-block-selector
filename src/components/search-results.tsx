import {useMemo} from 'react';

import type {Block, Group} from '../types.d';
import {cn, levenshteinDistance} from '../utils';

import {BlockButton} from './block-button';

interface Props {
    groups: Group[];
    filter: string;
    onClick: () => void;
}

export const SearchResults = ({groups, filter, onClick}: Props) => {
    const results = useMemo(
        () =>
            groups
                .flatMap((group) => group.blocks)
                .filter((block) =>
                    filter
                        .split(' ')
                        .every((word) =>
                            block.title.toLocaleLowerCase().includes(word.toLocaleLowerCase()),
                        ),
                )
                .sort((a, b) => sortResults(a, b, filter))
                .slice(0, 2),
        [groups, filter],
    );

    if (filter === '') {
        return null;
    }

    if (results.length === 0) {
        return <div className={cn('px-4', 'py-8', 'text-sm', 'text-gray-500')}>No results</div>;
    }

    return (
        <div className={cn('grid', 'grid-cols-2', 'py-8', 'gap-4')}>
            {results.map((block) => (
                <BlockButton key={block.title} block={block} onClick={onClick} />
            ))}
        </div>
    );
};

const sortResults = (a: Block, b: Block, filter: string) => {
    const words = filter.toLocaleLowerCase().split(' ');
    const aWords = a.title.toLocaleLowerCase().split(' ');
    const bWords = b.title.toLocaleLowerCase().split(' ');

    const aSimilarity = words.reduce(
        (acc, word) =>
            acc +
            aWords.reduce(
                (min, aWord) => Math.min(min, levenshteinDistance(aWord, word)),
                Infinity,
            ),
        0,
    );
    const bSimilarity = words.reduce(
        (acc, word) =>
            acc +
            bWords.reduce(
                (min, bWord) => Math.min(min, levenshteinDistance(bWord, word)),
                Infinity,
            ),
        0,
    );

    return aSimilarity - bSimilarity;
};
