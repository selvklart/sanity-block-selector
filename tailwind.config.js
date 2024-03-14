/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './cosmos/**/*.{js,ts,jsx,tsx}'],
    theme: {},
    plugins: [require('@tailwindcss/forms')],
};
