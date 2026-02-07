import { Head, useForm} from "@inertiajs/react";

import PollPreview from '@/components/poll-preview';
import AppLayout from "@/layouts/app-layout";
import { store } from "@/routes/polls";
import { PollCategory, PollOption} from '@/types';

import CreatePollForm, { PollFormState } from "./partials/create-poll-form";

interface CreateProps {
    categories: PollCategory[];
}

export default function Create({categories} : CreateProps){
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
        banner: null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Ensure this sends 'data' correctly
        const action = store();
        console.log(data);
        post(action.url,  {
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
            <div className="flex min-h-screen justify-center p-4 lg:p-8">
                {/* 2. Create a Grid Layout: Left for Form, Right for Preview */}
                <div className="grid w-screen grid-cols-1 lg:grid-cols-12">
                    {/* Left Column: Form (Span 7 or 8) */}
                    <div className="lg:col-span-8">
                        <div className="mb-6">
                            <h1 className="mb-2 font-mono text-2xl font-bold tracking-tight dark:text-white md:text-4xl">
                                Buat Poll Baru
                            </h1>
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
                    <div className="lg:col-span-4 lg:block">
                        <PollPreview data={data} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}