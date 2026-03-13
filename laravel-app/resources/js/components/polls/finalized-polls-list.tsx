import { PollResultCard } from './poll-result-card';

export function FinalizedPollsList({ polls }: { polls: any[] }) {
    if (!polls?.length) {
        return <div className="text-center text-sm font-mono text-zinc-500 py-10">Poll selesai tidak ditemukan.</div>;
    }

    return (
        <div className="flex flex-col gap-6">
            {polls.map((poll) => (
                <PollResultCard key={poll.id} poll={poll} />
            ))}
        </div>
    );
}
