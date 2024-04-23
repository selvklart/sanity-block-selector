import {type Dispatch, type SetStateAction, useContext} from 'react';
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid';

import {cn} from '../utils';

import {BlockSelectorContext} from './provider';

interface Props {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
}

export const Search = ({value, onChange}: Props) => {
    const {textOptions} = useContext(BlockSelectorContext);
    return (
        <div className={cn('relative', 'mt-2', 'rounded-md', 'shadow-sm')}>
            <div
                className={cn(
                    'pointer-events-none',
                    'absolute',
                    'inset-y-0',
                    'left-0',
                    'flex',
                    'items-center',
                    'pl-3',
                )}
            >
                <MagnifyingGlassIcon
                    className={cn('h-5', 'w-5', 'text-gray-400')}
                    aria-hidden="true"
                />
            </div>
            <input
                type="text"
                name="search"
                className={cn(
                    '!block',
                    '!w-full',
                    '!rounded-md',
                    '!border-0',
                    '!py-2.5',
                    '!pl-10',
                    '!color-inherit',
                    '!ring-1',
                    '!ring-inset',
                    '!ring-card-border',
                    '!placeholder:text-gray-400',
                    '!focus:ring-2',
                    '!focus:ring-inset',
                    '!focus:ring-indigo-600',
                    '!text-sm',
                    '!leading-6',
                    '!bg-inherit',
                )}
                placeholder={textOptions?.searchPlaceholder ?? 'Search'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};
