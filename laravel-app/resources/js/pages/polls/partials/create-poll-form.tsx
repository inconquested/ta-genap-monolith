
import { useForm } from '@inertiajs/react';
import { Check, ChevronRight, Minus, Plus, X } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem, ComboboxInput } from '@/components/ui/combobox';
import { DatePickerTime } from '@/components/ui/datetime-picker';
import { safeParse } from '@/lib/utils';
import { PollCategory } from '@/types';
import { PollOption, UUID } from '@/types';

export interface PollFormState {
    title: string;
    description: string;
    options: PollOption[];
    is_active: boolean;
    start_date?: string;
    end_date?: string;
    allow_comments: boolean;
    category: string;
    quorum: boolean;
    quorum_count: number;
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


export default function CreatePollForm({
    data,
    setData,
    processing,
    errors,
    onSubmit,
    categories
}: CreatePollFormProps) {
 

    // --- 2. Refactored Handlers using setData ---

    const handleAddOption = () => {
        if (data.options.length == 5) return;
        const newOption: PollOption = {
            poll_id: crypto.randomUUID() as UUID,
            display_order: data.options.length,
            value: `Opsi ${data.options.length + 1}`,
            id: crypto.randomUUID() as UUID,
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


    return (
        <form
            onSubmit={onSubmit}
            className="flex min-h-screen w-full max-w-4xl justify-center p-6 font-sans text-muted-foreground"
        >
            <div className="w-screen">
                <div className="rounded-lg border border-zinc-800 p-6 dark:bg-zinc-950/50">
                    {/* Section 01: Title */}
                    <div className="mb-6">
                        <label className="mb-2 block font-mono text-sm text-zinc-500">
                            01 // Judul Polling
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded-md border border-zinc-700 p-4 font-mono focus:border-rose-500 focus:shadow-[0px_0px_4px_rgba(255,32,86,1)] focus:outline-none dark:bg-black dark:text-white"
                            placeholder="Masukkan judul polling..."
                        />
                        {errors.title && (
                            <div className="mt-2 ps-1 text-xs text-rose-500">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    {/* Section 02: Description */}
                    <div className="mb-6">
                        <label className="mb-2 block font-mono text-sm text-zinc-500">
                            02 // Deskripsi
                        </label>
                        <textarea
                            placeholder="Masukkan deskripsi"
                            rows={4}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="w-full resize-none rounded-md border border-zinc-700 p-4 font-mono text-sm focus:border-rose-500 focus:shadow-[0px_0px_4px_rgba(255,32,86,1)] focus:outline-none dark:bg-black dark:text-neutral-50"
                        />
                    </div>
                    {/**Section 3: Category*/}
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
                                        >
                                            {cat.label}
                                        </ComboboxItem>
                                    ))}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                        {errors.category && (
                            <div className="mt-2 text-xs text-rose-500">
                                {errors.category}
                            </div>
                        )}
                    </div>
                    {/**Section 04: Time */}
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

                    {/* Section 05: Options */}
                    <div className="mb-6">
                        <label className="mb-2 block font-mono text-sm text-zinc-500">
                            05 // Opsi Polling
                        </label>
                        <div className="space-y-3">
                            {data.options.map((option) => (
                                <div
                                    key={option.id}
                                    className="group flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={option.value}
                                        onChange={(e) =>
                                            handleOptionChange(
                                                option.id,
                                                e.target.value,
                                            )
                                        }
                                        className="flex-1 rounded-md border border-zinc-700 px-4 py-3 font-mono text-gray-900 focus:border-rose-500 focus:shadow-[0px_0px_4px_rgba(255,32,86,1)] focus:outline-none dark:bg-black dark:text-neutral-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveOption(option.id)
                                        }
                                        className="flex w-12 items-center justify-center rounded-md border border-zinc-700 hover:bg-zinc-800 hover:text-red-400"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={handleAddOption}
                                className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-zinc-700 p-3 font-mono text-sm text-zinc-600 hover:border-zinc-500 hover:text-zinc-400"
                            >
                                <Plus size={16} /> Tambah Opsi Baru
                            </button>
                        </div>
                    </div>

                    {/* Section 06: Advanced Settings */}
                    <div className="mb-6">
                        <label className="mb-4 block font-mono text-sm text-zinc-500">
                            06 // Pengaturan Tambahan
                        </label>
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
                                active={data.quorum}
                                onToggle={() => setData('quorum', !data.quorum)}
                            />

                            {/* Counter: Jumlah Quorum */}
                            <div className="flex h-full items-center justify-between rounded-md border border-zinc-800 p-4 dark:bg-black">
                                <span className="font-mono text-sm font-bold text-wrap dark:text-neutral-50">
                                    Jumlah Quorum
                                </span>
                                <div className="flex items-center gap-4">
                                    <Button
                                        type="button"
                                        disabled={!data.quorum}
                                        onClick={() =>
                                            setData(
                                                'quorum_count',
                                                Math.max(
                                                    0,
                                                    data.quorum_count - 1,
                                                ),
                                            )
                                        }
                                        variant={'outline'}
                                    >
                                        <Minus size={16} />
                                    </Button>
                                    <input
                                        disabled={!data.quorum}
                                        value={data.quorum_count}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            setData(
                                                'quorum_count',
                                                safeParse(
                                                    e.target.value,
                                                    0,
                                                    1000000,
                                                ),
                                            );
                                        }}
                                        className={`w-8 text-center font-mono text-lg font-bold ${data.quorum ? 'text-gray-900 dark:text-neutral-50' : ''} border-0! focus:outline-none`}
                                    />

                                    <Button
                                        type="button"
                                        disabled={!data.quorum}
                                        onClick={() =>
                                            setData(
                                                'quorum_count',
                                                data.quorum_count + 1,
                                            )
                                        }
                                        variant={'outline'}
                                    >
                                        <Plus size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-12 flex justify-end gap-4 border-t border-zinc-800 pt-6">
                        <Button type="button" variant={'outline'}>
                            Batal
                        </Button>
                        <Button
                            disabled={processing}
                            type="submit"
                            className="group"
                            variant={'brand'}
                        >
                            {processing ? 'Processing...' : 'Buat Poll'}{' '}
                            <ChevronRight
                                size={16}
                                className="transition-all ease-in-out group-hover:translate-x-0.5"
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
        <div className="group flex items-center justify-between rounded-md border border-zinc-800 dark:bg-black p-3 transition-colors hover:border-zinc-700">
            <div className="flex flex-col">
                <span className="mb-1 font-mono text-sm font-bold dark:text-neutral-50">
                    {label}
                </span>
                <span className="text-xs text-zinc-500">{subtext}</span>
            </div>
            <Button
                type="button"
                onClick={onToggle}
                size={'sm'}
                className='p-2!'
                variant={'ctasec'}
            >
                {active ? (
                    <Check size={14} className="dark:text-neutral-50" />
                ) : (
                    <X size={14} className='dark:text-neutral-50'/>
                )}
            </Button>
        </div>
    );
}
