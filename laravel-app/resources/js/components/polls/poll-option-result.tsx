import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function PollOptionResult({ option, percentage, votes, isWinner, isDraw }: any) {
    const bgOpacityClass = isWinner && !isDraw ? "bg-emerald-500/20" : isWinner && isDraw ? "bg-amber-500/20" : "bg-blue-500/10";
    const barClass = isWinner && !isDraw ? "bg-emerald-500" : isWinner && isDraw ? "bg-amber-500" : "bg-blue-500";
    const textClass = isWinner ? "font-bold text-white" : "font-medium text-zinc-300";

    return (
        <div className={cn("relative w-full rounded-md p-3 overflow-hidden border border-white/5", bgOpacityClass)}>
            <motion.div 
                className={cn("absolute left-0 top-0 h-full opacity-20", barClass)}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <div className="relative flex justify-between items-center z-10 w-full text-sm">
                <span className={textClass}>{option.body || option.title}</span>
                <span className="text-zinc-400 font-mono text-xs">
                    {votes} ({percentage.toFixed(1)}%)
                </span>
            </div>
        </div>
    );
}
