import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PollFeedCard } from '@/components/polls/poll-feed-card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedPolls, Poll, PollCategory, User } from '@/types';
import pollsRoutes from '@/routes/polls';
import { Link, router, usePage } from '@inertiajs/react';
import Pagination from '@/components/ui/pagination';
import { slugify } from '@/lib/utils';
import { PageHeader } from '@/components/shared/page-header';
import { useDragScroll } from '@/hooks/use-drag-scroll';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Polls',
        href: pollsRoutes.index.url(),
    },
    {
        'title': 'Temukan',
        href: pollsRoutes.index.url()
    }
];

const redirectToPoll = (id: string) => {
    router.visit(pollsRoutes.show.url(id));
}

export default function Index({ polls, categories, topCreators, recommendedPolls }: {
    polls: PaginatedPolls,
    categories: PollCategory[],
    topCreators: any[],
    recommendedPolls: Poll[]
}) {
    const page = usePage();
    const { user } = (page.props as any).auth as { user: User };
    const searchParams = new URL(page.url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost').searchParams;
    const activeCategory = searchParams.get('category');
    const categoriesDrag = useDragScroll<HTMLDivElement>({ fades: true });

    const selectCategory = (catSlug?: string) => {
        const base = pollsRoutes.index.url();
        const url = catSlug ? `${base}?category=${encodeURIComponent(catSlug)}` : base;
        router.visit(url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen font-sans text-muted-foreground selection:bg-signal-rose/30">
                <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-6 lg:grid-cols-12">
                    {/* Left Feed Content */}
                    <div className="space-y-6 lg:col-span-8">
                        {/* Search & Categories */}
                        <PageHeader title="Temukan poll untuk diikuti" />
                        <div ref={categoriesDrag.ref} {...categoriesDrag.dragProps} role="group" aria-label="Kategori polling" className="no-scrollbar -mx-1 flex cursor-grab snap-x items-center gap-2 overflow-x-auto px-1 pb-1">
                            <Button
                                size="sm"
                                variant={activeCategory ? 'outline' : 'ctasec'}
                                aria-pressed={!activeCategory}
                                onClick={() => selectCategory(undefined)}
                                className="shrink-0 snap-start rounded-full"
                            >
                                Semua
                            </Button>
                            {categories.map((cat) => {
                                const catSlug = slugify(cat.label);
                                return (
                                    <Button
                                        size="sm"
                                        variant={activeCategory === catSlug ? 'ctasec' : 'outline'}
                                        aria-pressed={activeCategory === catSlug}
                                        key={cat.id}
                                        onClick={() => selectCategory(catSlug)}
                                        className="shrink-0 snap-start rounded-full"
                                    >
                                        {cat.label}
                                    </Button>
                                );
                            })}
                        </div>

                        {/* Feed */}
                        <div className="w-full space-y-5">
                            {polls.data.map((poll, i) => {
                                const currentUserVote = poll.votes?.find((v) => v.user_id === user?.id);
                                const userVoteId = currentUserVote?.option_id ?? null;
                                return (
                                    <PollFeedCard
                                        voteCallback={() => { redirectToPoll(poll.id) }}
                                        key={poll.id}
                                        poll={poll}
                                        userVoteId={userVoteId}
                                        index={i}
                                        featured={i === 0}
                                    />
                                );
                            })}
                        </div>
                        {!!polls &&
                            <Pagination paginated={polls} />
                        }
                    </div>

                    {/* Right Sidebar Widgets */}
                    <div className="space-y-6 lg:col-span-4">
                        {/* Top Creators */}
                        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-sm font-bold tracking-tight text-foreground">
                                    Kreator Teratas
                                </h3>
                                <Link href="/leaderboard" className="font-mono text-[10px] font-bold text-rose-700 dark:text-signal-rose uppercase hover:underline">
                                    Lihat Semua
                                </Link>
                            </div>
                            <div className="space-y-5">
                                {topCreators.map((creator) => (
                                    <div
                                        key={creator.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-border">
                                                <AvatarImage src={creator.avatar} />
                                                <AvatarFallback className="bg-muted text-[10px] text-foreground/70">
                                                    {(creator.username || 'U').substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-xs font-bold text-foreground">
                                                    {creator.username}
                                                </p>
                                                <p className="font-mono text-[10px] text-muted-foreground">
                                                    {creator.polls_count} Poll Dibuat
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 border-border text-[10px] font-bold hover:bg-accent"
                                        >
                                            Ikuti
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* For You Widget */}
                        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                            <h3 className="mb-4 text-sm font-bold tracking-tight text-foreground">
                                Rekomendasi Untuk Anda
                            </h3>
                            <div className="space-y-2">
                                {recommendedPolls.map((poll) => (
                                    <Link
                                        key={poll.id}
                                        href={pollsRoutes.show.url(poll.id)}
                                        className="group block cursor-pointer rounded-xl border border-border bg-muted/40 p-3 transition-all hover:border-muted-foreground/30"
                                    >
                                        <p className="mb-1 font-mono text-[9px] tracking-widest text-rose-700 dark:text-signal-rose uppercase">
                                            {poll.poll_category?.label || 'General'} • Rekomendasi
                                        </p>
                                        <p className="text-xs font-medium text-foreground/80 transition-colors group-hover:text-foreground line-clamp-2">
                                            {poll.title}
                                        </p>
                                    </Link>
                                ))}
                                {recommendedPolls.length === 0 && (
                                    <p className="text-center py-4 text-xs text-muted-foreground italic">
                                        Belum ada rekomendasi.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
