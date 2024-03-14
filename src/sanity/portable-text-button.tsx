import type {Dispatch, SetStateAction} from 'react';
import {EllipsisHorizontalIcon} from '@heroicons/react/24/outline';
import {Button} from '@sanity/ui';

import type {Group, OnBlockSelectFn} from '../types.d';

import {Dialog} from './dialog';

interface Props {
    groups: Group[];
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onSelectBlock: OnBlockSelectFn;
}

export const PortableTextButton = ({groups, open, setOpen, onSelectBlock}: Props) => {
    return (
        <>
            <Button tone="default" mode="bleed" onClick={() => setOpen(true)} padding={1}>
                <EllipsisHorizontalIcon height={21} width={21} />
            </Button>
            {open && (
                <Dialog
                    groups={groups}
                    onClose={() => setOpen(false)}
                    onSelectBlock={onSelectBlock}
                />
            )}
        </>
    );
};
