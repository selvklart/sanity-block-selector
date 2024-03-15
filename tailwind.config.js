/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './cosmos/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'card-border': `var(--card-border-color, ${colors.gray[300]})`,
                'card-fg': `var(--card-fg-color, ${colors.gray[900]})`,
                'card-muted-fg': `var(--card-muted-fg-color, ${colors.gray[500]})`,
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
