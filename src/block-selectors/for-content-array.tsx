import {useCallback, useEffect, useId, useState} from 'react';
import {createPortal} from 'react-dom';
import {type PortableTextInputProps, type SchemaTypeDefinition, set} from 'sanity';
import {v4 as uuid} from 'uuid';

import {BlockSelectorContextProvider} from '../components/provider';
import {ContentArrayButton} from '../sanity/content-array-button';
import type {Block, Options} from '../types.d';
import {schemaAndOptionsToGroups} from '../utils';

import '../index.css';

export const WithContentArrayBlockSelector = (options: Options) =>
    function ContentArray(props: PortableTextInputProps) {
        const id = useId();
        const {renderDefault} = props;
        const [container, setContainer] = useState<HTMLElement | null>(null);
        const [inlineEditor, setInlineEditor] = useState<HTMLElement | null>(null);
        useObservers(container, setInlineEditor);

        return (
            <div id={id} ref={setContainer} style={{display: 'contents'}}>
                {renderDefault(props)}
                {inlineEditor &&
                    createPortal(<Render {...props} options={options} />, inlineEditor)}
            </div>
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

// These observers make sure that the built-in block selector button is hidden,
// and replaced with our custom block selector button.
const useObservers = (
    container: HTMLElement | null,
    setInlineEditor: (value: HTMLElement | null) => void,
) => {
    // Observer for inline editor
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                const addItemButton = container?.querySelector(
                    '& > [data-ui="Stack"] > [data-ui="Grid"] > [data-ui="MenuButton"]',
                );
                if (addItemButton) {
                    (addItemButton as HTMLButtonElement).style.display = 'none';
                }
                const portalContainer = addItemButton?.parentElement;
                setInlineEditor(portalContainer ?? null);
            });
        });
        if (container) {
            observer.observe(container, {childList: true, subtree: true});
        }
        return () => {
            observer.disconnect();
        };
    }, [container, setInlineEditor]);
};
