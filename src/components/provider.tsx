import type {ReactNode} from 'react';
import {createContext} from 'react';

import type {OnBlockSelectFn, TextOptions} from '../types.d';

interface Data {
    textOptions?: TextOptions;
    onSelectBlock: OnBlockSelectFn;
}

export const BlockSelectorContext = createContext<Data>({
    textOptions: undefined,
    onSelectBlock: () => {},
});

interface Props {
    textOptions?: TextOptions;
    onSelectBlock: OnBlockSelectFn;
    children?: ReactNode;
}

export const BlockSelectorContextProvider = ({textOptions, onSelectBlock, children}: Props) => {
    return (
        <BlockSelectorContext.Provider
            value={{
                textOptions,
                onSelectBlock,
            }}
        >
            {children}
        </BlockSelectorContext.Provider>
    );
};
