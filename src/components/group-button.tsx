import {useMemo} from 'react';

import type {Group} from '../types.d';
import {cn, filterBlockByString} from '../utils';

interface GroupButtonProps {
    group: Group;
    filter: string;
    activeGroup: Group | null;
    setActiveGroup: (group: Group | null) => void;
}

export const GroupButton = ({
    group,
    filter = '',
    activeGroup,
    setActiveGroup,
}: GroupButtonProps) => {
    const {title, blocks} = group;

    const blockCount = useMemo(() => {
        return blocks.filter((block) => filterBlockByString(block, filter)).length;
    }, [filter, blocks]);

    return (
        <Button
            title={title}
            active={activeGroup === group}
            count={blockCount}
            onClick={() => setActiveGroup(group)}
        />
    );
};

interface GroupButtonAllProps {
    groups: Group[];
    filter: string;
    activeGroup: Group | null;
    setActiveGroup: (group: Group | null) => void;
}

export const GroupButtonAll = ({
    groups,
    filter = '',
    activeGroup,
    setActiveGroup,
}: GroupButtonAllProps) => {
    const blockCount = useMemo(() => {
        return groups
            .flatMap((group) => group.blocks)
            .filter((block) => filterBlockByString(block, filter)).length;
    }, [filter, groups]);

    return (
        <Button
            title="All"
            active={activeGroup === null}
            count={blockCount}
            onClick={() => setActiveGroup(null)}
        />
    );
};

interface ButtonProps {
    title: string;
    active: boolean;
    count: number;
    onClick: () => void;
}

const Button = ({title, active, count, onClick}: ButtonProps) => {
    return (
        <button
            className={cn(
                'flex',
                'justify-between',
                'px-4',
                'py-2',
                'rounded',
                'w-full',
                'gap-8',
                active ? ['bg-blue-600', 'text-white'] : 'hover:bg-blue-50',
            )}
            onClick={onClick}
        >
            <div>{title}</div>
            <div className={cn(active ? 'text-gray-200' : 'text-gray-500')}>{count}</div>
        </button>
    );
};
