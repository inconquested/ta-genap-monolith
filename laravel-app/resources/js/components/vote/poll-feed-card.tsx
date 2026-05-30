import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { parseTimeSafe } from '@/lib/utils';
import { Poll } from '@/types';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Clock,
    Cpu,
    MessageSquare,
    MoreHorizontal,
    Share2,
    ThumbsUp,
} from 'lucide-react';
import VoteComponent from './vote-component';
import { PollTimer } from '../polls/poll-timer';

export function PollFeedCard({
    poll,
    userVoteId,
    voteCallback,
}: {
    poll: Poll;
    userVoteId: string | null;
    voteCallback: () => void;
}) {
    const getInitials = useInitials();
    const totalVotes = poll.votes?.length ?? 0;
    const endTime = parseTimeSafe(new Date(poll.end_date))

    return (
        <motion.div
            className="w-full rounded-xl border border-zinc-800"
            key="results"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
        >
            {/* Header */}
            <img src={poll.media?.[0].original_url} className='w-full h-42 mb-3 rounded-t-md' />
            <div className="mb-4 flex items-start justify-between px-3">
                <div className="flex gap-3">
                    <Avatar className="h-10 w-10 border border-zinc-700">
                        <AvatarImage src={poll.creator?.avatar} />
                        <AvatarFallback className="bg-neutral-950 dark:bg-neutral-50 text-popover">
                            {getInitials(poll.creator?.username ?? '')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="text-sm font-bold tracking-tight text-gray-900 dark:text-neutral-50">
                            {poll.creator?.username}
                        </h4>
                        <p className="flex items-center font-mono text-xs text-muted-foreground">
                            Posted {parseTimeSafe(poll.created_at).day + 'H ' + parseTimeSafe(poll.created_at).hours + 'J ' + parseTimeSafe(poll.created_at).minutes + 'M'} •
                            <span className="ms-1.5 font-bold text-rose-500">
                                {poll.category.label}
                            </span>
                        </p>
                    </div>
                </div>
                <button className="text-zinc-500 transition-colors hover:text-white">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Question */}
            <h3 className="mb-6 text-xl font-bold tracking-tight text-gray-900 dark:text-neutral-50 mx-3">
                {poll.title}
            </h3>

            {/* Profile: Real-Time Distribution Display */}
            <div className="mb-6 px-3">
                <Card className="overflow-hidden shadow-none border-zinc-800/50 bg-neutral-50 dark:bg-neutral-950/50 p-1">
                    <div className="flex items-center justify-between border-b border-white/5 bg-white/2 p-4">
                        <h3 className="font-mono text-xs font-bold tracking-widest text-zinc-500 uppercase">
                            Distribusi Real-time
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
                            <Cpu className="h-3 w-3 text-zinc-600" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <VoteComponent
                            options={poll.options}
                            votes={poll.votes}
                            userVoteId={userVoteId}
                            onVote={voteCallback}
                        />
                    </div>
                </Card>
            </div>

            {/* Footer Stats */}
            <div className="flex flex-col gap-4 border-t border-zinc-900 py-4 px-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-widest text-zinc-500 uppercase sm:text-xs">
                    <span className="flex items-center gap-1.5">
                        <BarChart3 size={14} className="text-zinc-600" />
                        {totalVotes.toLocaleString()} votes
                    </span>
                    <PollTimer endDate={poll.end_date} variant="card" />
                </div>
                <div className="flex items-center gap-6 text-zinc-500 sm:gap-4">
                    <button className="flex items-center gap-2 transition-colors hover:text-rose-500" onClick={voteCallback}>
                        <MessageSquare size={18} />
                        <span className="text-[10px] font-bold uppercase sm:hidden">Komentar</span>
                    </button>
                    <button className="flex items-center gap-2 transition-colors hover:text-rose-500">
                        <Share2 size={18} />
                        <span className="text-[10px] font-bold uppercase sm:hidden">Bagikan</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
