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
                'justify-center',
                'gap-1',
                'rounded',
                'p-8',
                'hover:bg-stone-50',
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
                        className={cn('object-cover', 'object-center')}
                    />
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

/* className="overflow-hidden transition-all duration-300"
enterFrom="transform scale-95 opacity-0 max-h-0"
enterTo="transform scale-100 opacity-100 max-h-[1000px]"
leaveFrom="transform scale-100 opacity-100 max-h-[1000px]"
leaveTo="transform scale-95 opacity-0 max-h-0" */
