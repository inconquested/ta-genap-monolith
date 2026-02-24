import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Bell,
    Briefcase,
    Coffee,
    Cpu,
    Gamepad2,
    Globe,
    LayoutGrid,
    Search,
} from 'lucide-react';
import { PollFeedCard } from '@/components/poll-feed-card'; // We'll build this below
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedPolls, Poll, PollCategory } from '@/types';
import pollsRoutes from '@/routes/polls';
import {motion} from 'framer-motion';
import { router, usePage } from '@inertiajs/react';
import Pagination from '@/components/ui/pagination';
import { slugify } from '@/lib/utils';

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


const redirectToPoll=(id : string)=>{
    router.visit(pollsRoutes.show.url(id));
}

export default function Index({polls, categories}: {
    polls : PaginatedPolls,
    categories: PollCategory[] 
}) {
    const page = usePage();
    const searchParams = new URL(page.url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost').searchParams;
    const activeCategory = searchParams.get('category');

    const selectCategory = (catSlug?: string) => {
        const base = pollsRoutes.index.url();
        const url = catSlug ? `${base}?category=${encodeURIComponent(catSlug)}` : base;
        router.visit(url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen font-sans text-zinc-400 selection:bg-rose-500/30">
                <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-6 lg:grid-cols-12">
                    {/* Left Feed Content */}
                    <div className="space-y-6 lg:col-span-8">
                        {/* Search & Categories */}
                        <h1 className="font-mono text-4xl font-bold text-gray-900 dark:text-neutral-50">
                            Temukan Poll Untuk Diikuti
                        </h1>
                        <div className="space-y-6 overflow-x-hidden px-3">
                            <motion.div
                                drag="x"
                                dragConstraints={{ left: -244, right: 0 }} //Manual width calculation
                                className="no-scrollbar -z-10 flex cursor-grab items-center gap-2 overflow-x-visible active:cursor-grabbing"
                            >
                                <Button
                                    key="all"
                                    variant={activeCategory ? 'outline' : 'ctasec'}
                                    onClick={() => selectCategory(undefined)}
                                >
                                    All
                                </Button>
                                {categories.map((cat) => {
                                    const catSlug = slugify(cat.label);
                                    return (
                                        <Button
                                            variant={activeCategory === catSlug ? 'ctasec' : 'outline'}
                                            key={cat.id}
                                            onClick={() => selectCategory(catSlug)}
                                        >
                                            {cat.label}
                                        </Button>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                            <div className="flex gap-6 font-mono text-[11px] font-bold tracking-widest uppercase">
                                <button className="-mb-[17px] border-b border-rose-500 pb-4 text-rose-500">
                                    Trending
                                </button>
                                <button className="text-zinc-600 hover:text-zinc-400">
                                    Ending Soon
                                </button>
                                <button className="text-zinc-600 hover:text-zinc-400">
                                    Newest
                                </button>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="font-mono text-xs text-zinc-500"
                            >
                                <LayoutGrid size={14} className="mr-2" />{' '}
                                Filters
                            </Button>
                        </div>

                        {/* Feed */}
                        <div className="space-y-3 w-full">
                            {polls.data.map((poll) => (
                                <PollFeedCard
                                    voteCallback={()=>{redirectToPoll(poll.id)}}
                                    key={poll.id}
                                    poll={poll}
                                    userVoteId={'1'}
                                />
                            ))}
                        </div>
                        { polls &&
                            <Pagination paginated={polls} />
                        }
                    </div>

                    {/* Right Sidebar Widgets */}
                    <div className="space-y-6 lg:col-span-4">
                        {/* Top Creators */}
                        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-5">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-sm font-bold tracking-tight text-white">
                                    Top Creators
                                </h3>
                                <button className="font-mono text-[10px] font-bold text-rose-500 uppercase hover:underline">
                                    View All
                                </button>
                            </div>
                            <div className="space-y-5">
                                {[
                                    {
                                        name: 'TechGuru',
                                        subs: '12.5k followers',
                                    },
                                    {
                                        name: 'DailyPoller',
                                        subs: '8.2k followers',
                                    },
                                    {
                                        name: 'CryptoKing',
                                        subs: '5.1k followers',
                                    },
                                ].map((user) => (
                                    <div
                                        key={user.name}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-zinc-800">
                                                <AvatarFallback className="bg-zinc-800 text-[10px] text-zinc-500">
                                                    TG
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-xs font-bold text-zinc-100">
                                                    {user.name}
                                                </p>
                                                <p className="font-mono text-[10px] text-zinc-500">
                                                    {user.subs}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 border-zinc-800 text-[10px] font-bold hover:bg-zinc-800"
                                        >
                                            Follow
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* For You Widget */}
                        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-5">
                            <h3 className="mb-4 text-sm font-bold tracking-tight text-white">
                                For You
                            </h3>
                            <div className="space-y-2">
                                {[
                                    {
                                        tag: 'Movies • Trending',
                                        q: 'Which summer blockbuster are you most excited for?',
                                    },
                                    {
                                        tag: 'Work • Hot',
                                        q: "Remote work vs Office: What's your preference post-2024?",
                                    },
                                    {
                                        tag: 'Finance • New',
                                        q: 'Bitcoin price prediction for end of Q4?',
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="group cursor-pointer rounded-xl border border-zinc-900 bg-black/40 p-3 transition-all hover:border-zinc-800"
                                    >
                                        <p className="mb-1 font-mono text-[9px] tracking-widest text-rose-500 uppercase">
                                            {item.tag}
                                        </p>
                                        <p className="text-xs font-medium text-zinc-300 transition-colors group-hover:text-white">
                                            {item.q}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
