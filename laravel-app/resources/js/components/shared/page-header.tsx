import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    icon?: LucideIcon;
    iconColor?: string;
    description?: string;
    actions?: ReactNode;
}

export function PageHeader({ title, icon: Icon, iconColor = "text-rose-500", description, actions }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    {Icon && <Icon className={`h-6 w-6 ${iconColor} md:h-8 md:w-8`} />}
                    <h1 className="font-mono text-2xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-neutral-50">
                        {title}
                    </h1>
                </div>
                {actions && <div className="flex items-center gap-2 w-full sm:w-auto">{actions}</div>}
            </div>
            {description && (
                <p className="font-mono text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}
