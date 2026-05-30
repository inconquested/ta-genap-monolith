import { cn } from '@/lib/utils';
import { PollOption, Vote } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface VoteComponentProps {
    options: PollOption[] | undefined;
    votes: Vote[] | undefined;
    userVoteId?: string | null;
    isSubmitting?: boolean;
    isEnded?: boolean;
    onVote: (optionId: string) => void;
}

const transitionSpring = {
    type: 'spring',
    stiffness: 400,
    damping: 30,
} as const;

export default function VoteComponent({
    options,
    votes,
    userVoteId = null,
    isSubmitting = false,
    isEnded = false,
    onVote,
}: VoteComponentProps) {
    // Calculate stats once based on raw votes
    const stats = useMemo(() => {
        const total = votes?.length;
        const counts = votes?.reduce(
            (acc, vote) => {
                acc[vote.option_id] = (acc[vote.option_id] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>,
        );

        return { total, counts };
    }, [votes]);

    // Profile Selector: If user voted or poll is over, show the "Public Display" profile
    const showResults = !!userVoteId || isEnded;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<PollOption | null>(null);

    // --- Secure vote controller (client-side) ---
    // Prevent multiple rapid calls and concurrent submissions for same poll
    const pollId = options?.[0]?.poll_id ?? null;
    const inFlightRef = useRef(false);
    const [internalSubmitting, setInternalSubmitting] = useState(false);

    // persist last vote timestamp per poll (helps mitigate repeated requests)
    const MIN_VOTE_INTERVAL_MS = 2000;

    useEffect(() => {
        // cleanup if component unmounts while submitting
        return () => {
            inFlightRef.current = false;
            setInternalSubmitting(false);
        };
    }, []);

    const safeOnVote = useCallback(
        (optionId: string) => {
            if (!onVote) return;

            // If external submitting is active or internal submitting, ignore
            if (isSubmitting || internalSubmitting) return;

            // Prevent concurrent submissions
            if (inFlightRef.current) return;

            // Rate limit per poll using sessionStorage timestamp
            try {
                if (pollId) {
                    const key = `last_vote_${pollId}`;
                    const last = Number(sessionStorage.getItem(key) || '0');
                    const now = Date.now();
                    if (now - last < MIN_VOTE_INTERVAL_MS) return; // too soon
                    sessionStorage.setItem(key, String(now));
                }
            } catch (e) {
                // sessionStorage may be unavailable; continue without persisting
            }

            inFlightRef.current = true;
            setInternalSubmitting(true);

            try {
                // Call external handler (may navigate or perform network call)
                onVote(optionId);
            } finally {
                // keep a short lock to avoid accidental double-calls from fast events
                setTimeout(() => {
                    inFlightRef.current = false;
                    setInternalSubmitting(false);
                }, MIN_VOTE_INTERVAL_MS);
            }
        },
        [onVote, isSubmitting, internalSubmitting, pollId],
    );

    const effectiveSubmitting = isSubmitting || internalSubmitting;

    return (
        <div className="w-full space-y-3 px-3 ">
            <AnimatePresence mode="wait">
                {showResults ? (
                    /* PROFILE 1: PUBLIC DISPLAY (RESULTS) */
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-3"
                    >
                        {options?.map((opt) => {
                            const count = stats.counts[opt.id] || 0;
                            const percent =
                                stats.total === 0
                                    ? 0
                                    : Math.round((count / stats.total) * 100);
                            const isUserChoice = userVoteId === opt.id;

                            return (
                                <div key={opt.id} className="group relative">
                                    <div
                                        className={cn(
                                            'relative z-10 flex items-center justify-between rounded-lg border p-3 font-mono text-sm transition-all',
                                            isUserChoice
                                                ? 'border-rose-500/50 text-rose-200'
                                                : 'border-zinc-800 bg-neutral-50 dark:bg-neutral-950 text-zinc-400',
                                        )}
                                    >
                                        <span>
                                            {opt.value}{' '}
                                            {isUserChoice && (
                                                <span className="ml-2 text-xs opacity-100">
                                                    (You Voted)
                                                </span>
                                            )}
                                        </span>
                                        <span
                                            className={cn(
                                                'font-bold',
                                                isUserChoice
                                                    ? 'text-rose-500'
                                                    : 'text-zinc-500',
                                            )}
                                        >
                                            {percent}%
                                        </span>
                                    </div>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percent}%` }}
                                        transition={{
                                            duration: 1,
                                            ease: 'circOut',
                                        }}
                                        className={cn(
                                            'absolute inset-0 z-0 rounded-lg',
                                            isUserChoice
                                                ? 'bg-rose-500/20'
                                                : 'bg-zinc-800/30',
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </motion.div>
                ) : (
                    /* PROFILE 2: REAL VOTING (INTERACTIVE) */
                    <motion.div
                        key="voting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        {options?.map((opt) => (
                            <InteractiveVoteItem
                                key={opt.id}
                                label={opt.value}
                                isSubmitting={effectiveSubmitting}
                                onSelect={() => {
                                    if (effectiveSubmitting) return;
                                    setSelectedOption(opt);
                                    setIsDialogOpen(true);
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Your Vote</DialogTitle>
                        <DialogDescription>
                            Apakah anda yakin ingin memilih <strong className="text-foreground">{selectedOption?.value}</strong>?
                            Pilihan anda tidak bisa diubah.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                            disabled={effectiveSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                if (selectedOption) {
                                    safeOnVote(selectedOption.id);
                                    setIsDialogOpen(false);
                                }
                            }}
                            disabled={effectiveSubmitting}
                        >
                            {effectiveSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Casting Vote...
                                </>
                            ) : (
                                "Confirm Vote"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

/** * Sub-component for the interactive state to keep the
 * main component clean and handle its own layout animations.
 */
function InteractiveVoteItem({
    label,
    isSubmitting,
    onSelect,
}: {
    label: string;
    isSubmitting: boolean;
    onSelect: () => void;
}) {
    return (
        <motion.button
            layout
            disabled={isSubmitting}
            onClick={(e) => {
                // Prevent accidental double clicks from bubbling
                e.preventDefault();
                e.stopPropagation();
                if (!isSubmitting) onSelect();
            }}
            className={cn(
                'group relative w-full overflow-hidden rounded-lg border border-zinc-800 bg-black p-4 text-left transition-all',
                'hover:border-zinc-500 hover:bg-zinc-900/50 active:scale-[0.98] disabled:cursor-not-allowed',
            )}
            transition={transitionSpring}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-5 w-5 items-center justify-center">
                        <AnimatePresence mode="wait">
                            {isSubmitting ? (
                                <motion.div
                                    key="loader"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <Loader2
                                        size={16}
                                        className="animate-spin text-rose-500"
                                    />
                                </motion.div>
                            ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-zinc-600 transition-colors group-hover:border-rose-500" />
                            )}
                        </AnimatePresence>
                    </div>
                    <span className="font-mono text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
                        {label}
                    </span>
                </div>
                <div className="opacity-0 transition-opacity group-hover:opacity-100">
                    <Check size={16} className="text-rose-500" />
                </div>
            </div>
        </motion.button>
    );
}
