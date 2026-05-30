import { cn } from '@/lib/utils';

export interface AchievementCardProps {
    achievement: {
        id: string;
        name: string;
        description: string;
        status: string;
        current: number;
        required: number;
        percentage: number;
        icon?: string | null;
        icon_url?: string | null;
        accentColor?: string;
    }
}

export function AchievementCard({ achievement }: AchievementCardProps) {
    // Determine specific states
    const isCompleted = achievement.status.toUpperCase() === 'COMPLETED';
    const isLocked = achievement.status.toUpperCase() === 'LOCKED';

    // Choose progress text color based on status
    let statusTextColor = 'text-white';
    if (isCompleted) statusTextColor = 'text-rose-500';
    if (isLocked) statusTextColor = 'text-slate-500';

    // The icon to display
    const DisplayIcon = () => {
        if (achievement.icon_url) {
            return <img src={achievement.icon_url} alt={achievement.name} className="h-6 w-6 object-contain" />;
        }
        return <span className="text-xl">{achievement.icon || '🏆'}</span>;
    };

    return (
        <div className="group relative flex min-w-[300px] max-w-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-natural p-5 shadow-lg transition-transform hover:-translate-y-1">
            {/* Background watermark icon */}
            <div className="absolute right-[-10px] top-[-10px] text-8xl opacity-10 grayscale pointer-events-none select-none">
                {achievement.icon}
            </div>

            <div className="relative z-10 flex flex-col gap-4">
                {/* Icon Box */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 shadow-inner">
                    <DisplayIcon />
                </div>

                {/* Text Content */}
                <div>
                    <h3 className="font-mono text-lg font-bold tracking-tight text-slate-100 uppercase">
                        {achievement.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-slate-400">
                        {achievement.description}
                    </p>
                </div>
            </div>

            {/* Progress Section */}
            <div className="relative z-10 mt-6 flex flex-col gap-2">
                <div className="flex items-center justify-between font-mono text-[10px] font-bold tracking-widest uppercase">
                    <span className={statusTextColor}>{achievement.status}</span>
                    <span className="text-slate-100">
                        {achievement.current}/{achievement.required}
                    </span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-900/80">
                    {/* Progress Fill */}
                    <div
                        className={cn(
                            "h-full rounded-full transition-all duration-500",
                            isLocked ? "bg-slate-700" : (achievement.accentColor || "bg-rose-500")
                        )}
                        style={{ width: `${Math.max(0, Math.min(100, achievement.percentage))}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
