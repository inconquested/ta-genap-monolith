import { Card } from '@/components/ui/card';
import { PollOptionResult } from './poll-option-result';
import { PollWinnerBadge } from './poll-winner-badge';
import { PollDrawBadge } from './poll-draw-badge';
import { motion } from 'framer-motion';

export function PollResultCard({ poll }: { poll: any }) {
    const totalVotes = poll.votes?.length || 0;
    const isDraw = poll.result?.is_draw;

    // Calculate winners based on max votes if result relationship is missing explicit winners array
    const maxVotes = Math.max(...poll.options.map((o: any) => o.votes_count || 0));
    const winners = poll.options.filter((o: any) => (o.votes_count || 0) === maxVotes && maxVotes > 0);
    const drawState = isDraw || winners.length > 1;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 border border-zinc-800 bg-transparent rounded-xl">
                <div className="mb-3">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-neutral-50">
                        {poll.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 mt-1">Selesai: {new Date(poll.end_date).toLocaleDateString()}</p>
                </div>

                <div className="mb-5 flex flex-wrap gap-2">
                    {drawState ? (
                        <PollDrawBadge count={winners.length} />
                    ) : winners.length === 1 ? (
                        <PollWinnerBadge name={winners[0].body || winners[0].title} />
                    ) : (
                        <span className="text-xs font-mono text-zinc-600 bg-zinc-900 px-2 py-1 rounded">Tidak ada pemenang</span>
                    )}
                </div>

                <div className="space-y-3">
                    {poll.options.map((option: any) => {
                        const votes = option.votes_count || 0;
                        const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                        const isWinner = winners.some((w: any) => w.id === option.id);

                        return (
                            <PollOptionResult
                                key={option.id}
                                option={option}
                                percentage={percentage}
                                votes={votes}
                                isWinner={isWinner}
                                isDraw={drawState}
                            />
                        );
                    })}
                </div>

                <div className="mt-4 border-t border-zinc-900 pt-3">
                    <div className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
                        Total {totalVotes.toLocaleString()} votes
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
