import {useEffect, useState} from 'react';

import type {Block} from '../types.d';
import {cn} from '../utils';

interface Props {
    block: Block;
    onClick: () => void;
}

export const BlockButton = ({block: {title, description, imageURL}, onClick}: Props) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (imageURL) {
            const img = new Image();
            img.src = imageURL.href;
            img.onload = () => setIsValid(true);
            img.onerror = () => setIsValid(false);
        }
    }, [imageURL]);

    return (
        <button
            key={title}
            className={cn(
                'group',
                'relative',
                'flex',
                'flex-col',
                'gap-1',
                'rounded',
                'bg-stone-50/30',
                'p-8',
                'shadow-sm',
                'hover:bg-stone-100/70',
            )}
            onClick={onClick}
        >
            {imageURL && isValid && (
                <div
                    className={cn(
                        'mb-5',
                        'aspect-h-3',
                        'aspect-w-4',
                        'overflow-hidden',
                        'rounded-lg',
                        'bg-stone-200',
                        'relative',
                    )}
                >
                    <img
                        src={imageURL?.href}
                        alt={title}
                        className={cn('object-cover', 'object-center', 'group-hover:blur-xs')}
                    />
                    <div
                        className={cn(
                            'w-full',
                            'h-full',
                            'flex',
                            'items-center',
                            'justify-center',
                            'p-4',
                            'opacity-0',
                            'group-hover:opacity-100',
                            'absolute',
                            'z-10',
                            'top-0',
                        )}
                        aria-hidden="true"
                    >
                        <div
                            className={cn(
                                'rounded-md',
                                'bg-white',
                                'px-3.5',
                                'py-2.5',
                                'text-sm',
                                'font-semibold',
                                'text-gray-900',
                                'shadow-sm',
                                'ring-1',
                                'ring-inset',
                                'ring-gray-300',
                                'hover:bg-gray-50',
                            )}
                        >
                            Select
                        </div>
                    </div>
                </div>
            )}
            <h3 className={cn('text-base', 'font-medium', 'text-gray-900', 'text-left')}>
                {title}
            </h3>
            {description && (
                <p className={cn('text-sm', 'text-gray-500', 'text-left')}>{description}</p>
            )}
        </button>
    );
};
