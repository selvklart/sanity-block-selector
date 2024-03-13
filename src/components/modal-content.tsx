import {useState} from 'react';

import type {Group} from '../types.d';

import {Accordion} from './accordion';
import {Search} from './search';

interface Props {
    groups: Group[];
}

export const ModalContent = ({groups}: Props) => {
    const [value, setValue] = useState('');
    return (
        <>
            <Search value={value} onChange={setValue} />
            <Accordion groups={groups} />
        </>
    );
};
