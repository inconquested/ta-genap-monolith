import { Bell, Check, Trash2, ExternalLink } from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import notifications from '@/routes/notifications';
import { UUID } from '@/types';

export function NotificationBell() {
    const { auth } = usePage().props as any;
    const user = auth.user;
    const notificationsCount = user?.notifications_count ?? 0;
    const recentNotifications = user?.recent_notifications ?? [];

    const markAsRead = (id: UUID) => {
        router.post(notifications.read.url({ id }), {}, {
            preserveScroll: true,
        });
    };

    const markAllAsRead = () => {
        router.post(notifications.readAll.url(), {}, {
            preserveScroll: true,
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                    <Bell className="h-5 w-5" />
                    {notificationsCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                            {notificationsCount > 9 ? '9+' : notificationsCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between border-b border-zinc-800 p-4">
                    <h4 className="font-mono text-xs font-bold tracking-widest uppercase">
                        Notifikasi
                    </h4>
                    {notificationsCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="font-mono text-[10px] text-zinc-500 hover:text-rose-500 transition-colors"
                        >
                            Tandai semua dibaca
                        </button>
                    )}
                </div>
                <ScrollArea className="h-80">
                    {recentNotifications.length > 0 ? (
                        <div className="divide-y divide-zinc-900">
                            {recentNotifications.map((notification: any) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "group relative p-4 transition-colors hover:bg-zinc-900/50",
                                        !notification.read_at && "bg-rose-500/5"
                                    )}
                                >
                                    <div className="flex gap-3">
                                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex-1 space-y-1">
                                            <p className="text-xs font-medium text-zinc-200">
                                                {notification.data.message}
                                            </p>
                                            <p className="font-mono text-[9px] text-zinc-600">
                                                {new Date(notification.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!notification.read_at && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 px-2 text-[10px]"
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <Check className="mr-1 h-3 w-3" />
                                                Baca
                                            </Button>
                                        )}
                                        {notification.data.action_url && (
                                            <Link
                                                href={notification.data.action_url}
                                                className="inline-flex h-7 items-center rounded-md border border-zinc-800 bg-transparent px-2 text-[10px] text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                                            >
                                                <ExternalLink className="mr-1 h-3 w-3" />
                                                Lihat
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <Bell className="mb-2 h-8 w-8 text-zinc-800" />
                            <p className="font-mono text-xs text-zinc-600 italic">
                                Belum ada notifikasi baru.
                            </p>
                        </div>
                    )}
                </ScrollArea>
                <div className="border-t border-zinc-800 p-2">
                    <Link
                        href={notifications.index.url()}
                        className="flex w-full items-center justify-center py-2 font-mono text-[10px] font-bold text-zinc-500 uppercase hover:text-rose-500 transition-colors"
                    >
                        Lihat Semua Notifikasi
                    </Link>
                </div>
            </PopoverContent>
        </Popover >
    );
}
