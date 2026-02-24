import { Link } from '@inertiajs/react';
import { LayoutGrid, ChartBarBig, Trophy, History } from 'lucide-react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    
} from '@/components/ui/sidebar';
import SidebarPollsMenu from '@/components/sidebar-menu';
import { dashboard } from '@/routes';
import polls from '@/routes/polls';
import { type NavItem } from '@/types';


import AppLogo from './app-logo';

/* const mainNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Leaderboard',
        href: '',
        icon: Trophy
    },
    {
        title: 'Riwayat',
        href: '',
        icon: History
    }
]; */
const mainNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Polls',
        icon: ChartBarBig,
        subItems: [
            { title: 'Jelajahi Poll', href: polls.index.url() },
            { title: 'Buat Poll', href: polls.create.url() },
            { title: 'Kelola Poll Saya', href: '#' },
        ],
    },
    {
        title: 'Leaderboard',
        href: '',
        icon: Trophy,
    },
    {
        title: 'Riwayat',
        href: '',
        icon: History,
    },
];

        import { useActiveUrl } from '@/hooks/use-active-url';
const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { urlIsActive } = useActiveUrl();
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Added the missing opening tag here */}
            <SidebarContent>
                <SidebarGroup className="px-2 py-0">
                    <SidebarMenu>
                        {mainNavItems.map((item) => (
                            <SidebarPollsMenu
                                key={item.title}
                                label={item.title}
                                icon={item.icon}
                                href={item.href}
                                subItems={item.subItems}
                            />
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                {/* Note: If NavMain also renders mainNavItems, you might want to remove it 
                    or pass a different set of items to avoid duplication */}
                {/* <NavMain items={otherItems} /> */}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
