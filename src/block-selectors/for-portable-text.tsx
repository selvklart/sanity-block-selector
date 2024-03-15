import {useCallback, useEffect, useId, useState} from 'react';
import {ThemeProvider} from '@sanity/ui';
import {buildTheme} from '@sanity/ui/theme';
import {type PortableTextInputProps, type SchemaTypeDefinition, set} from 'sanity';
import {v4 as uuid} from 'uuid';

import {BlockSelectorContextProvider} from '../components/provider';
import {PortableTextButton} from '../sanity/portable-text-button';
import {Replacer} from '../sanity/replacer';
import type {Block, Options} from '../types.d';
import {cn, schemaAndOptionsToGroups} from '../utils';

import '../index.css';

export const WithPortableTextBlockSelector = (options: Options) =>
    function RichPortableText(props: PortableTextInputProps) {
        const id = useId();
        const {renderDefault} = props;
        const theme = buildTheme();
        const [container, setContainer] = useState<HTMLElement | null>(null);

        return (
            <ThemeProvider theme={theme}>
                <div id={id} ref={setContainer} className={cn('contents')}>
                    {renderDefault(props)}
                    <Render {...props} options={options} />
                    <Replacer
                        root={container}
                        hideQuery='& > [data-testid="insert-menu-button"]'
                        replacementNode={<Render {...props} options={options} />}
                    />
                    <Replacer
                        root={document}
                        hideQuery='div[data-testid="document-panel-portal"] #menu-button[data-testid="insert-menu-button"]'
                        replacementNode={<Render {...props} options={options} />}
                    />
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

    useEffect(() => {
        const block = props.focusPath.at(0);
        if (
            typeof block !== 'string' &&
            typeof block !== 'undefined' &&
            typeof block !== 'number' &&
            !Array.isArray(block)
        ) {
            setFocusedBlock(block._key);
        }
    }, [props.focusPath]);

    const groups = schemaAndOptionsToGroups(schemaDefinitions, props.options);
    return (
        <BlockSelectorContextProvider
            textOptions={props.options.text}
            onSelectBlock={onSelectBlock}
        >
            <PortableTextButton groups={groups} open={open} setOpen={setOpen} />
        </BlockSelectorContextProvider>
    );
};
