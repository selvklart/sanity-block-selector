import {useCallback, useEffect, useId, useState} from 'react';
import {createPortal} from 'react-dom';
import {PatchEvent, type PortableTextInputProps, type SchemaTypeDefinition, set} from 'sanity';
import {v4 as uuid} from 'uuid';

import {BlockSelectorContextProvider} from '../components/provider';
import {PortableTextButton} from '../sanity/portable-text-button';
import type {Block, Options} from '../types.d';
import {schemaAndOptionsToGroups} from '../utils';

export const WithPortableTextBlockSelector = (options: Options) =>
    function RichPortableText(props: PortableTextInputProps) {
        const id = useId();
        const {renderDefault} = props;
        const [container, setContainer] = useState<HTMLElement | null>(null);
        const [inlineEditor, setInlineEditor] = useState<HTMLElement | null>(null);
        const [paneEditor, setPaneEditor] = useState<HTMLElement | null>(null);
        useObservers(container, setInlineEditor, setPaneEditor);

        return (
            <div id={id} ref={setContainer} style={{display: 'contents'}}>
                {renderDefault(props)}
                {inlineEditor &&
                    createPortal(<Render {...props} options={options} />, inlineEditor)}
                {paneEditor && createPortal(<Render {...props} options={options} />, paneEditor)}
            </div>
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
            props.onChange(PatchEvent.from(set(newPortableText)));
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

// These observers make sure that the built-in block selector button is hidden,
// and replaced with our custom block selector button.
const useObservers = (
    container: HTMLElement | null,
    setInlineEditor: (value: HTMLElement | null) => void,
    setPaneEditor: (value: HTMLElement | null) => void,
) => {
    // Observer for inline editor
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                const showMoreButton = container?.querySelector(
                    '#menu-button[data-testid="insert-menu-button"]',
                );
                if (showMoreButton) {
                    (showMoreButton as HTMLButtonElement).style.display = 'none';
                }
                const portalContainer = showMoreButton?.parentElement;
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

    // Observer for pane editor
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                const showMoreButton = document?.querySelector(
                    'div[data-testid="document-panel-portal"] #menu-button[data-testid="insert-menu-button"]',
                );
                if (showMoreButton) {
                    (showMoreButton as HTMLButtonElement).style.display = 'none';
                }
                const portalContainer = showMoreButton?.parentElement;
                setPaneEditor(portalContainer ?? null);
            });
        });
        observer.observe(document, {childList: true, subtree: true});
        return () => {
            observer.disconnect();
        };
    }, [setPaneEditor]);
};
