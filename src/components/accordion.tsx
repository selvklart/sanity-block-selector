import type {Group, OnBlockSelectFn} from '../types.d';
import {cn} from '../utils';

import {AccordionTab} from './accordion-tab';

interface Props {
    groups: Group[];
    filter: string;
    onSelectBlock: OnBlockSelectFn;
}

export const Accordion = ({groups, filter = '', onSelectBlock}: Props) => {
    return (
        <dl className={cn('mt-8', 'space-y-4')}>
            {groups.map((group) => (
                <AccordionTab
                    key={group.title}
                    group={group}
                    filter={filter}
                    onSelectBlock={onSelectBlock}
                />
            ))}
        </dl>
    );
};
