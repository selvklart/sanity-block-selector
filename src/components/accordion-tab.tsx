import {Disclosure} from '@headlessui/react';
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/outline';

import type {Group} from '../types.d';
import {cn} from '../utils';

interface Props {
    group: Group;
    defaultOpen?: boolean;
    onClick: () => void;
}

export const AccordionTab = ({group, defaultOpen = false, onClick}: Props) => {
    return (
        <Disclosure as="div" key={group.title} className={cn('pt-6')} defaultOpen={defaultOpen}>
            {({open}) => (
                <>
                    <dt>
                        <Disclosure.Button
                            className={cn(
                                'flex',
                                'w-full',
                                'items-start',
                                'justify-between',
                                'text-left',
                                'text-gray-900',
                            )}
                        >
                            <span className={cn('text-base', 'font-semibold', 'leading-7')}>
                                {group.title}
                            </span>
                            <span className={cn('ml-6', 'flex', 'h-7', 'items-center')}>
                                {open ? (
                                    <ChevronUpIcon className={cn('size-6')} aria-hidden="true" />
                                ) : (
                                    <ChevronDownIcon className={cn('size-6')} aria-hidden="true" />
                                )}
                            </span>
                        </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className={cn('mt-2', 'pr-12')}>
                        {group.blocks.map((block) => (
                            <button key={block.title} onClick={onClick}>
                                <h3>{block.title}</h3>
                                {block.imageURL && <img src={block.imageURL} alt=""></img>}
                            </button>
                        ))}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};
