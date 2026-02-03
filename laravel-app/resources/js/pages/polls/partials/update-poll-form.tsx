import { useForm } from '@inertiajs/react';
import { ChevronRight, Plus, X } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { DatePickerTime } from '@/components/ui/datetime-picker';
import { PollCategory, PollOption, UUID } from '@/types';

export interface EditPollFormState {
    title: string;
    description: string;
    options: PollOption[];
    deleted_option_ids: UUID[];
    is_active: boolean;
    start_date?: string;
    end_date?: string;
    allow_comments: boolean;
    category: string;
    allow_quorum: boolean;
    quorum_count: number;
}

type SetDataFunction = ReturnType<typeof useForm<EditPollFormState>>['setData'];

interface Props {
    data: EditPollFormState;
    setData: SetDataFunction;
    processing: boolean;
    onDelete: () => void;
    errors: Partial<Record<keyof EditPollFormState, string>>;
    onSubmit: (e: React.FormEvent) => void;
    categories: PollCategory[];
}

export default function UpdatePollForm({
    data,
    setData,
    processing,
    errors,
    onSubmit,
    categories,
}: Props) {
    // Add new option (no poll_id yet — backend attaches)
    const handleAddOption = () => {
        if (data.options.length >= 5) return;

        const newOption: PollOption = {
            id: crypto.randomUUID() as UUID,
            poll_id: '' as UUID,
            display_order: data.options.length,
            value: `Opsi ${data.options.length + 1}`,
            created_at: '',
            updated_at: '',
        };

        setData('options', [...data.options, newOption]);
    };

    // Remove option (track DB deletions)
    const handleRemoveOption = (id: UUID) => {
        const option = data.options.find((o) => o.id === id);

        // If it came from DB, mark for deletion
        if (option?.poll_id) {
            setData('deleted_option_ids', [...data.deleted_option_ids, id]);
        }

        setData(
            'options',
            data.options.filter((o) => o.id !== id),
        );
    };

    const handleOptionChange = (id: UUID, value: string) => {
        setData(
            'options',
            data.options.map((o) => (o.id === id ? { ...o, value } : o)),
        );
    };

    return (
        <form
            onSubmit={onSubmit}
            className="flex w-full max-w-4xl p-6 font-sans text-muted-foreground"
        >
            <div className="w-full rounded-lg border border-zinc-800 p-6 dark:bg-zinc-950/50">
                {/* Title */}
                <div className="mb-6">
                    <label className="mb-2 block font-mono text-sm text-zinc-500">
                        01 // Judul Polling
                    </label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full rounded-md border border-zinc-700 p-4 font-mono dark:bg-black dark:text-white"
                    />
                    {errors.title && (
                        <div className="mt-2 text-xs text-rose-500">
                            {errors.title}
                        </div>
                    )}
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="mb-2 block font-mono text-sm text-zinc-500">
                        02 // Deskripsi
                    </label>
                    <textarea
                        rows={4}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full rounded-md border border-zinc-700 p-4 font-mono dark:bg-black dark:text-neutral-50"
                    />
                </div>

                {/* Category */}
                <div className="mb-6">
                    <label className="mb-2 block font-mono text-sm text-zinc-500">
                        03 // Kategori
                    </label>
                     <Combobox
                                                items={categories}
                                                onValueChange={(val: PollCategory | null) => {
                                                    setData('category', val ? val.id : '');
                                                }}
                                                itemToStringValue={(cat: PollCategory) => cat.label}
                                            >
                                                <ComboboxInput
                                                    placeholder="Pilih Kategori"
                                                    className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                                />
                                                <ComboboxContent>
                                                    <ComboboxEmpty>
                                                        Kategori tidak ditemukan.
                                                    </ComboboxEmpty>
                                                    <ComboboxList>
                                                        {categories.map((cat) => (
                                                            <ComboboxItem
                                                                className={`font-mono`}
                                                                key={cat.id}
                                                                value={cat}
                                                                onChange={() =>
                                                                    setData('category', cat.id)
                                                                }
                                                            >
                                                                {cat.label}
                                                            </ComboboxItem>
                                                        ))}
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                </div>

                {/* Dates */}
                 <div className="mb-6">
                                        <label className="mb-2 block font-mono text-sm text-zinc-500">
                                            04 // Waktu
                                        </label>
                                        <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
                                            <DatePickerTime
                                                label="Waktu Mulai"
                                                onChange={(val) => setData('start_date', val)}
                                            />
                                            <DatePickerTime
                                                label="Waktu Selesai"
                                                onChange={(val) => setData('end_date', val)}
                                            />
                                        </div>
                                    </div>

                {/* Options */}
                <div className="mb-6 space-y-3">
                    <label className="block font-mono text-sm text-zinc-500">
                        05 // Opsi Polling
                    </label>
                    {data.options.map((opt) => (
                        <div key={opt.id} className="flex gap-2">
                            <input
                                value={opt.value}
                                onChange={(e) =>
                                    handleOptionChange(opt.id, e.target.value)
                                }
                                className="flex-1 rounded-md border border-zinc-700 px-4 py-3 font-mono dark:bg-black dark:text-neutral-50"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveOption(opt.id)}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddOption}
                        className="flex items-center gap-2 text-sm"
                    >
                        <Plus size={16} /> Tambah Opsi Baru
                    </button>
                </div>

                {/* Submit */}
                <div className="mt-10 flex justify-end gap-4 border-t border-zinc-800 pt-6">
                    <Button type="submit" disabled={processing} variant="brand">
                        {processing ? 'Processing...' : 'Simpan Perubahan'}
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </form>
    );
}
