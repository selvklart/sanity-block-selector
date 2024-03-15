import {useState} from 'react';

import type {Group} from '../types.d';
import {cn} from '../utils';

import {Accordion} from './accordion';
import {Search} from './search';
import {SearchResults} from './search-results';

interface Props {
    groups: Group[];
    filter?: string;
}

export const DialogContent = ({groups, filter = ''}: Props) => {
    const [value, setValue] = useState(filter);
    return (
        <div className={cn('px-8', 'pb-8', 'pt-3')}>
            <Search value={value} onChange={setValue} />
            <SearchResults groups={groups} filter={value} />
            <Accordion groups={groups} filter={value} />
        </div>
    );
};
