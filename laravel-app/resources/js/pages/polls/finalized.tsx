import AppLayout from '@/layouts/app-layout';
import { PollResultCard } from '@/components/polls/poll-result-card';
import { Head, Link } from '@inertiajs/react';
import { Trophy, ChevronLeft, LayoutGrid, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaginatedPolls, Poll, PollResult, WinnerOption } from '@/types';
import Pagination from '@/components/ui/pagination';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { makeBreadCrumbs } from '@/lib/utils';
import { PageHeader } from '@/components/shared/page-header';
import { index as indexRoute } from '@/routes/polls';

interface FinalizedPollsPageProps {
    poll?: Poll;
    results?: PollResult[];
    winners?: WinnerOption[];
    polls?: PaginatedPolls;
}


export default function FinalizedPollsPage({ poll, results, winners, polls }: FinalizedPollsPageProps) {
    const isSingleView = !!poll;
    const breadcrumbs = makeBreadCrumbs(poll?.title ?? "Arsip", indexRoute.url());

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isSingleView ? `Hasil: ${poll?.title}` : "Arsip Polling"} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                <PageHeader
                    title={isSingleView ? "Hasil Polling" : "Arsip Polling"}
                    icon={Trophy}
                    iconColor="text-amber-500"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 w-full">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 col-span-1 flex-1 space-y-6">
                        {isSingleView ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                {poll && <PollResultCard poll={poll} results={results} winners={winners} />}

                                <div className="mt-12 p-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/10 text-center">
                                    <p className="text-zinc-500 font-mono text-sm">
                                        Polling ini telah berakhir. Hasil di atas adalah keputusan final komunitas.
                                    </p>
                                    <Link href="/polls" className="mt-4 inline-block">
                                        <Button variant="ctasec">Jelajahi Polling Aktif Lainnya</Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ) : polls && polls.data.length > 0 ? (
                            <div className="space-y-4">
                                {polls.data.map((p, idx) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <PollResultCard poll={p} />
                                    </motion.div>
                                ))}
                                <div className="pt-6">
                                    <Pagination paginated={polls as any} />
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/10">
                                <Clock size={48} className="text-zinc-600" />
                                <p className="font-mono text-lg text-zinc-500">
                                    Belum ada polling yang diselesaikan.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area (Only for List View or stats) */}
                    {!isSingleView && (
                        <div className="lg:col-span-4 space-y-6">
                            <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6">
                                <h3 className="text-sm font-bold tracking-tight text-white mb-4 flex items-center gap-2">
                                    <LayoutGrid size={16} className="text-rose-500" />
                                    Tentang Arsip
                                </h3>
                                <p className="text-xs leading-relaxed text-zinc-400 font-mono">
                                    Halaman ini menampilkan semua polling yang telah berakhir atau ditutup secara resmi. Anda dapat melihat hasil akhir dan distribusi suara untuk setiap topik.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800/50 bg-linear-to-br from-rose-500/10 to-amber-500/10 p-6">
                                <h3 className="text-sm font-bold tracking-tight text-white mb-2">Punya Pertanyaan?</h3>
                                <p className="text-xs text-zinc-400 mb-4 font-mono">Ingin membuat polling serupa atau butuh klarifikasi tentang hasil?</p>
                                <Link href="/polls/create">
                                    <Button variant="outline" size="sm" className="w-full text-xs">Buat Polling Baru</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}