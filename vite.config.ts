import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
    root: 'cosmos',
    plugins: [react()],
    assetsInclude: ['**/static/**'],
});
