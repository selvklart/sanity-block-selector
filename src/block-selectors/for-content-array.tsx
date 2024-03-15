import {useCallback, useId, useState} from 'react';
import {ThemeProvider} from '@sanity/ui';
import {buildTheme} from '@sanity/ui/theme';
import {type PortableTextInputProps, type SchemaTypeDefinition, set} from 'sanity';
import {v4 as uuid} from 'uuid';

import {BlockSelectorContextProvider} from '../components/provider';
import {ContentArrayButton} from '../sanity/content-array-button';
import {Replacer} from '../sanity/replacer';
import type {Block, Options} from '../types.d';
import {cn, schemaAndOptionsToGroups} from '../utils';

import '../index.css';

export const WithContentArrayBlockSelector = (options: Options) =>
    function ContentArray(props: PortableTextInputProps) {
        const id = useId();
        const {renderDefault} = props;
        const theme = buildTheme();
        const [container, setContainer] = useState<HTMLElement | null>(null);

        return (
            <ThemeProvider theme={theme}>
                <div id={id} ref={setContainer} className={cn('contents')}>
                    {renderDefault(props)}
                    <Replacer
                        root={container}
                        hideQuery='& > [data-ui="Stack"] > [data-ui="Grid"] > [data-ui="MenuButton"]'
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

    const onSelectBlock = useCallback(
        (block: Block) => {
            const newPortableText = [...(props.value ?? [])];
            newPortableText.push({
                _key: uuid(),
                _type: block.name,
            });
            props.onChange(set(newPortableText));
            setOpen(false);
        },
        [props],
    );

    const groups = schemaAndOptionsToGroups(schemaDefinitions, props.options);
    return (
        <BlockSelectorContextProvider
            textOptions={props.options.text}
            onSelectBlock={onSelectBlock}
        >
            <ContentArrayButton groups={groups} open={open} setOpen={setOpen} />
        </BlockSelectorContextProvider>
    );
};
