import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function safeParse(value: string, min: number, max: number): number {
    // 1. Handle the "Backspace/Empty" case
    if (value.trim() === '') {
        return min;
    }

    const parsed = parseInt(value, 10);

    // 2. Validate the number
    // Note: Use >= and <= so users can actually hit the limits
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
        return parsed;
    }
    if (parsed > max) return max;
    if (parsed < min) return min;

    return min;
}