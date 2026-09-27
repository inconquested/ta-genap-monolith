import { Link } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { parseTimeSafe } from '@/lib/utils';
import pollsRoutes from '@/routes/polls';
import { Poll } from '@/types';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3 } from 'lucide-react';
import VoteComponent from './vote-component';
import { PollTimer } from './poll-timer';

export function PollFeedCard({
    poll,
    userVoteId,
    voteCallback,
    index,
    featured = false,
}: {
    poll: Poll;
    userVoteId: string | null;
    voteCallback: () => void;
    index?: number;
    featured?: boolean;
}) {
    const getInitials = useInitials();
    const reduceMotion = useReducedMotion();
    const totalVotes = poll.votes?.length ?? 0;
    const created = parseTimeSafe(poll.created_at);
    const mediaUrl = poll.media?.[0]?.original_url;
    const detailUrl = pollsRoutes.show.url(poll.id);

    return (
        <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
        >
            <div className="space-y-4 p-5 md:p-6">
                {/* Creator row + ledger numeral */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage src={poll.creator?.avatar} />
                            <AvatarFallback>
                                {getInitials(poll.creator?.username ?? 'Anonim')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">
                                {poll.creator?.username ?? 'Anonim'}
                            </p>
                            <p className="font-mono text-xs text-muted-foreground">
                                Diposting {created.day}H {created.hours}J {created.minutes}M •{' '}
                                <span className="font-bold text-rose-700 dark:text-signal-rose">
                                    {poll.category?.label ?? 'Umum'}
                                </span>
                            </p>
                        </div>
                    </div>
                    {index !== undefined && (
                        <span
                            aria-hidden="true"
                            className="shrink-0 font-mono text-3xl font-bold text-muted-foreground/30 tabular-nums"
                        >
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    )}
                </div>

                {/* Question */}
                <h3
                    className={`font-bold tracking-tight text-balance ${
                        featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                    }`}
                >
                    <Link
                        href={detailUrl}
                        className="rounded-sm transition-colors hover:text-rose-700 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:hover:text-signal-rose"
                    >
                        {poll.title}
                    </Link>
                </h3>

                {/* Media */}
                {mediaUrl && (
                    <div className="overflow-hidden rounded-lg">
                        <img
                            src={mediaUrl}
                            alt={`Gambar polling: ${poll.title}`}
                            className="aspect-video w-full object-cover"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* Live distribution */}
                <div className="rounded-lg border bg-muted/40">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                        <p className="font-mono text-[11px] font-bold tracking-normal text-muted-foreground">
                            Vote Cepat
                        </p>
                        <span
                            aria-hidden="true"
                            className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-signal-rose motion-reduce:animate-none"
                        />
                    </div>
                    <div className="p-3 md:p-4">
                        <VoteComponent
                            options={poll.options}
                            votes={poll.votes}
                            userVoteId={userVoteId}
                            onVote={voteCallback}
                        />
                    </div>
                </div>

                {/* Meta footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                    <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 tabular-nums">
                            <BarChart3 size={14} aria-hidden="true" />
                            {totalVotes.toLocaleString('id-ID')} suara
                        </span>
                        <PollTimer endDate={poll.end_date} variant="card" />
                    </div>
                    <Link
                        href={detailUrl}
                        className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-rose-700 hover:underline hover:decoration-signal-rose/50 hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:text-signal-rose"
                    >
                        Buka polling
                        <ArrowRight
                            size={16}
                            aria-hidden="true"
                            className="transition-transform ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
                        />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}
