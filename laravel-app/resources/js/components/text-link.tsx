import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({
    className = '',
    children,
    ...props
}: LinkProps) {
    return (
        <Link
            className={cn(
                'text-foreground hover:underline decoration-neutral-400 underline-offset-4 transition-all duration-300 ease-out',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
