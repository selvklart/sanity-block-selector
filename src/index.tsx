import {useCallback, useEffect, useId, useMemo, useState} from 'react';
import {ThemeProvider} from '@sanity/ui';
import {buildTheme} from '@sanity/ui/theme';
import {type PortableTextInputProps, type SchemaTypeDefinition, set} from 'sanity';
import {v4 as uuid} from 'uuid';

import {BlockSelectorContextProvider} from './components/provider';
import {ContentArrayButton} from './sanity/content-array-button';
import {PortableTextButton} from './sanity/portable-text-button';
import {Replacer} from './sanity/replacer';
import type {Block, Options} from './types.d';
import {cn, schemaAndOptionsToGroups} from './utils';

import './index.css';

const portableTextReplaceQueries = [
    '& > [data-testid="insert-menu-button"]',
    'div[data-testid="document-panel-portal"] #menu-button[data-testid="insert-menu-button"]',
];

const contentArrayReplaceQueries = [
    '& > [data-ui="Stack"] > [data-ui="Grid"] > [data-ui="MenuButton"]',
];

export const WithBlockSelector = (options: Options) =>
    function BlockSelector(props: PortableTextInputProps) {
        const id = useId();
        const {renderDefault} = props;
        const theme = buildTheme();
        const [container, setContainer] = useState<HTMLElement | null>(null);

        const hideQueries =
            options.replaceQueries ??
            (options.type === 'portable-text'
                ? portableTextReplaceQueries
                : contentArrayReplaceQueries);

        return (
            <ThemeProvider theme={theme}>
                <div id={id} ref={setContainer} className={cn('contents')}>
                    {renderDefault(props)}
                    <Render {...props} options={options} />
                    {hideQueries.map((query) => (
                        <Replacer
                            key={query}
                            root={container}
                            hideQuery={query}
                            replacementNode={<Render {...props} options={options} />}
                        />
                    ))}
                </div>
            </ThemeProvider>
        );
    };

const Render = (props: PortableTextInputProps & {options: Options}) => {
    const [open, setOpen] = useState(false);

    const schema = props.schemaType as unknown as {of: SchemaTypeDefinition[]};
    const schemaDefinitions = schema.of.filter(
        (block) => !props.options.excludedBlocks?.includes(block.name),
    );
    const [focusedBlock, setFocusedBlock] = useState<string | null>(null);

    // When a block is selected, add it to the Sanity field value.
    const onSelectBlock = useCallback(
        (block: Block) => {
            const focusedIndex = props.value?.findIndex((block) => block._key === focusedBlock);
            const newPortableText = [...(props.value ?? [])];
            if (focusedIndex !== undefined && focusedIndex !== -1) {
                newPortableText.splice(focusedIndex + 1, 0, {
                    _key: uuid(),
                    _type: block.name,
                });
            } else {
                newPortableText.push({
                    _key: uuid(),
                    _type: block.name,
                });
            }
            props.onChange(set(newPortableText));
            setOpen(false);
        },
        [props, focusedBlock],
    );

    // Keep track of the focused block, so that we can insert the new block after it.
    // If the type is content-array, we don't need to keep track of the focused block,
    // and the new block is always added to the end of the array.
    useEffect(() => {
        if (props.options.type === 'content-array') {
            return;
        }

        const block = props.focusPath.at(0);
        if (
            typeof block !== 'string' &&
            typeof block !== 'undefined' &&
            typeof block !== 'number' &&
            !Array.isArray(block)
        ) {
            setFocusedBlock(block._key);
        }
    }, [props.focusPath, props.options.type]);

    // Create groups from the schema definitions and the options.
    const groups = useMemo(
        () => schemaAndOptionsToGroups(schemaDefinitions, props.options),
        [schemaDefinitions, props.options],
    );

    return (
        <BlockSelectorContextProvider
            textOptions={props.options.text}
            onSelectBlock={onSelectBlock}
        >
            {props.options.type === 'content-array' ? (
                <ContentArrayButton groups={groups} open={open} setOpen={setOpen} />
            ) : (
                <PortableTextButton groups={groups} open={open} setOpen={setOpen} />
            )}
        </BlockSelectorContextProvider>
    );
};

export default WithBlockSelector;
