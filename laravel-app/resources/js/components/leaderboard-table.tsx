import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

export interface LeaderboardUser {
    username: string;
    tag?: string | null;
    avatar?: string | null;
}

export interface LeaderboardEntry {
    id?: string | number;
    rank: number;
    user: LeaderboardUser;
    votes: string | number;
    win_rate: string;
    badges: number;
    isActiveUser?: boolean;
}

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-slate-700/50 bg-transparent">
            <div className="overflow-x-auto">
                <table className="w-full text-left font-mono">
                    {/* Header */}
                    <thead className="border-b border-slate-700/50 bg-transparent text-xs tracking-widest text-slate-400 uppercase">
                        <tr>
                            <th className="px-6 py-5 font-bold">Rank</th>
                            <th className="px-6 py-5 font-bold">User</th>
                            <th className="px-6 py-5 font-bold text-right">Votes</th>
                            <th className="px-6 py-5 font-bold text-right">Win Rate</th>
                            <th className="px-6 py-5 font-bold text-right">Badges</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-slate-700/30">
                        {entries.map((entry, idx) => {
                            const isFirst = entry.rank === 1;
                            const isActive = entry.isActiveUser;

                            // Row base text color
                            const rowTextColor = isActive ? 'text-rose-500' : 'text-slate-300';

                            return (
                                <tr
                                    key={entry.id || idx}
                                    className={cn(
                                        "transition-colors hover:bg-slate-700/20",
                                        isActive && "bg-rose-500/5 hover:bg-rose-500/10"
                                    )}
                                >
                                    {/* Rank */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex h-full items-center">
                                            {isFirst ? (
                                                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-500 text-xs font-bold text-white shadow-lg shadow-orange-500/20">
                                                    {entry.rank}
                                                </span>
                                            ) : (
                                                <span className={cn("pl-2 text-sm font-bold", rowTextColor)}>
                                                    {entry.rank}
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* User (Avatar + Names) */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "h-10 w-10 shrink-0 overflow-hidden rounded-xl",

                                            )}>
                                                {entry.user.avatar && (
                                                    <img
                                                        src={entry.user.avatar}
                                                        alt={entry.user.username}
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn(
                                                    "text-sm font-bold",
                                                    isFirst ? "text-orange-400" : rowTextColor
                                                )}>
                                                    @{entry.user.username}
                                                </span>
                                                {entry.user.tag && (
                                                    <span className={cn(
                                                        "text-xs mt-0.5",
                                                        isActive ? "text-rose-500/70" : "text-slate-500"
                                                    )}>
                                                        {entry.user.tag}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Votes */}
                                    <td className={cn("px-6 py-4 text-right text-sm font-bold whitespace-nowrap", isFirst ? "text-orange-400" : rowTextColor)}>
                                        {entry.votes}
                                    </td>

                                    {/* Win Rate */}
                                    <td className={cn("px-6 py-4 text-right text-sm whitespace-nowrap", isActive ? "text-rose-500" : "text-slate-400")}>
                                        {entry.win_rate}
                                    </td>

                                    {/* Badges */}
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <span className={cn(
                                            "inline-block rounded px-2 py-1 text-xs font-bold",
                                            isFirst ? "text-orange-400 border border-orange-500/30 bg-orange-500/10" : rowTextColor
                                        )}>
                                            {entry.badges}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Footer Button matches design closely */}
            <div className="border-t border-slate-700/50 bg-transparent p-4 flex justify-center">
                <button className="rounded-lg border border-slate-600 bg-transparent px-6 py-2.5 font-mono text-xs font-bold tracking-widest text-slate-300 transition-colors hover:bg-slate-700 hover:text-white uppercase">
                    Lihat lebih banyak
                </button>
            </div>
        </div>
    );
}
