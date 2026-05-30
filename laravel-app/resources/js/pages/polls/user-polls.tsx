import { Head, Link } from '@inertiajs/react';
import { ChartBarBig, Plus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { PollFeedCard } from '@/components/vote/poll-feed-card';
import { BreadcrumbItem, Poll } from '@/types';
import Pagination from '@/components/ui/pagination';
import { router } from '@inertiajs/react';
import pollsRoutes from '@/routes/polls';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';

interface PaginatedPolls {
    data: Poll[];
    links: any[];
    meta: any;
}

export default function UserPolls({ polls }: { polls: PaginatedPolls }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Poll Saya',
            href: '#',
        },
    ];

    const redirectToPoll = (id: string) => {
        router.visit(pollsRoutes.show.url(id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Poll Saya" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
                <PageHeader
                    title="Poll Saya"
                    icon={ChartBarBig}
                    description="Kelola polling yang telah Anda buat."
                    actions={
                        <Link href={pollsRoutes.create.url()} className="w-full sm:w-auto">
                            <Button variant="ctasec" className="w-full gap-2 sm:w-auto">
                                <Plus size={18} />
                                Buat Poll Baru
                            </Button>
                        </Link>
                    }
                />

                <div className="mt-6 space-y-6 max-w-4xl">
                    {polls.data.length > 0 ? (
                        polls.data.map((poll) => (
                            <PollFeedCard
                                key={poll.id}
                                poll={poll}
                                userVoteId={null} // We don't necessarily care about the creator's vote here, or we could fetch it
                                voteCallback={() => redirectToPoll(poll.id)}
                            />
                        ))
                    ) : (
                        <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-zinc-800">
                            <ChartBarBig size={48} className="text-zinc-600" />
                            <p className="font-mono text-lg text-zinc-500">
                                Anda belum pernah membuat polling.
                            </p>
                            <Link href={pollsRoutes.create.url()}>
                                <Button variant="outline">Mulai Buat Sekarang</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {polls.data.length > 0 && (
                    <div className="mt-8">
                        <Pagination paginated={polls as any} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
