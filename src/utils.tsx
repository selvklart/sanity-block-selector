import type {ClassValue} from 'clsx';
import clsx from 'clsx';
import type {FieldDefinition, SchemaTypeDefinition} from 'sanity';
import {twMerge} from 'tailwind-merge';

import type {Block, Group, InitialValue, Options} from './types.d';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const filterBlockByString = (block: Block, filter: string) => {
    if (filter.length === 0) {
        return true;
    }
    const title = block.title.toLocaleLowerCase();
    const description = block.description?.toLocaleLowerCase();
    const filterLower = filter.toLocaleLowerCase();
    return title.includes(filterLower) || (description && description.includes(filterLower));
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
            title: options.text?.other ?? 'Other',
            blocks: schemaDefinitions
                .filter(
                    (block) =>
                        !blockPreviews.some((group) =>
                            Object.keys(group.blocks).includes(block.name),
                        ) && !excludedBlocks?.includes(block.name),
                )
                .map((block): Block => {
                    const initialValue = getSchemaInitialValues(block);
                    return {
                        _key: block.name,
                        name: block.name,
                        title: block.title ?? '',
                        initialValue,
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
        const initialValue = getSchemaInitialValues(definition);
        return {
            _key: definition.name,
            name: definition.name,
            title: definition.title ?? '',
            description: definitionOption?.description,
            imageURL: definitionOption?.imageURL
                ? new URL(definitionOption.imageURL, window.location.origin)
                : undefined,
            initialValue,
        };
    });

    return groupBlocks;
};

const getSchemaInitialValues = (
    schemaDefinition: SchemaTypeDefinition | FieldDefinition,
): InitialValue => {
    if ('fields' in schemaDefinition) {
        return (
            schemaDefinition.fields?.reduce((acc, field) => {
                const nestedFields =
                    typeof field.type === 'string'
                        ? field.initialValue
                        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          getSchemaInitialValues((field as any).type as SchemaTypeDefinition);

                return {
                    ...acc,
                    [field.name]: nestedFields,
                };
            }, {} as InitialValue) ?? null
        );
    } else if ('initialValue' in schemaDefinition) {
        return schemaDefinition.initialValue;
    }

    return null;
};
