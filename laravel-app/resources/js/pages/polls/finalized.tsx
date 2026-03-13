import AppLayout from '@/layouts/app-layout';
import { FinalizedPollsList } from '@/components/polls/finalized-polls-list';
import { Head } from '@inertiajs/react';

export default function FinalizedPollsPage({ polls }: { polls: any }) {
    return (
        <AppLayout>
            <Head title="Finalized Polls" />
            <div className="mx-auto max-w-2xl p-4">
                <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-neutral-50">
                    Polling Selesai
                </h1>
                <FinalizedPollsList polls={polls.data} />
            </div>
        </AppLayout>
    );
}