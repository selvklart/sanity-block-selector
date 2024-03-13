import type {PropsWithChildren} from 'react';

import {cn} from '../../src/utils';

const ComponentsDecorator = ({children}: PropsWithChildren) => {
    return <div className={cn('p-8')}>{children}</div>;
};

export default ComponentsDecorator;
