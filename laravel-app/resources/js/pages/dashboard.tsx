import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, CirclePlusIcon, MessageCircleQuestion, } from 'lucide-react';
import AchievementBadge from '@/components/ui/achievement-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import polls, { create as createPoll, index, user as userPollsRoute } from '@/routes/polls';
import { type Poll, type BreadcrumbItem, type SharedData, type UserAchievement, AchievementType, AchievementProgress } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { PollTimer } from '@/components/polls/poll-timer';
import { useDragScroll } from '@/hooks/use-drag-scroll';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface PageProps {
    userPolls: Poll[];
    trendingPoll: Poll | null;
    achievements: {
        types: AchievementType[];
        earned: UserAchievement[];
        progress: AchievementProgress[];
    };
}

export default function Dashboard() {
    const { auth, userPolls, trendingPoll, achievements } = usePage<SharedData & PageProps>().props;

    const { earned, types, progress } = achievements;
    const earnedDrag = useDragScroll<HTMLDivElement>({ fades: true });
    const upcomingDrag = useDragScroll<HTMLDivElement>({ fades: true });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-10 rounded-xl p-4 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="my-0 text-3xl font-bold tracking-tight text-balance md:text-4xl">
                            Halo, {auth.user.username}
                        </h1>
                        <p className="mt-1 text-sm leading-tight text-muted-foreground md:text-base">
                            Apa yang bakal kamu pilih hari ini?
                        </p>
                    </div>
                    <div className="flex w-full items-center gap-2 md:w-auto">
                        <Input
                            aria-label="Cari Poll"
                            className="flex-1 rounded-sm placeholder:text-muted-foreground md:w-64"
                            placeholder="Cari Poll..."
                        />
                    </div>
                </div>
                {userPolls === undefined ? (
                    <Skeleton className="flex h-64 w-full rounded-lg md:h-36" />
                ) : userPolls.length === 0 ? (
                    <div className="flex w-full flex-col gap-6 rounded-xl border border-signal-rose/20 bg-signal-rose/6 p-6 md:flex-row md:items-center md:justify-between md:px-8">
                        <div className="max-w-xl space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Buat polling baru
                            </h2>
                            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                                Buat polling instan dan dapatkan feedback dari
                                komunitas, ikut serta dalam topik hangat atau
                                pecahkan masalah tim bersama
                            </p>
                        </div>
                        <Button asChild variant={'ctasec'} size={'lg'} className="shrink-0">
                            <Link href={createPoll().url}>
                                <CirclePlusIcon />
                                Buat Poll
                            </Link>
                        </Button>
                    </div>
                ) : null}
                <section aria-labelledby="user-polls-heading" className="w-full space-y-5">
                    <div className="flex items-end justify-between gap-4">
                        <h2 id="user-polls-heading" className="flex items-center gap-2.5 text-xl font-bold tracking-tight md:text-2xl">
                            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-linear-to-tr from-ember-deep via-signal-rose to-ember-orange" />
                            Poll terbaru Anda
                        </h2>
                        {userPolls && (
                            <Link href={userPollsRoute(auth.user.id).url} className="group flex shrink-0 items-center gap-0.5 text-sm underline-offset-4 hover:underline focus-visible:underline">
                                Kelola Semua
                                <ArrowRight
                                    strokeWidth={1.5}
                                    size={16}
                                    className="transition-transform ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
                                />
                            </Link>
                        )}
                    </div>
                    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
                        {userPolls === undefined ? (
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
                                <Link key={poll.id} href={polls.show(poll.id)} className="block rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
                                    <Card className="pt-0 gap-1.5">
                                        <CardHeader className="p-0">
                                            {poll.media?.[0]?.original_url ? (
                                                <img
                                                    src={poll.media?.[0]?.original_url}
                                                    alt=""
                                                    className="mb-3 h-42 w-full object-cover rounded-t-md"
                                                />
                                            ) : (
                                                <div aria-hidden className="mb-3 h-42 w-full rounded-t-md bg-muted" />
                                            )}
                                        </CardHeader>
                                        <CardContent className='w-full'>
                                            <div className='flex justify-between align-middle items-center'>
                                                <h3 className="text-lg font-semibold tracking-tight text-foreground truncate max-w-[70%]">
                                                    {poll.title}
                                                </h3>
                                                <div className='text-sm text-muted-foreground flex gap-1 items-center shrink-0'>
                                                    <PollTimer endDate={poll.end_date} variant='card' />
                                                </div>
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
                                <p className="text-lg text-muted-foreground">
                                    Belum ada Poll yang anda buat
                                </p>
                                <Button asChild variant={'ctasec'} className="mt-2">
                                    <Link href={createPoll().url}>Buat baru</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
                <section aria-labelledby="trending-heading" className="w-full space-y-5">
                    <div className="flex items-end justify-between gap-4">
                        <h2 id="trending-heading" className="flex items-center gap-2.5 text-xl font-bold tracking-tight md:text-2xl">
                            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-linear-to-tr from-ember-deep via-signal-rose to-ember-orange" />
                            Poll yang sedang hangat
                        </h2>
                        <Link className="group flex shrink-0 items-center gap-0.5 text-sm underline-offset-4 hover:underline focus-visible:underline" href={index.url()}>
                            Lihat Semua
                            <ArrowRight
                                strokeWidth={1.5}
                                size={16}
                                className="transition-transform ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
                            />
                        </Link>
                    </div>
                    {trendingPoll ? (
                        <Link key={trendingPoll.id} href={polls.show(trendingPoll.id)} className="group block rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
                            <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md motion-reduce:transition-none md:flex">
                                {trendingPoll.media?.[0]?.original_url && (
                                    <div className="md:w-2/5 md:shrink-0">
                                        <img
                                            src={trendingPoll.media[0].original_url}
                                            alt=""
                                            className="h-48 w-full object-cover md:h-full md:min-h-56"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-1 flex-col justify-center gap-3 p-6 md:p-8">
                                    <p className="font-mono text-[11px] font-bold tracking-widest text-rose-700 uppercase dark:text-signal-rose">
                                        Sedang hangat
                                    </p>
                                    <h3 className="text-xl font-bold tracking-tight text-balance md:text-2xl">
                                        {trendingPoll.title}
                                    </h3>
                                    {trendingPoll.description && (
                                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                                            {trendingPoll.description}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                        {trendingPoll.end_date ? <PollTimer endDate={trendingPoll.end_date} variant="card" /> : null}
                                        <span>{trendingPoll.votes?.length ?? 0} suara</span>
                                    </div>
                                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 group-focus-visible:underline dark:text-signal-rose">
                                        Ikuti polling
                                        <ArrowRight size={16} className="transition-transform ease-out group-hover:translate-x-0.5 motion-reduce:transition-none" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-8 text-center">
                            <MessageCircleQuestion
                                size={48}
                                strokeWidth={1.5}
                                className="text-muted-foreground"
                            />
                            <p className="text-lg text-muted-foreground">
                                Maaf, ada kesalahan memuat Polling
                            </p>
                        </div>
                    )}
                </section>

                <section aria-labelledby="achievements-heading" className="w-full space-y-5">
                    <h2 id="achievements-heading" className="text-xl font-bold tracking-tight md:text-2xl">
                        Pencapaian Anda
                    </h2>
                    {earned.length > 0 ? (
                        <div ref={earnedDrag.ref} {...earnedDrag.dragProps} role="region" aria-label="Pencapaian yang diraih" tabIndex={0} className="no-scrollbar cursor-grab snap-x overflow-x-auto pb-2">
                            <ul className="flex gap-5">
                                {types.filter(type => earned.some(e => e.achievement_type_id === type.id)).map((type) => {
                                    const userProgress = earned.find((item) => item.achievement_type_id === type.id);
                                    return (
                                        <li key={type.id} className="flex w-24 shrink-0 snap-start flex-col items-center text-center">
                                            <AchievementBadge
                                                type={type}
                                                userProgress={userProgress}
                                                size="md"
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Belum ada pencapaian yang diraih.</p>
                    )}
                    <h3 className="text-base font-semibold tracking-tight">
                        Pencapaian mendatang
                    </h3>
                    {progress && progress.length > 0 ? (
                        <div ref={upcomingDrag.ref} {...upcomingDrag.dragProps} role="region" aria-label="Pencapaian mendatang" tabIndex={0} className="no-scrollbar cursor-grab snap-x overflow-x-auto pb-2">
                            <ul className="flex gap-5">
                                {progress.map((prog: AchievementProgress) => (
                                    <li key={prog.achievement.id} className="flex w-28 shrink-0 snap-start flex-col items-center text-center">
                                        <AchievementBadge
                                            type={prog.achievement}
                                            size="md"
                                        />
                                        <div className="mt-3 h-2 w-full rounded-full bg-muted">
                                            <div className="h-2 rounded-full bg-signal-rose transition-all duration-500" style={{ width: `${prog.percentage}%` }}></div>
                                        </div>
                                        <span className="mt-1 font-mono text-[10px] text-muted-foreground">{prog.current} / {prog.required} {prog.achievement.requirement_type.replace('_', ' ')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        progress?.length === 0 && types.length > 0 && <p className="text-sm text-muted-foreground">Semua pencapaian telah diraih!</p>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}
