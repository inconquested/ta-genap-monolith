import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PollFeedCard } from '@/components/vote/poll-feed-card';
import { History as HistoryIcon } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { BreadcrumbItem, Vote, Poll } from '@/types';
import Pagination from '@/components/ui/pagination';
import { router } from '@inertiajs/react';
import pollsRoutes from '@/routes/polls';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Riwayat',
        href: '/user/votes',
    },
];

interface PaginatedVotes {
    data: (Vote & { poll: Poll })[];
    links: any[];
    meta: any;
}

export default function History({ votes }: { votes: PaginatedVotes }) {
    const redirectToPoll = (id: string) => {
        router.visit(pollsRoutes.show.url(id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Polling" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
                <PageHeader 
                    title="Riwayat Polling Anda"
                    icon={HistoryIcon}
                    description="Daftar polling yang pernah Anda ikuti."
                />

                <div className="mt-6 space-y-6 max-w-4xl">
                    {votes.data.length > 0 ? (
                        votes.data.map((vote) => (
                            <PollFeedCard
                                key={vote.id}
                                poll={vote.poll}
                                userVoteId={vote.option_id}
                                voteCallback={() => redirectToPoll(vote.poll.id)}
                            />
                        ))
                    ) : (
                        <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-zinc-800">
                            <HistoryIcon size={48} className="text-zinc-600" />
                            <p className="font-mono text-lg text-zinc-500">
                                Anda belum pernah mengikuti polling apapun.
                            </p>
                        </div>
                    )}
                </div>

                {votes.data.length > 0 && (
                    <div className="mt-8">
                        <Pagination paginated={votes as any} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
