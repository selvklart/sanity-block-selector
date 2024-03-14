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

// Used to find the most similar search result
export const levenshteinDistance = (a: string, b: string) => {
    const distanceMatrix: number[][] = Array(b.length + 1)
        .fill(null)
        .map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i += 1) {
        distanceMatrix[0][i] = i;
    }

    for (let j = 0; j <= b.length; j += 1) {
        distanceMatrix[j][0] = j;
    }

    for (let j = 1; j <= b.length; j += 1) {
        for (let i = 1; i <= a.length; i += 1) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            distanceMatrix[j][i] = Math.min(
                distanceMatrix[j][i - 1] + 1,
                distanceMatrix[j - 1][i] + 1,
                distanceMatrix[j - 1][i - 1] + indicator,
            );
        }
    }

    return distanceMatrix[b.length][a.length];
};
