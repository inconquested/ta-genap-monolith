import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PollOption } from '@/types';
import { CheckCircle, Award } from 'lucide-react';

interface PollOptionResultProps {
    option: PollOption;
    percentage: number;
    votes: number;
    isWinner: boolean;
    isDraw: boolean;
}

export function PollOptionResult({ option, percentage, votes, isWinner, isDraw }: PollOptionResultProps) {
    const bgOpacityClass = isWinner && !isDraw 
        ? "bg-emerald-500/10 border-emerald-500/30" 
        : isWinner && isDraw 
            ? "bg-amber-500/10 border-amber-500/30" 
            : "bg-zinc-800/20 border-zinc-700/30";
            
    const barClass = isWinner && !isDraw 
        ? "bg-emerald-500" 
        : isWinner && isDraw 
            ? "bg-amber-500" 
            : "bg-rose-500";
            
    const textClass = isWinner 
        ? "font-bold text-white" 
        : "font-medium text-zinc-400";

    return (
        <div className={cn("relative w-full rounded-xl p-4 overflow-hidden border transition-all", bgOpacityClass)}>
            <motion.div 
                className={cn("absolute left-0 top-0 h-full opacity-10", barClass)}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            
            <div className="relative flex justify-between items-center z-10 w-full">
                <div className="flex items-center gap-3">
                    {isWinner && !isDraw ? (
                        <div className="bg-emerald-500 p-1 rounded-full">
                            <CheckCircle size={12} className="text-white" />
                        </div>
                    ) : isWinner && isDraw ? (
                        <div className="bg-amber-500 p-1 rounded-full">
                            <Award size={12} className="text-white" />
                        </div>
                    ) : null}
                    <span className={cn("text-sm transition-colors", textClass)}>{option.value}</span>
                </div>
                
                <div className="flex flex-col items-end gap-0.5">
                    <span className="text-white font-bold text-xs">
                        {percentage.toFixed(1)}%
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                        {votes.toLocaleString()} votes
                    </span>
                </div>
            </div>
        </div>
    );
}
