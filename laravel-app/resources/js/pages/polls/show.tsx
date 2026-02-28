 'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import VoteComponent from '@/components/vote-component';
import { VoteVelocityChart } from '@/components/vote-velocity-chart';
import AppLayout from '@/layouts/app-layout';
import polls from '@/routes/polls';
import { BreadcrumbItem, Poll } from '@/types';
import {
    CheckCircle2,
    ChevronRight,
    Clock,
    Cpu,
    MessageSquare,
    Share2,
    Terminal,
    ThumbsUp,
    Users,
} from 'lucide-react';
import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { store as commentsStore } from '@/routes/comments';
import { store as votesStore } from '@/routes/votes';

const Badge = ({
    children,
    className,
    variant = 'default',
}: {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'outline' | 'danger';
}) => {
    const styles = {
        default: 'bg-green-900/30 text-green-400 border-green-800',
        outline: 'bg-transparent border-gray-700 text-gray-400',
        danger: 'bg-red-900/30 text-red-400 border-red-800',
    };
    return (
        <span
            className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] font-medium uppercase ${styles[variant]} ${className}`}
        >
            {children}
        </span>
    );
};



// --- DATA ---
const velocityData = [
    { time: '10:00', votes: 15 },
    { time: '10:15', votes: 20 },
    { time: '10:30', votes: 35 },
    { time: '10:45', votes: 45 },
    { time: '11:00', votes: 30 },
    { time: '11:15', votes: 55 },
    { time: '11:30', votes: 70 },
    { time: '11:45', votes: 65 },
    { time: '12:00', votes: 85 },
    { time: '12:15', votes: 80 }, // Peak Red
    { time: '12:30', votes: 110 }, // Start Orange
    { time: '12:45', votes: 115 },
    { time: '01:00', votes: 125 },
    { time: '01:15', votes: 75 },
    { time: '01:30', votes: 50 },
];

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
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Polls',
        href: polls.index.url(),
    },
    {
        title: 'hjaha',
        href: ''
    }
];

const makeBreadCrumbs = (title : string) : BreadcrumbItem[]=>{
    return [
        {
        title: 'Polls',
        href: polls.index.url()
    },{
        title: title,
        href: ''
    }
    ]
} 
export default function Show({poll} : {poll : Poll}) 
{
    console.log(poll)
    const page = usePage().props as any
    const currentUser = page?.auth?.user

    // Local state for comments and votes so we can update UI immediately
    const [comments, setComments] = React.useState(() => (poll.comments ?? []));
    const [votes, setVotes] = React.useState(() => (poll.votes ?? []));

    // Comment form (Inertia useForm)
    const commentForm = useForm({ content: '' });

    const handleCommentSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        const content = (commentForm.data.content || '').trim()
        if (!content) return
        const action = commentsStore(poll.id);

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

                setComments((prev) => [newComment, ...prev]);
                commentForm.reset();
            },
        });
    }

    // Vote form (useForm) and handler
    const voteForm = useForm({ option_id: '' })
    const currentUserVote = votes.find((v) => v.user_id === currentUser?.id)
    const [userVoteId, setUserVoteId] = React.useState<string | null>(currentUserVote?.option_id ?? null)

    const handleVote = (optionId: string) => {
        if (!optionId) return
        if (voteForm.processing) return
        // Prevent voting twice from the same user in UI
        if (userVoteId) return

        const action = votesStore(poll.id)

        voteForm.post(action.url, {
            data: { option_id: optionId },
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
            },
        })
    }
    return (
        <AppLayout breadcrumbs={makeBreadCrumbs(poll.title)}>
            <div className="relative z-10 mx-auto grid max-w-400 grid-cols-1 gap-8 p-6 lg:grid-cols-12">
                {/* --- LEFT COLUMN (MAIN) --- */}
                <div className="space-y-8 lg:col-span-8">
                    {/* Hero / Question Area */}
                    <div className="space-y-6">
                        {/* Visual Header */}
                        <img
                            src={poll.media?.[0]?.original_url}
                            className="h-48 w-full rounded-xs"
                        />
                        {/* Poll Details */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                                <span>Poll ID: {poll.id}</span>
                                <span>//</span>
                                <span>Kategori: {poll.category.label}</span>
                            </div>

                            <h1 className="font-mono text-3xl leading-tight font-bold tracking-tight dark:text-neutral-50 text-gray-900     md:text-4xl">
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
                                    <Clock className="h-4 w-4" />
                                    <span>Ends in 04:23:12</span>
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
                    <VoteVelocityChart data={velocityData}/>

                    {/* Community Discussion */}
                    <Card className="p-1">
                        <div className="flex items-center justify-between border-b border-white/5 p-5">
                            <div className="flex items-center gap-2">
                                <h3 className="font-mono text-xs font-bold tracking-widest text-neutral-950 dark:text-neutral-50 uppercase">
                                    Diskusi Komunitas
                                </h3>
                                <span className="rounded bg-[#1a232e] px-1.5 py-0.5 font-mono text-[10px] text-blue-400">
                                    42
                                </span>
                            </div>
                            <span className="cursor-pointer font-mono text-[10px] font-bold text-rose-500 hover:underline">
                                SORT BY: TOP RATED
                            </span>
                        </div>
                        <div className="space-y-6 p-6">
                            {/* Input */}
                            <form onSubmit={handleCommentSubmit} className="mb-8 flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-rose-600" />
                                <div className="w-full space-y-2">
                                    <textarea
                                        placeholder="Join the discussion..."
                                        value={commentForm.data.content}
                                        onChange={(e) => commentForm.setData('content', e.target.value)}
                                        className="max-h-48 min-h-20 w-full rounded border border-white/10 bg-neutral-50 dark:bg-neutral-950 p-3 text-sm text-foreground focus:border-rose-500/50 focus:outline-none"
                                    />
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-[10px] text-gray-600">Markdown supported</span>
                                        <div className="flex items-center gap-2">
                                            <Button type="submit" disabled={commentForm.processing} className="h-8 text-white">
                                                {commentForm.processing ? 'Posting...' : 'POST COMMENT'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* Render comments (real data) */}
                            {comments.length === 0 ? (
                                <div className="text-sm text-gray-500">No comments yet — be the first to comment.</div>
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
                    <div className="relative overflow-hidden rounded-lg border border-teal-500/30 bg-gradient-to-b from-teal-900/80 to-[#0c1210] p-6">
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
                                <Button variant="danger" className="flex-1">
                                    <Share2 className="mr-2 h-3 w-3" /> Share
                                </Button>
                            </div>
                        </div>
                    </div>

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
                                        <Avatar
                                            fallback={voter.name
                                                .substring(0, 2)
                                                .toUpperCase()}
                                        />
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
            </div>
        </AppLayout>
    );
}
