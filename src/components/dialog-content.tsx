import {useEffect, useState} from 'react';

import type {Group} from '../types.d';
import {cn} from '../utils';

import {BlockList} from './block-list';
import {GroupsList} from './groups-list';
import {Search} from './search';

interface Props {
    title: string;
    groups: Group[];
    filter?: string;
}

export const DialogContent = ({title, groups, filter = ''}: Props) => {
    const [activeGroup, setActiveGroup] = useState<Group | null>(null);
    const [value, setValue] = useState(filter);
    const [ref, setRef] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        const card = ref?.closest('[data-ui="Card"]') as HTMLDivElement | null;
        card?.style.setProperty('height', '80%');
    }, [ref]);

    return (
        <div className={cn('flex', 'z-10', 'h-full')} ref={setRef}>
            <div className={cn('p-4')}>
                <Search value={value} onChange={setValue} />
                <GroupsList
                    groups={groups}
                    filter={value}
                    activeGroup={activeGroup}
                    setActiveGroup={setActiveGroup}
                />
            </div>
            <div className={cn('flex-1', 'bg-card-bg')}>
                <div
                    className={cn(
                        'h-full',
                        'w-full',
                        'p-8',
                        'bg-zinc-500/10',
                        'overflow-auto',
                        'relative',
                    )}
                >
                    <div
                        className={cn(
                            'text-lg',
                            'font-bold',
                            'sticky',
                            'z-10',
                            '-top-8',
                            'bg-card-bg',
                            '-m-8',
                        )}
                    >
                        <div className={cn('h-full', 'w-full', 'p-8', 'bg-zinc-500/10')}>
                            {title}
                        </div>
                    </div>
                    <BlockList groups={groups} filter={value} activeGroup={activeGroup} />
                </div>
            </div>
        </div>
    );
};
