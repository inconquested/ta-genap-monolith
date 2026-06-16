import { cn } from '@/lib/utils';
import { AlertCircle, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface PollTimerProps {
    endDate: string;
    variant?: 'card' | 'detail';
    className?: string;
    onEnd?: () => void;
}

/**
 * PollTimer Component
 * 
 * A modular countdown timer for polls.
 * 
 * @param endDate - ISO string of the poll end date
 * @param variant - 'card' for compact view (feed), 'detail' for prominent view (show page)
 * @param className - Additional CSS classes
 * @param onEnd - Callback when the timer reaches zero
 */
export function PollTimer({ endDate, variant = 'detail', className, onEnd }: PollTimerProps) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        isExpired: boolean;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const end = new Date(endDate).getTime();
            const now = new Date().getTime();
            const difference = end - now;

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                isExpired: false
            };
        };

        // Initial calculation
        const initial = calculateTimeLeft();
        setTimeLeft(initial);

        if (initial.isExpired && onEnd) {
            onEnd();
            return;
        }

        const timer = setInterval(() => {
            const current = calculateTimeLeft();
            setTimeLeft(current);
            if (current.isExpired) {
                clearInterval(timer);
                if (onEnd) onEnd();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate, onEnd]);

    const formatNumber = (num: number) => String(num).padStart(2, '0');

    if (timeLeft.isExpired) {
        return (
            <div className={cn(
                "flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-rose-500/80",
                className
            )}>
                <AlertCircle className="h-3 w-3" />
                <span>Voting ditutup</span>
            </div>
        );
    }

    if (variant === 'card') {
        return (
            <div className={cn(
                "flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-rose-500",
                className
            )}>
                <Clock size={12} className="animate-pulse" />
                <span>
                    {timeLeft.days > 0 && `${timeLeft.days}H `}
                    {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
                </span>
            </div>
        );
    }

    // Detail variant - Brutalist / Rich Aesthetic
    return (
        <div className={cn(
            "flex items-center gap-4 font-mono",
            className
        )}>
            <div className="flex items-center gap-2 rounded-xs border border-white/5 bg-white/5 px-2.5 py-1.5 text-gray-500 shadow-inner">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Waktu tersisa</span>
            </div>

            <div className="flex items-center gap-1.5">
                {timeLeft.days > 0 && (
                    <>
                        <TimeUnit value={timeLeft.days} label="Days" />
                        <span className="mb-3 text-lg font-light text-gray-800 dark:text-neutral-800">:</span>
                    </>
                )}
                <TimeUnit value={timeLeft.hours} label="Hrs" />
                <span className="mb-3 text-lg font-light text-gray-800 dark:text-neutral-800">:</span>
                <TimeUnit value={timeLeft.minutes} label="Min" />
                <span className="mb-3 text-lg font-light text-gray-800 dark:text-neutral-800">:</span>
                <TimeUnit value={timeLeft.seconds} label="Sec" isSeconds />
            </div>
        </div>
    );
}

function TimeUnit({ value, label, isSeconds = false }: { value: number; label: string; isSeconds?: boolean }) {
    return (
        <div className="flex flex-col items-center">
            <div className={cn(
                "min-w-[28px] text-center text-sm font-black tracking-tight transition-all duration-300",
                isSeconds ? "text-rose-500 scale-105" : "text-gray-900 dark:text-neutral-100"
            )}>
                {String(value).padStart(2, '0')}
            </div>
            <div className="h-0.5 w-full bg-rose-500/10 mt-0.5" />
            <span className="mt-1 text-[7px] font-bold text-gray-500 uppercase tracking-tighter">{label}</span>
        </div>
    );
}
