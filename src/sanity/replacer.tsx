import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

interface Props {
    root: HTMLElement | Document | null;
    hideQuery: string;
    replacementNode: ReactNode;
}

export const Replacer = ({root, hideQuery, replacementNode}: Props) => {
    const [parent, setParent] = useState<HTMLElement | null>(null);
    useObservers(root, hideQuery, setParent);

    if (!parent) {
        return null;
    }

    return createPortal(replacementNode, parent);
};

// These observers make sure that the built-in block selector button is hidden,
// and replaced with our custom block selector button.
const useObservers = (
    container: HTMLElement | Document | null,
    hideQuery: string,
    setParent: (value: HTMLElement | null) => void,
) => {
    // Observer for inline editor
    useEffect(() => {
        const observeForButton = () => {
            const replaced = container?.querySelector(hideQuery);
            if (replaced) {
                (replaced as HTMLButtonElement).style.display = 'none';
            } else {
                console.warn('Could not find element that matches the query. Skipping.', hideQuery);
            }
            const portalContainer = replaced?.parentElement;
            setParent(portalContainer ?? null);
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach(observeForButton);
        });
        if (container) {
            observer.observe(container, {childList: true, subtree: true});
            observeForButton();
        }
        return () => {
            observer.disconnect();
        };
    }, [container, hideQuery, setParent]);
};
