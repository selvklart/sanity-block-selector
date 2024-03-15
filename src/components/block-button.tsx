import {useContext, useEffect, useState} from 'react';

import type {Block} from '../types.d';
import {cn} from '../utils';

import {BlockSelectorContext} from './provider';

interface Props {
    block: Block;
}

export const BlockButton = ({block}: Props) => {
    const {title, description, imageURL} = block;
    const [isValid, setIsValid] = useState(false);
    const {onSelectBlock} = useContext(BlockSelectorContext);

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
                'hover:enabled:bg-stone-300/10',
            )}
            onClick={() => onSelectBlock(block)}
        >
            {imageURL && isValid && (
                <div
                    className={cn(
                        'mb-5',
                        'aspect-h-3',
                        'aspect-w-4',
                        'overflow-hidden',
                        'rounded-lg',
                        'bg-stone-300/20',
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
            <h3 className={cn('text-base', 'font-medium', 'text-card-fg', 'text-left')}>{title}</h3>
            {description && (
                <p className={cn('text-sm', 'text-card-muted-fg', 'text-left')}>{description}</p>
            )}
        </button>
    );
};
