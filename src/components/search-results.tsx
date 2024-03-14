import {useMemo} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import type {Block, Group, OnBlockSelectFn} from '../types.d';
import {cn, levenshteinDistance} from '../utils';

import {BlockButton} from './block-button';

interface Props {
    groups: Group[];
    filter: string;
    onSelectBlock: OnBlockSelectFn;
}

export const SearchResults = ({groups, filter, onSelectBlock}: Props) => {
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

    return (
        <AnimatePresence mode="wait">
            {filter === '' && null}
            {filter !== '' && results.length === 0 && (
                <motion.div
                    key="no-results"
                    className={cn('inline-block', 'px-4', 'py-8', 'text-sm', 'text-gray-500')}
                    initial={{scale: 0, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    exit={{scale: 0, opacity: 0}}
                >
                    No results
                </motion.div>
            )}
            {filter !== '' && results.length > 0 && (
                <motion.div
                    className={cn('grid', 'grid-cols-2', 'py-8', 'gap-4')}
                    initial={{scale: 0, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    exit={{scale: 0, opacity: 0}}
                >
                    {results.map((block) => (
                        <BlockButton
                            key={block.title}
                            block={block}
                            onSelectBlock={onSelectBlock}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
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
