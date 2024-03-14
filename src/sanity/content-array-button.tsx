import {useCallback, useState} from 'react';
import {AddIcon} from '@sanity/icons';
import {Button} from '@sanity/ui';

import type {Group, OnBlockSelectFn} from '../types.d';

import {Dialog} from './dialog';

interface Props {
    groups: Group[];
    onSelectBlock: OnBlockSelectFn;
}

export const ContentArrayButton = ({groups, onSelectBlock}: Props) => {
    const [open, setOpen] = useState(false);
    const onClose = useCallback(() => setOpen(false), []);
    const onOpen = useCallback(() => setOpen(true), []);

    return (
        <>
            <Button
                tone="default"
                mode="ghost"
                onClick={onOpen}
                icon={AddIcon}
                padding={[3, 3, 4]}
                text="Add item"
                width="fill"
            />
            {open && <Dialog groups={groups} onClose={onClose} onSelectBlock={onSelectBlock} />}
        </>
    );
};
