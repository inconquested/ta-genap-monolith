import { Trophy } from 'lucide-react';

export function PollWinnerBadge({ name }: { name: string }) {
    return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold ring-1 ring-inset ring-emerald-500/20 tracking-wide">
            <Trophy size={14} /> Winner: {name}
        </div>
    );
}
