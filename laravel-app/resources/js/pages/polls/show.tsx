'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import VoteComponent from '@/components/vote/vote-component';
import { VoteVelocityChart } from '@/components/vote/vote-velocity-chart';
import AppLayout from '@/layouts/app-layout';
import polls from '@/routes/polls';
import { Poll } from '@/types';
import {
    CheckCircle2,
    ChevronRight,
    MessageCircleOff,
    MessageSquare,
    Share2,
    Terminal,
    ThumbsUp,
    Users,
} from 'lucide-react';
import React from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import { store as commentsStore } from '@/routes/comments';
import { PollTimer } from '@/components/polls/poll-timer';
import { store as votesStore } from '@/routes/votes';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { makeBreadCrumbs } from '@/lib/utils';

const recentVoters = [
    {
        name: 'alex_dev_99',
        action: 'Voted EDA',
        time: '2m ago',
        color: 'text-rose-400',
    },
    {
        name: 'sarah_connor',
        action: 'Voted DDD',
        time: '5m ago',
        color: 'text-orange-400',
    },
    {
        name: 'm_k_ultra',
        action: 'Voted Hexagonal',
        time: '12m ago',
        color: 'text-purple-400',
    },
    {
        name: 'jason_bourne',
        action: 'Voted EDA',
        time: '15m ago',
        color: 'text-rose-400',
    },
    {
        name: 'trinity_matrix',
        action: 'Voted EDA',
        time: '18m ago',
        color: 'text-rose-400',
    },
    {
        name: 'Anonymous',
        action: 'Voted Monolithic',
        time: '22m ago',
        color: 'text-gray-400',
    },
];

export default function Show({ poll }: { poll: Poll }) {
    const categoryObj = (poll as any).poll_category || poll.category;
    console.log(poll)
    const page = usePage().props as any
    const currentUser = page?.auth?.user

    // Local state for comments and votes so we can update UI immediately
    const [comments, setComments] = React.useState<any[]>(() => (poll.comments ?? []));
    const [votes, setVotes] = React.useState<any[]>(() => (poll.votes ?? []));

    const velocityData = React.useMemo(() => {
        if (!votes || votes.length === 0) return [];
        const buckets: Record<string, { label: string, value: number, timestamp: number }> = {};

        votes.forEach(v => {
            const d = new Date(v.created_at);
            const minutes = d.getMinutes();
            const bucketMinutes = Math.floor(minutes / 15) * 15;
            d.setMinutes(bucketMinutes, 0, 0);

            const ts = d.getTime();
            if (!buckets[ts]) {
                const hh = d.getHours().toString().padStart(2, '0');
                const mm = d.getMinutes().toString().padStart(2, '0');
                const label = `${d.getDate()}/${d.getMonth() + 1} ${hh}:${mm}`;
                buckets[ts] = { label, value: 0, timestamp: ts };
            }
            buckets[ts].value += 1;
        });

        const sorted = Object.values(buckets).sort((a, b) => a.timestamp - b.timestamp);
        return sorted.map(b => ({
            time: b.label,
            votes: b.value
        }));
    }, [votes]);

    // Comment form (Inertia useForm)
    const commentForm = useForm({ content: '' });

    const handleCommentSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        const content = (commentForm.data.content || '').trim()
        if (!content) return
        const action = commentsStore();

        commentForm.post(action.url, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                // Optimistically append the comment using real user data
                const newComment = {
                    id: `temp-${Date.now()}`,
                    user_id: currentUser?.id,
                    poll_id: poll.id,
                    content,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    user: currentUser,
                };

                setComments((prev) => [newComment, ...prev])
                commentForm.reset();
            },
        });
    }

    // Vote form (useForm) and handler
    const voteForm = useForm({ option_id: '' })
    const currentUserVote = votes.find((v) => v.user_id === currentUser?.id)
    const [userVoteId, setUserVoteId] = React.useState<string | null>(currentUserVote?.option_id ?? null)
    const [showVoteSuccess, setShowVoteSuccess] = React.useState(false)
    const [votedOptionLabel, setVotedOptionLabel] = React.useState<string | null>(null)

    const handleVote = (optionId: string) => {
        if (!optionId) return
        if (voteForm.processing) return
        // Prevent voting twice from the same user in UI
        if (userVoteId) return

        const votedOption = poll.options?.find((o) => o.id === optionId)
        const action = votesStore(poll.id)
        voteForm.transform((data) => ({ ...data, option_id: optionId }))
        voteForm.post(action.url, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                // Optimistically add the vote using current user
                const newVote = {
                    id: `temp-${Date.now()}`,
                    poll_id: poll.id,
                    option_id: optionId,
                    user_id: currentUser?.id,
                    voted_at: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    user: currentUser,
                }

                setVotes((prev) => [...prev, newVote])
                setUserVoteId(optionId)
                setVotedOptionLabel(votedOption?.value ?? null)
                setShowVoteSuccess(true)
            },
        })
    }
    return (
        <AppLayout breadcrumbs={makeBreadCrumbs(poll.title, polls.index.url())}>
            {/* Vote Success Modal */}
            <Dialog open={showVoteSuccess} onOpenChange={setShowVoteSuccess}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-teal-400" />
                            Vote Cast Successfully
                        </DialogTitle>
                        <DialogDescription>
                            Your vote for{' '}
                            <strong className="text-foreground">{votedOptionLabel}</strong>{' '}
                            has been recorded.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowVoteSuccess(false)}
                        >
                            Stay Here
                        </Button>
                        <Button
                            onClick={() => {
                                setShowVoteSuccess(false)
                                router.visit(polls.index.url())
                            }}
                        >
                            Back to Polls
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 p-4 md:p-6 lg:grid-cols-12">
                {/* --- LEFT COLUMN (MAIN) --- */}
                <div className="space-y-6 md:space-y-8 lg:col-span-8">
                    {/* Hero / Question Area */}
                    <div className="space-y-6">
                        {/* Visual Header */}
                        <div className="relative h-48 w-full overflow-hidden rounded-xl md:h-64">
                            <img
                                src={poll.media?.[0]?.original_url}
                                className="h-full w-full object-cover"
                                alt={poll.title}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        </div>

                        {/* Poll Details */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                                <span className="shrink-0">Poll ID: {poll.id.substring(0, 8)}...</span>
                                <span className="hidden sm:inline">//</span>
                                <span className="shrink-0">Kategori: {categoryObj?.label ?? 'Uncategorized'}</span>
                            </div>

                            <h1 className="font-mono text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-neutral-50">
                                {poll.title}
                            </h1>

                            {/* Context Box */}
                            <div className="rounded border border-l-2 border-white/5 border-l-rose-500 bg-white/5 p-4 font-mono text-xs leading-relaxed text-gray-400 md:text-sm">
                                <span className="mr-2 font-bold text-rose-500">
                                    &gt; CONTENT:
                                </span>
                                {poll.description}
                            </div>

                            <div className="flex items-center gap-6 pt-2 font-mono text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{poll.votes?.length ?? 0} Votes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PollTimer endDate={poll.end_date} variant="detail" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Real-Time Distribution */}
                    <VoteComponent
                        options={poll.options}
                        votes={votes}
                        userVoteId={userVoteId}
                        isSubmitting={voteForm.processing}
                        onVote={handleVote}
                    />

                    {/* Vote Velocity Chart */}
                    <VoteVelocityChart data={velocityData} />

                    {/* Community Discussion */}
                    <Card className="p-1">
                        <div className="flex items-center justify-between border-b border-white/5 p-5">
                            <div className="flex items-center gap-2">
                                <h3 className="font-mono text-xs font-bold tracking-widest text-neutral-950 dark:text-neutral-50 uppercase">
                                    Diskusi Komunitas
                                </h3>
                                <span className="rounded bg-[#1a232e] px-1.5 py-0.5 font-mono text-[10px] text-blue-400">
                                    {!!comments ? comments.length : 0}
                                </span>
                            </div>
                            <span className="cursor-pointer font-mono text-[10px] font-bold text-rose-500 hover:underline">
                                SORT BY: TOP RATED
                            </span>
                        </div>
                        <div className="space-y-6 p-6">
                            {/* Input */}
                            {!!poll.allow_comments ?
                                <form onSubmit={handleCommentSubmit} className="mb-8 flex flex-col gap-4 sm:flex-row">
                                    <div className="hidden h-10 w-10 shrink-0 rounded-full bg-linear-to-br from-orange-500 to-rose-600 sm:block" />
                                    <div className="w-full space-y-3">
                                        <textarea
                                            placeholder="Join the discussion..."
                                            value={commentForm.data.content}
                                            onChange={(e) => commentForm.setData('content', e.target.value)}
                                            className="max-h-48 min-h-24 w-full rounded-xl border border-white/10 bg-neutral-50 dark:bg-neutral-950 p-4 text-sm text-foreground focus:border-rose-500/50 focus:outline-none transition-all"
                                        />
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-[10px] text-gray-500">Markdown supported</span>
                                            <Button type="submit" disabled={commentForm.processing} className="h-9 px-6 font-bold uppercase tracking-wider dark:text-neutral-950 text-neutral-50">
                                                {commentForm.processing ? 'Posting...' : 'POST'}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                                :
                                <div className="text-center flex flex-col items-center justify-center gap-2">
                                    <MessageCircleOff className="h-12 w-12 text-gray-600" />
                                    <p className="text-gray-500">Diskusi tidak diizinkan untuk polling ini.</p>
                                </div>
                            }

                            {/* Render comments (real data) */}
                            {!!poll.allow_comments && comments.length === 0 ? (
                                <div className="text-sm text-gray-500">Belum ada komentar — Jadi yang pertama disini.</div>
                            ) : (
                                comments.map((c: any) => (
                                    <div key={c.id} className="flex gap-4">
                                        <Avatar>
                                            {c.user?.avatar ? (
                                                <AvatarImage src={c.user.avatar} />
                                            ) : (
                                                <AvatarFallback>{(c.user?.username || 'U').substring(0, 2).toUpperCase()}</AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div className="w-full space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-white">{c.user?.username ?? 'Unknown'}</span>
                                                <span className="font-mono text-xs text-gray-600">{new Date(c.created_at).toLocaleString()}</span>
                                            </div>
                                            <p className="text-xs leading-relaxed text-gray-400 md:text-sm">{c.content}</p>
                                            <div className="flex items-center gap-4 pt-1 text-gray-600">
                                                <button className="flex items-center gap-1 text-xs hover:text-white">
                                                    <ThumbsUp className="h-3 w-3" />
                                                </button>
                                                <button className="flex items-center gap-1 text-xs hover:text-white">
                                                    <MessageSquare className="h-3 w-3" /> Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="border-t border-white/5 p-4 text-center">
                            <button className="font-mono text-[10px] tracking-widest text-gray-500 uppercase hover:text-white">
                                Load More Comments
                            </button>
                        </div>
                    </Card>
                </div>

                {/* --- RIGHT COLUMN (SIDEBAR) --- */}
                <div className="space-y-6 lg:col-span-4">
                    {/* Success Card */}
                    {userVoteId && (
                        <div className="relative overflow-hidden rounded-lg border border-teal-500/30 bg-linear-to-b from-teal-900/80 to-[#0c1210] p-6">
                            <div className="absolute top-0 right-0 p-3 opacity-20">
                                <CheckCircle2 className="h-24 w-24 text-teal-400" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <h3 className="font-serif text-xl font-bold text-white">
                                    Vote Cast Successfully
                                </h3>
                                <p className="font-mono text-xs leading-relaxed text-teal-100/70">
                                    Your decision has been recorded on the immutable
                                    ledger.
                                </p>
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-teal-500/30 text-teal-300 hover:bg-teal-900/50"
                                    >
                                        <Terminal className="mr-2 h-3 w-3" />{' '}
                                        Receipt
                                    </Button>
                                    <Button variant="destructive" className="flex-1">
                                        <Share2 className="mr-2 h-3 w-3" /> Share
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recent Voters */}
                    <Card className="h-fit">
                        <div className="flex items-center justify-between border-b border-white/5 p-4">
                            <h3 className="font-mono text-xs font-bold tracking-widest text-white uppercase">
                                Recent Voters
                            </h3>
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                        </div>
                        <div className="divide-y divide-white/5">
                            {recentVoters.map((voter, i) => (
                                <div
                                    key={i}
                                    className="group flex cursor-default items-center justify-between p-4 transition-colors hover:bg-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback>
                                                {voter.name.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-200">
                                                {voter.name}
                                            </span>
                                            <span
                                                className={`font-mono text-[10px] ${voter.color}`}
                                            >
                                                {voter.action} • {voter.time}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-700 transition-colors group-hover:text-white" />
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white/5 bg-white/5 p-3 text-center">
                            <span className="cursor-pointer font-mono text-[10px] font-bold text-rose-500 uppercase hover:underline">
                                View All Activity
                            </span>
                        </div>
                    </Card>
                </div>
            </div >
        </AppLayout >
    );
}
