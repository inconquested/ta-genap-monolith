import { Head, useForm } from "@inertiajs/react";

import PollPreview from '@/components/vote/poll-preview';
import AppLayout from "@/layouts/app-layout";
import { store } from "@/routes/polls";
import { PollCategory, PollOption } from '@/types';

import CreatePollForm, { PollFormState } from "./partials/create-poll-form";

interface CreateProps {
    categories: PollCategory[];
}

export default function Create({ categories }: CreateProps) {
    const { data, setData, processing, errors, post } = useForm<PollFormState>({
        title: '',
        description: '',
        options: [] as PollOption[],
        is_active: true,
        start_date: '',
        end_date: '',
        allow_comments: true,
        allow_quorum: true,
        quorum_count: 0,
        category: '',
        banner: undefined as File | undefined,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Ensure this sends 'data' correctly
        const action = store();
        console.log(data);
        post(action.url, {
            onSuccess: () => {
                // Handle success
                console.log('Poll created!');
            },
            forceFormData: true,
            onError: (errors) => {
                // Validation errors are automatically handled
                console.log('Validation errors:', errors);
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Buat Polling Baru" />
            <div className="flex min-h-screen justify-center p-4 md:p-6 lg:p-8">
                {/* 2. Create a Grid Layout: Left for Form, Right for Preview */}
                <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Left Column: Form (Span 7 or 8) */}
                    <div className="lg:col-span-7">
                        <div className="mb-8">
                            <h1 className="mb-2 font-mono text-3xl font-bold tracking-tight dark:text-white md:text-4xl leading-tight">
                                Buat Poll Baru
                            </h1>
                            <p className="text-sm text-muted-foreground font-mono">Lengkapi formulir di bawah untuk memulai polling baru Anda.</p>
                        </div>
                        <CreatePollForm
                            data={data}
                            setData={setData}
                            processing={processing}
                            errors={errors}
                            onSubmit={handleSubmit}
                            categories={categories}
                        />
                    </div>

                    {/* Right Column: Preview (Span 4 or 5)*/}
                    <div className="lg:col-span-5">
                        <div className="sticky top-8 space-y-4">
                            <h3 className="font-mono text-xs font-bold tracking-widest text-zinc-500 uppercase">
                                Preview Real-time
                            </h3>
                            <PollPreview data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}