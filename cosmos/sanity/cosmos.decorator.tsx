import type {PropsWithChildren} from 'react';
import {ThemeProvider} from '@sanity/ui';
import {buildTheme} from '@sanity/ui/theme';

import {cn} from '../../src/utils';

import '../../src/index.css';

const ComponentsDecorator = ({children}: PropsWithChildren) => {
    const theme = buildTheme();
    return (
        <ThemeProvider scheme={'light'} theme={theme}>
            <div className={cn('p-24')}>{children}</div>
        </ThemeProvider>
    );
};

export default ComponentsDecorator;
