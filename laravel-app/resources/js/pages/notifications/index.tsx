import { Head, router } from '@inertiajs/react';
import { Bell, Check, Trash2, ExternalLink, Calendar, Inbox } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Pagination from '@/components/ui/pagination';
import notificationRoutes from '@/routes/notifications';
interface NotificationPageProps {
    notifications: {
        data: any[];
        links: any[];
        meta: any;
    };
}

const breadcrumbs = [
    {
        title: 'Notifikasi',
        href: '/notifications',
    },
];

export default function NotificationIndex({ notifications }: NotificationPageProps) {
    const markAsRead = (id: string) => {
        router.post(notificationRoutes.read.url({ id }), {}, {
            preserveScroll: true,
        });
    };

    const markAllAsRead = () => {
        router.post(notificationRoutes.readAll.url(), {},
            {
                preserveScroll: true,
            });
    };

    const deleteNotification = (id: string) => {
        if (confirm('Hapus notifikasi ini?')) {
            router.delete(notificationRoutes.destroy.url({ id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifikasi" />
            <div className="mx-auto flex h-full max-w-5xl flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
                <PageHeader
                    title="Notifikasi"
                    icon={Bell}
                    description="Kelola semua pemberitahuan sistem dan aktivitas polling Anda."
                    actions={
                        notifications.data.some(n => !n.read_at) && (
                            <Button variant="outline" size="sm" onClick={markAllAsRead} className="font-mono text-[10px] uppercase">
                                <Check className="mr-2 h-3.5 w-3.5" />
                                Tandai Semua Dibaca
                            </Button>
                        )
                    }
                />

                <div className="mt-4 space-y-4">
                    {notifications.data.length > 0 ? (
                        <>
                            <div className="grid gap-3">
                                {notifications.data.map((notification) => (
                                    <Card
                                        key={notification.id}
                                        className={cn(
                                            "relative overflow-hidden transition-all hover:border-zinc-700",
                                            !notification.read_at ? "border-l-2 border-l-rose-500 bg-rose-500/5" : "opacity-80"
                                        )}
                                    >
                                        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                                            <div className="flex flex-1 items-start gap-4">
                                                <div className={cn(
                                                    "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                                                    !notification.read_at ? "bg-rose-500/20 text-rose-500" : "bg-zinc-800 text-zinc-500"
                                                )}>
                                                    <Bell className="h-4 w-4" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className={cn(
                                                            "text-sm font-bold",
                                                            !notification.read_at ? "text-zinc-100" : "text-zinc-400"
                                                        )}>
                                                            {notification.data.message}
                                                        </p>
                                                        {!notification.read_at && (
                                                            <Badge variant="success" className="text-[9px]">Baru</Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-zinc-500">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {new Date(notification.created_at).toLocaleString()}
                                                        </span>
                                                        {notification.data.poll_id && (
                                                            <span className="text-rose-500/70">
                                                                #POLL-{notification.data.poll_id.substring(0, 8)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-2 sm:shrink-0">
                                                {notification.data.action_url && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => router.visit(notification.data.action_url)}
                                                        className="h-8 px-3 text-[10px] font-bold uppercase"
                                                    >
                                                        <ExternalLink className="mr-2 h-3.5 w-3.5" />
                                                        Buka
                                                    </Button>
                                                )}
                                                {!notification.read_at && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="h-8 px-3 text-[10px] font-bold uppercase text-teal-500 hover:text-teal-400"
                                                    >
                                                        <Check className="mr-2 h-3.5 w-3.5" />
                                                        Baca
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="h-8 px-3 text-[10px] font-bold uppercase text-zinc-600 hover:text-rose-500"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                            <div className="mt-6">
                                <Pagination paginated={notifications} />
                            </div>
                        </>
                    ) : (
                        <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/10">
                            <Inbox size={48} className="text-zinc-800" />
                            <div className="text-center">
                                <p className="font-mono text-lg text-zinc-500">
                                    Kotak masuk kosong.
                                </p>
                                <p className="font-mono text-xs text-zinc-600">
                                    Anda akan menerima pemberitahuan di sini.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
