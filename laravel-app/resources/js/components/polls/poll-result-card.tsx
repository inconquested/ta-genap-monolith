import { Card } from '@/components/ui/card';
import { PollOptionResult } from './poll-option-result';
import { PollWinnerBadge } from './poll-winner-badge';
import { PollDrawBadge } from './poll-draw-badge';
import { motion } from 'framer-motion';
import { Poll, PollResult, WinnerOption } from '@/types';
import { Calendar, Users2, CheckCircle2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface PollResultCardProps {
    poll: Poll;
    results?: PollResult[];
    winners?: WinnerOption[];
}

export function PollResultCard({ poll, results, winners }: PollResultCardProps) {
    const resultData = results?.[0] || poll.result;

    const totalVotes = resultData?.total_votes ?? poll.options?.reduce((sum: number, option: any) => sum + (option.votes_count || 0), 0) ?? 0;
    const isDraw = resultData?.is_draw ?? false;

    let winCount = 0;
    let winningOptionIds: string[] = [];

    if (winners && winners.length > 0) {
        winCount = winners.length;
        winningOptionIds = winners.map((w) => w.option_id);
    } else {
        const maxVotes = Math.max(...(poll.options?.map((o) => o.votes_count || 0) || [0]));
        const calculatedWinners = poll.options?.filter((o) => (o.votes_count || 0) === maxVotes && maxVotes > 0) || [];
        winCount = calculatedWinners.length;
        winningOptionIds = calculatedWinners.map((w) => w.id);
    }

    const drawState = isDraw || winCount > 1;
    const singleWinnerOption = winCount === 1 ? poll.options?.find(o => o.id === winningOptionIds[0]) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <Card className="p-6 border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm rounded-2xl overflow-hidden relative w-full">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />

                <div className="relative mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-white mb-2 leading-tight">
                                {poll.title}
                            </h3>
                            <div className="flex flex-wrap gap-4 items-center text-zinc-400 font-mono text-[10px] uppercase tracking-wider">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={12} className="text-rose-500" />
                                    Berakhir: {format(new Date(poll.end_date), 'dd MMM yyyy')}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Users2 size={12} className="text-rose-500" />
                                    {totalVotes.toLocaleString()} Partisipan
                                </span>
                            </div>
                        </div>

                        <div className="shrink-0">
                            {drawState ? (
                                <PollDrawBadge count={winCount} />
                            ) : singleWinnerOption ? (
                                <PollWinnerBadge name={singleWinnerOption.value} />
                            ) : (
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                    <AlertCircle size={12} />
                                    No Winner
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    {poll.options?.map((option) => {
                        const votes = option.votes_count || 0;
                        const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                        const isWinner = winningOptionIds.includes(option.id);

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

                <div className="pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                            Status: Terfinalisasi
                        </span>
                    </div>
                    <div className="text-[10px] font-mono font-bold text-zinc-400">
                        {totalVotes > 0 ? 'HASIL VALID' : 'TIDAK ADA SUARA'}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
