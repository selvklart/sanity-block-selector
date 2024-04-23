import type {Group} from '../types.d';
import {cn} from '../utils';

import {GroupButton, GroupButtonAll} from './group-button';

interface Props {
    groups: Group[];
    filter: string;
    activeGroup: Group | null;
    setActiveGroup: (group: Group | null) => void;
}

export const GroupsList = ({groups, filter = '', activeGroup, setActiveGroup}: Props) => {
    return (
        <ul className={cn('mt-8', 'space-y-3')}>
            <GroupButtonAll
                key="all"
                groups={groups}
                filter={filter}
                activeGroup={activeGroup}
                setActiveGroup={setActiveGroup}
            />
            {groups.map((group) => (
                <GroupButton
                    key={group.title}
                    group={group}
                    filter={filter}
                    activeGroup={activeGroup}
                    setActiveGroup={setActiveGroup}
                />
            ))}
        </ul>
    );
};
