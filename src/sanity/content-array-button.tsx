import {type Dispatch, type SetStateAction, useContext} from 'react';
import {AddIcon} from '@sanity/icons';
import {Button} from '@sanity/ui';

import {BlockSelectorContext} from '../components/provider';
import type {Group} from '../types.d';

import {Dialog} from './dialog';

interface Props {
    groups: Group[];
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ContentArrayButton = ({groups, open, setOpen}: Props) => {
    const {textOptions} = useContext(BlockSelectorContext);
    return (
        <>
            <Button
                tone="default"
                mode="ghost"
                onClick={() => setOpen(true)}
                icon={AddIcon}
                padding={[3, 3, 3]}
                text={textOptions?.addItem ?? 'Add item'}
                width="fill"
            />
            {open && <Dialog groups={groups} onClose={() => setOpen(false)} />}
        </>
    );
};
