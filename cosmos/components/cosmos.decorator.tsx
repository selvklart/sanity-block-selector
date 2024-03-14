import type {PropsWithChildren} from 'react';

import {cn} from '../../src/utils';

import '../../src/index.css';

const ComponentsDecorator = ({children}: PropsWithChildren) => {
    return <div className={cn('p-8')}>{children}</div>;
};

export default ComponentsDecorator;
