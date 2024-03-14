import {useId} from 'react';
import {Dialog as SanityDialog} from '@sanity/ui';

import {DialogContent} from '../components/dialog-content';
import type {Group} from '../types.d';

interface Props {
    groups: Group[];
    onClose: () => void;
}

export const Dialog = ({groups, onClose}: Props) => {
    const id = useId();
    return (
        <SanityDialog header="Select block" id={id} onClose={onClose} zOffset={200} width={1}>
            <DialogContent groups={groups} />
        </SanityDialog>
    );
};
