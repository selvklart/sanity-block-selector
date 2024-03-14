import type {ClassValue} from 'clsx';
import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const isImageValid = async (url: URL) => {
    return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.src = url.href;
        img.onload = () => resolve(true);
        img.onerror = () => {
            console.warn(`Image at ${url.href} failed to load`);
            resolve(false);
        };
    });
};
