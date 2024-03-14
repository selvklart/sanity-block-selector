import {useState} from 'react';

import type {Group} from '../types.d';

import {Accordion} from './accordion';
import {Search} from './search';
import {SearchResults} from './search-results';

interface Props {
    groups: Group[];
    filter: string;
}

export const ModalContent = ({groups, filter = ''}: Props) => {
    const [value, setValue] = useState(filter);
    return (
        <>
            <Search value={value} onChange={setValue} />
            <SearchResults groups={groups} filter={value} onClick={() => {}} />
            <Accordion groups={groups} filter={value} />
        </>
    );
};
