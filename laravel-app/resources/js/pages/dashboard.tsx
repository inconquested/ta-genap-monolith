import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Bell, CirclePlusIcon, Clock, MessageCircleQuestion, } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import AchievementBadge from '@/components/ui/achievement-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import polls, { create as createPoll } from '@/routes/polls';
import { type Poll, type BreadcrumbItem, type SharedData, type UserAchievement, AchievementType, AchievementProgress } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

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
        progress: AchievementProgress[];
    };
}

export default function Dashboard() {
    const { auth, userPolls, trendingPoll, achievements } = usePage<SharedData & PageProps>().props;

    // Remove explicit useState because state is synced directly from Inertia props on load
    const [achievementsData, setAchievementsData] = useState<{ types: AchievementType[], earned: UserAchievement[], progress: AchievementProgress[] }>({
        ...achievements
    });

    // Inertia returns data on render so loading is implicitly false for page-data.
    // Kept the boolean state in case deferred props are implemented later.
    const [loading, setLoading] = useState(false);

    const { earned, types, progress } = achievementsData;
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
                {userPolls === undefined ? (
                    <Skeleton className="flex h-64 w-full rounded-lg md:h-36" />
                ) : userPolls.length === 0 ? (
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
                            <Link href={createPoll().url}>
                                <Button variant={'ctasec'} size={'lg'}>
                                    <CirclePlusIcon />
                                    Buat Poll
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : null}
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
                    <div className="mt-2 grid min-h-64 w-full grid-cols-1 md:grid-cols-3 gap-6">
                        {userPolls === undefined || loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <Card key={i} className="pt-0 gap-1.5 h-64 overflow-hidden border">
                                    <Skeleton className="h-42 w-full rounded-t-md rounded-b-none" />
                                    <CardContent className="w-full flex-1 pt-4">
                                        <div className="flex justify-between items-center">
                                            <Skeleton className="h-6 w-3/4" />
                                            <Skeleton className="h-4 w-16" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : userPolls.length > 0 ? (
                            userPolls.map((poll) => (
                                <Link href={polls.show(poll.id)}>
                                    <Card key={poll.id} className="pt-0 gap-1.5">
                                        <CardHeader className="p-0">
                                            <img
                                                src={poll.media?.[0].original_url}
                                                className="mb-3 h-42 w-full object-cover rounded-t-md"
                                            />
                                        </CardHeader>
                                        <CardContent className='w-full'>
                                            <div className='flex justify-between align-middle items-center'>
                                                <h3 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-neutral-50 truncate max-w-[70%]">
                                                    {poll.title}
                                                </h3>
                                                <p className='text-sm text-muted-foreground flex gap-1 items-center shrink-0'>
                                                    <Clock size={16} />
                                                    Tersisa
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-3 flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12">
                                <MessageCircleQuestion
                                    size={48}
                                    strokeWidth={1.5}
                                    className="text-muted-foreground"
                                />
                                <p className="font-mono text-lg text-muted-foreground">
                                    Belum ada Poll yang anda buat
                                </p>
                                <Button variant={'ctasec'} className="mt-2">Buat baru</Button>
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
                            <p className="text-lg font-bold mb-4">Pencapaian Anda</p>
                            {loading ? (
                                <>
                                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6 mb-8">
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2">
                                                <Skeleton className="h-20 w-20 rounded-full" />
                                                <Skeleton className="h-4 w-16 mt-2" />
                                                <Skeleton className="h-3 w-12" />
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-lg font-bold mt-8 mb-4">Pencapaian Mendatang</p>
                                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6 mb-4">
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2">
                                                <Skeleton className="h-20 w-20 rounded-full" />
                                                <Skeleton className="h-2 w-full mt-3 rounded-full" />
                                                <Skeleton className="h-3 w-16" />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6 mb-8">
                                        {types.filter(type => earned.some(e => e.achievement_type_id === type.id)).map((type) => {
                                            const userProgress = earned.find((item) => item.achievement_type_id === type.id);
                                            return (
                                                <AchievementBadge
                                                    key={type.id}
                                                    type={type}
                                                    userProgress={userProgress}
                                                    size="md"
                                                />
                                            );
                                        })}
                                        {earned.length === 0 && <p className="text-sm text-gray-500 col-span-full">Belum ada pencapaian yang diraih.</p>}
                                    </div>

                                    <p className="text-lg font-bold mt-8 mb-4">Pencapaian Mendatang</p>
                                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6 mb-4">
                                        {progress?.map((prog: AchievementProgress) => (
                                            <div key={prog.achievement.id} className="flex flex-col items-center">
                                                <AchievementBadge
                                                    type={prog.achievement}
                                                    size="md"
                                                />
                                                <div className="w-full bg-gray-200 rounded-full h-2 mt-3 dark:bg-gray-700">
                                                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${prog.percentage}%` }}></div>
                                                </div>
                                                <span className="text-[10px] text-gray-500 mt-1 font-mono">{prog.current} / {prog.required} {prog.achievement.requirement_type.replace('_', ' ')}</span>
                                            </div>
                                        ))}
                                        {progress?.length === 0 && types.length > 0 && <p className="text-sm text-gray-500 col-span-full">Semua pencapaian telah diraih!</p>}
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
