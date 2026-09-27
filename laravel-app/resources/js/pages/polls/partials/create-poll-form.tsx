
import { Link, useForm } from '@inertiajs/react';
import { Check, ChevronRight, Minus, Plus, X } from 'lucide-react';
import React from 'react';

import { useImageCropper } from '@/components/image-cropper';
import { Button } from '@/components/ui/button';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem, ComboboxInput } from '@/components/ui/combobox';
import { DatePickerTime } from '@/components/ui/datetime-picker';
import { safeParse } from '@/lib/utils';
import { index } from '@/routes/polls';
import { PollCategory } from '@/types';
import { PollOption, UUID } from '@/types';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

export interface PollFormState {
    title: string;
    description: string;
    options: PollOption[];
    is_active: boolean;
    start_date?: string;
    deleted_option_ids?: UUID[];
    end_date?: string;
    allow_comments: boolean;
    category: string;
    allow_quorum: boolean;
    quorum_count: number;
    banner?: File;
}

type SetDataFunction = ReturnType<typeof useForm<PollFormState>>['setData'];

interface CreatePollFormProps {
    data: PollFormState;
    setData: SetDataFunction;
    processing: boolean;
    errors: Partial<Record<keyof PollFormState, string>>;
    onSubmit: (e: React.FormEvent) => void;
    categories: PollCategory[]
}

const FIELD_LABEL = 'mb-2 block text-sm font-medium text-foreground';
const FIELD_INPUT =
    'w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive';
const FIELD_ERROR = 'mt-2 ps-1 text-xs text-rose-700 dark:text-rose-300';


export default function CreatePollForm({
    data,
    setData,
    processing,
    errors,
    onSubmit,
    categories
}: CreatePollFormProps) {


    // --- 2. Refactored Handlers using setData ---

    // Inertia returns nested keys (e.g. `options.0.value`) outside the form-state type
    const nestedErrors = errors as Partial<Record<string, string>>;
    const optionErrors = (key: string) => nestedErrors[key];

    const handleAddOption = () => {
        if (data.options.length >= 5) return;
        const newOption: PollOption = {
            poll_id: crypto.randomUUID() as UUID,
            id: crypto.randomUUID() as UUID,
            display_order: data.options.length,
            value: `Opsi ${data.options.length + 1}`,
            created_at: '',
            updated_at: '',
        };
        // Use the callback version of setData for arrays
        setData('options', [...data.options, newOption]);
    };

    const handleRemoveOption = (id: string) => {
        setData(
            'options',
            data.options.filter((opt) => opt.id !== id),
        );
    };

    const handleOptionChange = (id: string, newValue: string) => {
        setData(
            'options',
            data.options.map((opt) =>
                opt.id === id ? { ...opt, value: newValue } : opt,
            ),
        );
    };


    const { open, CropperUI } = useImageCropper((blob) => {
        const file = new File([blob], 'banner.jpg', {
            type: 'image/jpeg',
        });
        setData('banner', file);
    });

    return (
        <form
            onSubmit={onSubmit}
            className="flex w-full justify-center font-sans"
        >
            <div className="w-full">
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-6 lg:p-8">
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
                            className={FIELD_INPUT}
                            placeholder="Masukkan judul polling..."
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
                            placeholder="Masukkan deskripsi"
                            rows={4}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className={`${FIELD_INPUT} resize-none`}
                        />
                        {errors.description && (
                            <div role="alert" className={FIELD_ERROR}>
                                {errors.description}
                            </div>
                        )}
                    </div>
                    {/**Category*/}
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
                            <div
                                role="alert"
                                className="mt-2 text-xs text-rose-700 dark:text-rose-300"
                            >
                                {errors.category}
                            </div>
                        )}
                    </div>
                    {/**Time */}
                    <fieldset className="mb-6">
                        <legend className="mb-2 text-sm font-medium text-foreground">
                            Waktu
                        </legend>
                        <div className="flex w-full flex-col items-stretch justify-between gap-4 md:flex-row md:gap-6">
                            <div className="flex-1">
                                <DatePickerTime
                                    label="Waktu Mulai"
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
                                    label="Waktu Selesai"
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
                    <fieldset className="mb-6">
                        <legend className="mb-2 block text-sm font-medium text-foreground">
                            Opsi polling
                        </legend>
                        {errors.options && (
                            <div role="alert" className={`${FIELD_ERROR} mb-3`}>
                                {errors.options}
                            </div>
                        )}
                        <div className="space-y-3">
                            {data.options.map((option, i) => (
                                <div key={option.id}>
                                    <div className="group flex gap-2">
                                        <input
                                            type="text"
                                            aria-label={`Opsi ${i + 1}`}
                                            value={option.value}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    option.id,
                                                    e.target.value,
                                                )
                                            }
                                            aria-invalid={!!optionErrors(`options.${i}.value`)}
                                            className={FIELD_INPUT}
                                        />
                                        <button
                                            type="button"
                                            aria-label={`Hapus opsi ${i + 1}`}
                                            onClick={() =>
                                                handleRemoveOption(option.id)
                                            }
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
                        </div>
                    </fieldset>

                    {/**Banner File Picker */}
                    <div className="mb-6">
                        <label htmlFor="poll-banner" className="mb-4 block text-sm font-medium text-foreground">
                            Gambar banner
                        </label>
                        <InputGroup>
                            <InputGroupInput
                                id="poll-banner"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    open(URL.createObjectURL(file), 'banner');
                                }}
                            />
                            <InputGroupAddon align={'inline-end'}>
                                <span
                                    className="text-xs text-muted-foreground"
                                    aria-live="polite"
                                >
                                    {data.banner ? data.banner.name : 'Belum ada file'}
                                </span>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.banner && (
                            <div role="alert" className={FIELD_ERROR}>
                                {errors.banner}
                            </div>
                        )}
                        {CropperUI}
                    </div>

                    {/* Advanced Settings */}
                    <fieldset className="mb-6">
                        <legend className="mb-4 text-sm font-medium text-foreground">
                            Pengaturan tambahan
                        </legend>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <SettingCard
                                label="Visibilitas"
                                subtext="Sebarkan poll ke jejaring Electa"
                                active={data.is_active}
                                onToggle={() =>
                                    setData('is_active', !data.is_active)
                                }
                            />
                            <SettingCard
                                label="Komentar"
                                subtext="Izinkan komentar di Poll ini"
                                active={data.allow_comments}
                                onToggle={() =>
                                    setData(
                                        'allow_comments',
                                        !data.allow_comments,
                                    )
                                }
                            />
                            <SettingCard
                                label="Quorum"
                                subtext="Tetapkan quorum untuk Poll ini"
                                active={data.allow_quorum}
                                onToggle={() =>
                                    setData('allow_quorum', !data.allow_quorum)
                                }
                            />
                            {/* Counter: Jumlah Quorum */}
                            <div className="flex h-full items-center justify-between rounded-md border border-border bg-card p-4">
                                <span className="text-sm font-bold text-foreground">
                                    Jumlah Quorum
                                </span>

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="button"
                                        aria-label="Kurangi quorum"
                                        disabled={!data.allow_quorum}
                                        onClick={() => {
                                            if (!data.allow_quorum) return null;
                                            setData(
                                                'quorum_count',
                                                Math.max(
                                                    0,
                                                    data.quorum_count - 1,
                                                ),
                                            );
                                        }}
                                        variant="outline"
                                    >
                                        <Minus size={16} />
                                    </Button>

                                    <input
                                        aria-label="Jumlah quorum"
                                        inputMode="numeric"
                                        disabled={!data.allow_quorum}
                                        value={data.quorum_count}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            if (!data.allow_quorum) return null;
                                            setData(
                                                'quorum_count',
                                                safeParse(
                                                    e.target.value,
                                                    0,
                                                    1_000_000,
                                                ),
                                            );
                                        }}
                                        className="w-12 bg-transparent text-center font-mono text-lg font-bold text-foreground tabular-nums focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50"
                                    />

                                    <Button
                                        type="button"
                                        aria-label="Tambah quorum"
                                        disabled={!data.allow_quorum}
                                        onClick={() => {
                                            if (!data.allow_quorum) return null;
                                            setData(
                                                'quorum_count',
                                                Math.min(
                                                    1_000_000,
                                                    data.quorum_count + 1,
                                                ),
                                            );
                                        }}
                                        variant="outline"
                                    >
                                        <Plus size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
                        <Button asChild variant={'outline'}>
                            <Link href={index.url()}>Batal</Link>
                        </Button>
                        <Button
                            disabled={processing}
                            type="submit"
                            className="group"
                            variant={'brand'}
                        >
                            {processing ? 'Memproses...' : 'Buat Poll'}{' '}
                            <ChevronRight
                                size={16}
                                className="transition-transform ease-out group-hover:translate-x-0.5"
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

function SettingCard({
    label,
    subtext,
    active,
    onToggle,
}: {
    label: string;
    subtext: string;
    active: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="group flex items-center justify-between rounded-md border border-border bg-card p-3 transition-colors hover:border-muted-foreground/30">
            <div className="flex flex-col">
                <span className="mb-1 text-sm font-bold text-foreground">
                    {label}
                </span>
                <span className="text-xs text-muted-foreground">{subtext}</span>
            </div>
            <Button
                type="button"
                onClick={onToggle}
                size={'sm'}
                aria-pressed={active}
                aria-label={label}
                variant={active ? 'ctasec' : 'outline'}
            >
                {active ? (
                    <Check size={14} />
                ) : (
                    <X size={14} />
                )}
            </Button>
        </div>
    );
}
