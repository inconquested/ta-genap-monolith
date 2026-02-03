import { Head, router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

import PollPreview from '@/components/poll-preview';
import AppLayout from '@/layouts/app-layout';
import { update, destroy } from '@/routes/polls';
import { Poll, PollCategory, PollOption, UUID } from '@/types';

import UpdatePollForm, { EditPollFormState } from './partials/update-poll-form';


interface EditProps {
    categories: PollCategory[];
    poll: Poll;
}

export default function Edit({ categories, poll }: EditProps) {
    const { data, setData, processing, errors, put} = useForm<EditPollFormState>({
        title: '',
        description: '',
        options: [] as PollOption[],
        deleted_option_ids: [] as UUID[],
        is_active: true,
        start_date: '',
        end_date: '',
        allow_comments: true,
        allow_quorum: true,
        quorum_count: 0,
        category: '',
    });

    // Hydrate form with existing poll data
    useEffect(() => {
        if (!poll) return;

        setData({
            title: poll.title ?? '',
            description: poll.description ?? '',
            options: poll.options ?? [],
            is_active: poll.is_active ?? true,
            start_date: poll.start_date ?? '',
            end_date: poll.end_date ?? '',
            allow_comments: poll.allow_comments ?? true,
            allow_quorum: poll.allow_quorum ?? true,
            quorum_count: poll.quorum_count ?? 0,
            category: poll.category ?? '',
        });
    }, [poll, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const action = update(poll.id);

        put(action.url, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Poll updated');
            },
        });
    };

    const handleDelete = () => {
        if (!confirm('Hapus polling ini?')) return;

        router.delete(destroy(poll.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Poll" />

            <div className="flex min-h-screen justify-center p-4 lg:p-8">
                <div className="grid w-screen grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Form */}
                    <div className="lg:col-span-8">
                        <h1 className="mb-6 font-mono text-2xl font-bold tracking-tight md:text-4xl">
                            Edit Poll
                        </h1>

                        <UpdatePollForm
                            data={data}
                            setData={setData}
                            processing={processing}
                            onDelete={handleDelete}
                            errors={errors}
                            onSubmit={handleSubmit}
                            categories={categories}
                        />
                    </div>

                    {/* Live Preview */}
                    <div className="lg:col-span-4">
                        <PollPreview data={data} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
