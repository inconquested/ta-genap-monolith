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

const FIELD_LABEL = 'mb-2 block text-sm font-medium text-foreground';
const FIELD_INPUT =
    'w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive';
const FIELD_ERROR = 'mt-2 text-xs text-rose-700 dark:text-rose-300';

// Inertia returns nested keys (e.g. `options.0.value`) outside the form-state type
const toPickerDate = (value?: string) => {
    if (!value) return undefined;
    const parsed = new Date(value.replace(' ', 'T'));
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

export default function UpdatePollForm({
    data,
    setData,
    processing,
    onDelete,
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

    // Inertia returns nested keys (e.g. `options.0.value`) outside the form-state type
    const nestedErrors = errors as Partial<Record<string, string>>;
    const optionErrors = (key: string) => nestedErrors[key];

    return (
        <form
            onSubmit={onSubmit}
            className="w-full font-sans"
        >
            <div className="w-full rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
                {/* Title */}
                <div className="mb-6">
                    <label htmlFor="poll-title" className={FIELD_LABEL}>
                        Judul polling
                    </label>
                    <input
                        id="poll-title"
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        aria-invalid={!!errors.title}
                        placeholder="Masukkan judul polling..."
                        className={FIELD_INPUT}
                    />
                    {errors.title && (
                        <div role="alert" className={FIELD_ERROR}>
                            {errors.title}
                        </div>
                    )}
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label htmlFor="poll-description" className={FIELD_LABEL}>
                        Deskripsi
                    </label>
                    <textarea
                        id="poll-description"
                        rows={4}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Masukkan deskripsi"
                        className={`${FIELD_INPUT} resize-none`}
                    />
                    {errors.description && (
                        <div role="alert" className={FIELD_ERROR}>
                            {errors.description}
                        </div>
                    )}
                </div>

                {/* Category */}
                <div className="mb-6">
                    <label htmlFor="poll-category" className={FIELD_LABEL}>
                        Kategori
                    </label>
                    <Combobox
                        items={categories}
                        onValueChange={(val: PollCategory | null) => {
                            setData('category', val ? val.id : '');
                        }}
                        itemToStringValue={(cat: PollCategory) => cat.label}
                    >
                        <ComboboxInput
                            id="poll-category"
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
                    {errors.category && (
                        <div role="alert" className={FIELD_ERROR}>
                            {errors.category}
                        </div>
                    )}
                </div>

                {/* Dates */}
                <fieldset className="mb-6">
                    <legend className="mb-2 text-sm font-medium text-foreground">
                        Waktu
                    </legend>
                    <div className="flex w-full flex-col items-stretch justify-between gap-4 md:flex-row md:gap-6">
                        <div className="flex-1">
                            <DatePickerTime
                                key={`start-${!!data.start_date}`}
                                label="Waktu Mulai"
                                value={toPickerDate(data.start_date)}
                                onChange={(val) => setData('start_date', val)}
                            />
                            {errors.start_date && (
                                <div role="alert" className={FIELD_ERROR}>
                                    {errors.start_date}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <DatePickerTime
                                key={`end-${!!data.end_date}`}
                                label="Waktu Selesai"
                                value={toPickerDate(data.end_date)}
                                onChange={(val) => setData('end_date', val)}
                            />
                            {errors.end_date && (
                                <div role="alert" className={FIELD_ERROR}>
                                    {errors.end_date}
                                </div>
                            )}
                        </div>
                    </div>
                </fieldset>

                {/* Options */}
                <fieldset className="mb-6 space-y-3">
                    <legend className="mb-2 block text-sm font-medium text-foreground">
                        Opsi polling
                    </legend>
                    {errors.options && (
                        <div role="alert" className={FIELD_ERROR}>
                            {errors.options}
                        </div>
                    )}
                    {data.options.map((opt, i) => (
                        <div key={opt.id}>
                            <div className="flex gap-2">
                                <input
                                    aria-label={`Opsi ${i + 1}`}
                                    value={opt.value}
                                    onChange={(e) =>
                                        handleOptionChange(opt.id, e.target.value)
                                    }
                                    aria-invalid={!!optionErrors(`options.${i}.value`)}
                                    className={FIELD_INPUT}
                                />
                                <button
                                    type="button"
                                    aria-label={`Hapus opsi ${i + 1}`}
                                    onClick={() => handleRemoveOption(opt.id)}
                                    className="flex w-12 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground transition-colors outline-none hover:border-destructive/50 hover:text-destructive focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            {optionErrors(`options.${i}.value`) && (
                                <div role="alert" className={FIELD_ERROR}>
                                    {optionErrors(`options.${i}.value`)}
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddOption}
                        className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border p-3 text-sm font-medium text-muted-foreground transition-colors outline-none hover:border-muted-foreground/50 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                        <Plus size={16} /> Tambah Opsi Baru
                    </button>
                </fieldset>

                {/* Submit */}
                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onDelete}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                        Hapus
                    </Button>
                    <Button type="submit" disabled={processing} variant="brand">
                        {processing ? 'Memproses...' : 'Simpan Perubahan'}
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </form>
    );
}
