import type {Group} from '../types.d';
import {cn} from '../utils';

import {AccordionTab} from './accordion-tab';

interface Props {
    groups: Group[];
    filter: string;
}

export const Accordion = ({groups, filter = ''}: Props) => {
    return (
        <dl className={cn('mt-8', 'space-y-4')}>
            {groups.map((group) => (
                <AccordionTab key={group.title} group={group} filter={filter} onClick={() => {}} />
            ))}
        </dl>
    );
};
