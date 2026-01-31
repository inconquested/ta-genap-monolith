import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Bell, CirclePlusIcon, MessageCircleQuestion, } from 'lucide-react';

import AchievementBadge from '@/components/ui/achievement-badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type Poll, type BreadcrumbItem, type SharedData, type UserAchievement, AchievementType} from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface PageProps {
    userPolls: Poll[];
    trendingPoll: Poll;
    achievements: {
        types: AchievementType[];
        earned: UserAchievement[];
    };
}

export default function Dashboard() {
    const { auth, userPolls, trendingPoll, achievements } = usePage<SharedData & PageProps>().props;
    const { earned, types } = achievements
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="my-0 font-mono text-4xl font-bold tracking-wide">
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
                <div className="flex h-64 w-full flex-col justify-between gap-6 rounded-lg bg-linear-[120deg] from-orange-400/12 via-neutral-50 via-25% px-8 antialiased bg-blend-color md:h-36 md:flex-row dark:bg-linear-[120deg] dark:via-neutral-800/50 dark:to-neutral-900/50">
                    <div className="pt-4">
                        <h1 className="font-mono font-bold md:text-3xl">
                            Buat Polling Baru!
                        </h1>
                        <p className="md:text-md mt-1 max-w-xl shrink font-mono leading-4 font-normal tracking-wider opacity-75 dark:text-muted-foreground">
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
                        <p className="flex items-center gap-2 font-mono text-xl font-bold md:text-2xl">
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
                            <div className="col-span-3 flex h-full flex-col items-center justify-center gap-2 rounded-lg">
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
                        <p className="flex items-center gap-2 font-mono text-xl font-bold md:text-2xl">
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
                    <div className="grid h-auto min-h-64 w-full grid-cols-1 gap-4 md:grid-cols-3">
                        <div
                            className={`row-span-2 md:col-span-2 md:row-span-1 ${trendingPoll ? '' : 'flex flex-col items-center justify-center'}`}
                        >
                            {trendingPoll ? (
                                <Card className="h-full w-full">
                                    {' '}
                                    {/* Ensure card fills the span */}
                                    {/* Content */}
                                </Card>
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8">
                                    <MessageCircleQuestion
                                        size={48}
                                        strokeWidth={1.5}
                                        className="text-muted-foreground"
                                    />
                                    <p className="text-center font-mono text-lg text-muted-foreground">
                                        Maaf, ada kesalahan memuat Polling
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="h-full rounded-lg p-4">
                            Pencapaian Anda
                            <div>
                                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
                                    {types.map((type) => {
                                        // Find if the user has this achievement in their "earned" list
                                        const userProgress = earned.find(
                                            (item) =>
                                                item.achievement_type_id ===
                                                type.id,
                                        );

                                        return (
                                            <AchievementBadge
                                                key={type.id}
                                                type={type}
                                                userProgress={userProgress}
                                                size="md"
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
