import { Scale } from 'lucide-react';

export function PollDrawBadge({ count }: { count: number }) {
    return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold ring-1 ring-inset ring-amber-500/20 tracking-wide">
            <Scale size={14} /> Seri: {count} Pemenang
        </div>
    );
}
