import {useState} from 'react';

import type {Group} from '../types.d';

import {Accordion} from './accordion';
import {Search} from './search';

interface Props {
    groups: Group[];
    filter: string;
}

export const ModalContent = ({groups, filter = ''}: Props) => {
    const [value, setValue] = useState(filter);
    return (
        <>
            <Search value={value} onChange={setValue} />
            <Accordion groups={groups} filter={filter} />
        </>
    );
};
