import type {Block} from '../types.d';
import {cn} from '../utils';

import {BlockButton} from './block-button';

interface Props {
    blocks?: Block[];
}

export const BlockGroup = ({blocks}: Props) => {
    if (!blocks || blocks.length === 0) {
        return null;
    }

    return (
        <div className={cn('grid', 'grid-cols-2', 'gap-4')}>
            {blocks.map((block) => (
                <BlockButton key={block.title} block={block} />
            ))}
        </div>
    );
};
