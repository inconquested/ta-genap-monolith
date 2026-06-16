import { Head } from '@inertiajs/react';

import { AchievementCard, type AchievementCardProps } from '@/components/achievement-card';
import { LeaderboardTable, type LeaderboardEntry } from '@/components/leaderboard-table';
import AppLayout from '@/layouts/app-layout';

interface LeaderboardPageProps {
    achievements: AchievementCardProps['achievement'][];
    leaderboard: LeaderboardEntry[];
}

export default function LeaderboardIndex({ achievements, leaderboard }: LeaderboardPageProps) {
    return (
        <AppLayout>
            <Head title="Global Rankings" />

            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-slate-200">
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="font-mono text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Papan peringkat
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl font-mono text-sm leading-relaxed text-slate-400 sm:text-base">
                            Selesaikan tantangan dan ikut berpartisipasi dalam
                            kegiatan-kegiatan komunitas
                        </p>
                    </div>

                    {/* Achievements Section */}
                    <div className="mt-16 sm:mt-24">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="font-mono text-xl font-bold tracking-widest text-white uppercase flex items-center gap-2">
                                <span>🏆</span> Pencapaianmu
                            </h2>
                            <span className="hidden font-mono text-[10px] tracking-widest text-slate-500 uppercase sm:block">
                                Scroll For More -&gt;
                            </span>
                        </div>

                        {/* Horizontal Scroll Container */}
                        <div className="relative -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8 pt-4 sm:mx-0 sm:px-0">
                            {achievements.map((achievement, idx) => (
                                <div key={achievement.id || idx} className="snap-start shrink-0">
                                    <AchievementCard achievement={achievement} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leaderboard Table Section */}
                    <div className="mt-12">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="font-mono text-lg font-bold tracking-widest text-white uppercase flex items-center gap-2">
                                <span>📊</span> Global Leaderboard
                            </h2>
                        </div>

                        <LeaderboardTable entries={leaderboard} />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
