import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChartBarBig, ChevronRight, LucideIcon } from 'lucide-react';
import React from 'react';

import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { useActiveUrl } from '@/hooks/use-active-url';
import { NavItem } from '@/types';


interface SidebarMenuProps {
    label: string;
    icon?: LucideIcon | null;
    href?: string;
    subItems?: NavItem[];
}

export function SidebarMenu({
    label,
    icon: Icon = ChartBarBig,
    href = '#',
    subItems = [],
}: SidebarMenuProps) {
    const { urlIsActive } = useActiveUrl();

    // Check if any sub-item is active to auto-expand
    const isAnySubActive = subItems.some((item) => urlIsActive(href));
    const isSingleActive = !subItems.length && urlIsActive(href);
    const isCurrentlyActive = isAnySubActive || isSingleActive;

    //Set Cookie
    const COOKIE_NAME = `sidebar_menu:${label}`;
    const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

    const [open, setOpen] = React.useState<boolean>(()=>{
        if (isAnySubActive) return true;

        // Check for shadcn-style cookie persistence
        if (typeof document !== 'undefined') {
            const match = document.cookie.match(
                new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'),
            );
            return match ? match[2] === 'true' : false;
        }
        return false;
    });

    const toggleMenu = React.useCallback(() => {
        setOpen((prev) => {
            const newState = !prev;
            // Native shadcn cookie implementation
            document.cookie = `${COOKIE_NAME}=${newState}; path=/; max-age=${COOKIE_MAX_AGE}`;
            return newState;
        });
    }, [COOKIE_NAME]);

    const hasSubItems = subItems.length > 0;

    // Sync open state if a sub-route is hit externally
    React.useEffect(() => {
        if (isAnySubActive) setOpen(true);
    }, [isAnySubActive]);

    const Content = (
        <>
            {Icon && <Icon />}
            <span>{label}</span>
            {hasSubItems && (
                <motion.div
                    className="ml-auto"
                    animate={{ rotate: open ? 90 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                    <ChevronRight className="h-4 w-4" />
                </motion.div>
            )}
        </>
    );

    return (
        <SidebarMenuItem>
            {hasSubItems ? (
                /* DROPDOWN VERSION */
                <>
                    <SidebarMenuButton
                        onClick={toggleMenu}
                        aria-expanded={open}
                        isActive={isCurrentlyActive}
                    >
                        {Content}
                    </SidebarMenuButton>

                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.div
                                initial={{ height: 0, opacity: 1 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0, 0, 0.2, 1],
                                }}
                                style={{ overflow: 'hidden' }}
                            >
                                <SidebarMenuSub className="pb-2">
                                    {subItems.map((item, idx) => (
                                        <li key={idx}>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={urlIsActive(
                                                    href
                                                )}
                                            >
                                                <Link href={item.href}>
                                                    {item.title}
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </li>
                                    ))}
                                </SidebarMenuSub>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                /* SINGLE LINK VERSION */
                <SidebarMenuButton asChild isActive={isCurrentlyActive}>
                    <Link href={href}>{Content}</Link>
                </SidebarMenuButton>
            )}
        </SidebarMenuItem>
    );
}

export default SidebarMenu;
