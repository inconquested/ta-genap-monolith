import { PollResultCard } from './poll-result-card';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageOpen } from 'lucide-react';

export function FinalizedPollsList({ polls }: { polls: any[] }) {
    if (!polls?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/5">
                <div className="bg-zinc-900 p-4 rounded-full mb-4">
                    <PackageOpen className="h-8 w-8 text-zinc-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Tidak Ada Data</h3>
                <p className="text-sm font-mono text-zinc-500 max-w-xs">
                    Belum ada polling selesai yang ditemukan dalam arsip kami.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
                {polls.map((poll, index) => (
                    <motion.div
                        key={poll.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <PollResultCard poll={poll} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
