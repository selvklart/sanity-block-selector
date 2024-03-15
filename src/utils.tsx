import type {ClassValue} from 'clsx';
import clsx from 'clsx';
import type {SchemaTypeDefinition} from 'sanity';
import {twMerge} from 'tailwind-merge';

import type {Block, Group, Options} from './types.d';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const isImageValid = async (url: URL) => {
    return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.src = url.href;
        img.onload = () => resolve(true);
        img.onerror = () => {
            console.warn(`Image at ${url.href} failed to load`);
            resolve(false);
        };
    });
};

// Used to find the most similar search result
export const levenshteinDistance = (a: string, b: string) => {
    const distanceMatrix: number[][] = Array(b.length + 1)
        .fill(null)
        .map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i += 1) {
        distanceMatrix[0][i] = i;
    }

    for (let j = 0; j <= b.length; j += 1) {
        distanceMatrix[j][0] = j;
    }

    for (let j = 1; j <= b.length; j += 1) {
        for (let i = 1; i <= a.length; i += 1) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            distanceMatrix[j][i] = Math.min(
                distanceMatrix[j][i - 1] + 1,
                distanceMatrix[j - 1][i] + 1,
                distanceMatrix[j - 1][i - 1] + indicator,
            );
        }
    }

    return distanceMatrix[b.length][a.length];
};

export const schemaAndOptionsToGroups = (
    schemaDefinitions: SchemaTypeDefinition[],
    options: Options,
): Group[] => {
    const {blockPreviews, excludedBlocks, showOther} = options;
    let blockCount = 0;
    const groups = blockPreviews.map<Group>((optionGroup) => {
        const groupBlocks = schemaAndOptionsGroupToBlocks(schemaDefinitions, optionGroup);
        blockCount += groupBlocks.length;
        return {
            title: optionGroup.title,
            blocks: groupBlocks,
        };
    });

    if (blockCount < schemaDefinitions.length - (excludedBlocks?.length ?? 0) && showOther) {
        groups.push({
            title: 'Other',
            blocks: schemaDefinitions
                .filter(
                    (block) =>
                        !blockPreviews.some((group) =>
                            Object.keys(group.blocks).includes(block.name),
                        ) && !excludedBlocks?.includes(block.name),
                )
                .map((block): Block => {
                    return {
                        _key: block.name,
                        name: block.name,
                        title: block.title ?? '',
                    };
                }),
        });
    }
    return groups;
};

const schemaAndOptionsGroupToBlocks = (
    schemaDefinitions: SchemaTypeDefinition[],
    group: Options['blockPreviews'][number],
): Block[] => {
    // Find schema definitions that are relevant for this group
    const definitions = schemaDefinitions.filter((definition) =>
        Object.keys(group.blocks).includes(definition.name),
    );

    // Map the definitions to blocks
    const groupBlocks = definitions.map((definition) => {
        const definitionOption = group.blocks[definition.name];
        return {
            _key: definition.name,
            name: definition.name,
            title: definition.title ?? '',
            description: definitionOption?.description,
            imageURL: definitionOption?.imageURL ? new URL(definitionOption.imageURL) : undefined,
        };
    });

    return groupBlocks;
};
