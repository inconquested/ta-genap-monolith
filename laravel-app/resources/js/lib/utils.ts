import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { parseISO, isValid as isValidDate, getYear, getMonth, getDate, getHours, getMinutes, getSeconds } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export const slugify = (s: string) =>
    s
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // spaces to dashes
        .replace(/[^a-z0-9\-]/g, '');

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

// Utility: debounce a function call. Useful for rate-limiting handlers.
export function debounce<T extends (...args: any[]) => void>(fn: T, wait = 200) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...args), wait);
    };
}

// Parse a time value safely and return all components as numbers (never undefined).
// Accepts ISO strings, Date objects, timestamps, or null/undefined.
export function parseTimeSafe(input?: string | number | Date | null) {
    let d: Date

    if (input instanceof Date) {
        d = input
    } else if (typeof input === 'number') {
        d = new Date(input)
    } else if (typeof input === 'string') {
        // Try ISO first, fall back to Date constructor
        const parsed = parseISO(input)
        d = isValidDate(parsed) ? parsed : new Date(input)
    } else {
        d = new Date()
    }

    if (!isValidDate(d)) {
        d = new Date()
    }

    const year = getYear(d)
    const month = getMonth(d) + 1 // date-fns months are 0-indexed
    const day = getDate(d)
    const hours = getHours(d)
    const minutes = getMinutes(d)
    const seconds = getSeconds(d)

    return {
        date: d,
        iso: d.toISOString(),
        year,
        month,
        day,
        hours,
        minutes,
        seconds,
        isValid: true,
    }
}

/**
 * Generate standard breadcrumbs for poll-related pages.
 */
export function makeBreadCrumbs(title: string, indexUrl: string): { title: string; href: string }[] {
    return [
        {
            title: 'Polls',
            href: indexUrl,
        },
        {
            title: title,
            href: '',
        },
    ];
}