import { SquareChevronRight } from 'lucide-react';

import {PollFormState} from "@/pages/polls/partials/create-poll-form";
import {  PollOption } from '@/types';

import { Button } from './ui/button';


interface PollPreviewProps {
    data: PollFormState;
}

export default function PollPreview({ data }: PollPreviewProps) {
    // Calculate percentages for visual demo (random or evenly distributed for preview)
    const totalVotes = 156;

    return (
        <div className="sticky top-6 w-full max-w-sm p-6">
            <h3 className="text-md mb-3 font-mono font-bold text-gray-900 md:text-lg dark:text-neutral-50">
                Preview Langsung
            </h3>

            {/* Card Container */}
            <div className="overflow-hidden rounded-lg border border-zinc-800 dark:bg-black">
                {/* Gradient Header */}
                <div className="h-24 w-full bg-linear-to-tr from-gray-800 via-rose-500 via-20% via-50% to-orange-400 font-black text-neutral-50 shadow-[0px_0px_8px_rgba(255,255,255,0.2)] transition-all ease-out hover:shadow-[0px_0px_8px_rgba(255,255,255,0.25)]" />

                <div className="p-5">
                    <h2 className="mb-6 text-xl leading-tight font-bold dark:text-neutral-50">
                        {data.title || 'Judul Polling...'}
                    </h2>

                    <div className="space-y-3">
                        {data.options.length === 0 && (
                            <p className="py-4 text-center font-mono text-sm text-zinc-600">
                                Belum ada opsi
                            </p>
                        )}

                        {data.options.map((option : PollOption, index : number) => (
                            <div
                                key={option.id || index}
                                className="group relative overflow-hidden rounded border p-3 transition-colors hover:border-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50"
                            >
                                {/* Fake Progress Bar for preview visual */}
                                <div
                                    className="absolute top-0 left-0 h-full bg-zinc-800/50"
                                    style={{
                                        width: `${Math.max(10, 80 - index * 20)}%`,
                                    }}
                                />

                                <div className="relative z-10 flex items-center justify-between">
                                    <span className="font-mono text-xs text-zinc-200">
                                        {option.value || 'Opsi Kosong'}
                                    </span>
                                    <span className="font-mono text-xs text-zinc-500">
                                        {Math.max(10, 80 - index * 20)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
                        <span className="font-mono text-xs font-semibold text-zinc-500">
                            {totalVotes} Suara
                        </span>
                        <div className="flex -space-x-2">
                            {/* Fake Avatars */}
                            <div className="h-6 w-6 rounded-full bg-pink-500 ring-2 ring-black" />
                            <div className="h-6 w-6 rounded-full bg-orange-500 ring-2 ring-black" />
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-[9px] text-neutral-50 ring-2 ring-black">
                                4+
                            </div>
                        </div>
                    </div>

                    <Button
                        className="mt-6 w-full font-mono"
                        variant={'outline'}
                    >
                        Lihat hasil
                    </Button>
                </div>
            </div>
            <div className="mt-3 p-[1.5px] bg-blend-color bg-linear-to-br from-gray-700 via-rose-500 via-25% via-55% to-orange-400 rounded">
                <div className="flex min-h-20 flex-col rounded bg-neutral-950 p-3">
                    <div className="flex items-center gap-1">
                        <SquareChevronRight className="text-orange-400" />
                        <p className="font-mono text-sm font-bold text-orange-400">
                            Optimisasi sistem
                        </p>
                    </div>
                    <p className="mt-1 font-mono text-xs font-bold">
                        Mengunggah gambar cover meningkatkan jangkauan polling
                        sebanyak
                        <span className="ms-1 font-mono font-bold text-orange-400 italic">
                            35%
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
