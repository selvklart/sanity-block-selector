import {useId} from 'react';
import {Dialog as SanityDialog} from '@sanity/ui';

import {DialogContent} from '../components/dialog-content';
import type {Group, OnBlockSelectFn} from '../types.d';

interface Props {
    groups: Group[];
    onClose: () => void;
    onSelectBlock: OnBlockSelectFn;
}

export const Dialog = ({groups, onClose, onSelectBlock}: Props) => {
    const id = useId();
    return (
        <SanityDialog header="Select block" id={id} onClose={onClose} zOffset={200} width={1}>
            <DialogContent groups={groups} onSelectBlock={onSelectBlock} />
        </SanityDialog>
    );
};
