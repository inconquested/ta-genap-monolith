import { Head, router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

import PollPreview from '@/components/polls/poll-preview';
import AppLayout from '@/layouts/app-layout';
import { update, destroy } from '@/routes/polls';
import { Poll, PollCategory, PollOption, UUID } from '@/types';

import UpdatePollForm, { EditPollFormState } from './partials/update-poll-form';


interface EditProps {
    categories: PollCategory[];
    poll: Poll;
}

// Backend serializes datetimes as ISO; the update endpoint requires `Y-m-d H:i:s`.
// Normalize on hydration so an untouched form still submits valid dates.
const toFormDate = (value?: string | null) => {
    if (!value) return '';
    const parsed = new Date(value.includes(' ') ? value.replace(' ', 'T') : value);
    if (Number.isNaN(parsed.getTime())) return value;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}:${pad(parsed.getSeconds())}`;
};

export default function Edit({ categories, poll }: EditProps) {
    const { data, setData, processing, errors, put } = useForm<EditPollFormState>({
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
            deleted_option_ids: [],
            is_active: poll.is_active ?? true,
            start_date: toFormDate(poll.start_date),
            end_date: toFormDate(poll.end_date),
            allow_comments: poll.allow_comments ?? true,
            allow_quorum: poll.allow_quorum ?? true,
            quorum_count: poll.quorum_count ?? 0,
            category: typeof poll.category === 'string' ? poll.category : (poll.category?.id ?? ''),
        });
    }, [poll, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const action = update(poll.id);

        put(action.url, {
            preserveScroll: true,
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

            <div className="flex min-h-screen justify-center p-4 md:p-6 lg:p-8">
                <div className="grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Form */}
                    <div className="lg:col-span-7">
                        <div className="mb-8 space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
                                Edit poll
                            </h1>
                            <p className="text-sm text-muted-foreground md:text-base">
                                Perbarui detail polling Anda di bawah ini.
                            </p>
                        </div>

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
                    <div className="lg:col-span-5">
                        <div className="sticky top-8 space-y-4">
                            <h3 className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                Preview real-time
                            </h3>
                            <PollPreview data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
