import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Bell, CirclePlusIcon, MessageCircleQuestion, } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Poll, type BreadcrumbItem, type SharedData } from '@/types';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface PageProps {
    userPolls: Poll[];
    trendingPolls: Poll[];
}

export default function Dashboard() {
    const { auth, userPolls, trendingPolls } = usePage<SharedData & PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="my-0 font-mono text-5xl font-bold tracking-wide">
                            Halo, {auth.user.username}
                        </h1>
                        <p className="my-0 font-mono leading-tight text-muted-foreground">
                            Apa yang bakal kamu pilih hari ini?
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            className="rounded-sm font-mono placeholder-neutral-50/10"
                            placeholder="Cari Poll..."
                        />
                        <Button variant={'outline'} className="rounded-sm">
                            <Bell />
                        </Button>
                    </div>
                </div>
                <div className="flex h-64 w-full flex-col justify-between gap-6 rounded-lg border border-neutral-500 bg-linear-[120deg] from-orange-400/12 via-neutral-50 via-25% px-8 antialiased bg-blend-color md:h-36 md:flex-row dark:border-neutral-500/25 dark:bg-linear-[120deg] dark:via-neutral-800/50 dark:to-neutral-900/50">
                    <div className="pt-4">
                        <h1 className="font-mono font-bold md:text-4xl">
                            Buat Polling Baru!
                        </h1>
                        <p className="md:text-md mt-1 max-w-xl shrink font-mono leading-4 font-normal tracking-wider dark:text-muted-foreground opacity-75">
                            Buat polling instan dan dapatkan feedback dari
                            komunitas, ikut serta dalam topik hangat atau
                            pecahkan masalah tim bersama
                        </p>
                    </div>
                    <div className="mb-4 flex h-full items-center md:mb-0">
                        <Button variant={'ctasec'} size={'lg'}>
                            <CirclePlusIcon />
                            Buat Poll
                        </Button>
                    </div>
                </div>
                <div className="mt-12 w-full md:mt-6">
                    <div className="flex justify-between">
                        <p className="font-mono text-xl font-bold md:text-2xl flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full bg-linear-to-tr from-gray-800 via-rose-500 via-20% via-50% to-orange-400" />
                            Poll Terbaru Anda
                        </p>
                        {userPolls && (
                            <Link className="group flex items-center gap-0.5 font-mono text-sm underline-offset-3 hover:underline">
                                Kelola Semua
                                <ArrowRight
                                    strokeWidth={1.5}
                                    size={16}
                                    className="transition-all ease-in group-hover:translate-x-0.5"
                                />
                            </Link>
                        )}
                    </div>
                    <div className="mt-2 grid min-h-64 w-full grid-cols-3">
                        {userPolls ? (
                            userPolls.map((poll) => <Card key={poll.id}></Card>)
                        ) : (
                            <div className="col-span-3 flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-neutral-500 dark:border-neutral-500/25 dark:bg-neutral-900/50">
                                <MessageCircleQuestion
                                    size={48}
                                    strokeWidth={1.5}
                                    className="text-muted-foreground"
                                />
                                <p className="font-mono text-lg text-muted-foreground">
                                    Belum ada Poll yang anda buat
                                </p>
                                <Button variant={'ctasec'}>Buat baru</Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-12 w-full md:mt-6">
                    <div className="flex justify-between">
                        <p className="font-mono text-xl font-bold md:text-2xl flex items-center gap-1">
                            <div className="h-3 w-3 rounded-full bg-linear-to-tr from-gray-800 via-rose-500 via-20% via-50% to-orange-400" />
                            Poll Yang Sedang Hangat
                        </p>
                            <Link className="group flex items-center gap-0.5 font-mono text-sm underline-offset-3 hover:underline">
                                Lihat Semua
                                <ArrowRight
                                    strokeWidth={1.5}
                                    size={16}
                                    className="transition-all ease-in group-hover:translate-x-0.5"
                                />
                            </Link>
                    </div>
                    <div className="mt-2 grid min-h-64 w-full grid-cols-3">
                        {trendingPolls ? (
                            trendingPolls.map((poll) => <Card key={poll.id}></Card>)
                        ) : (
                            <div className="col-span-3 flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-neutral-500 dark:border-neutral-500/25 dark:bg-neutral-900/50">
                                <MessageCircleQuestion
                                    size={48}
                                    strokeWidth={1.5}
                                    className="text-muted-foreground"
                                />
                                <p className="font-mono text-lg text-muted-foreground">
                                    Belum ada Poll yang anda buat
                                </p>
                                <Button variant={'ctasec'}>Buat baru</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
