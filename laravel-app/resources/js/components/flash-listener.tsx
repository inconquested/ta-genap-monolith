import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { type SharedData } from '@/types';

export default function FlashListener() {
    const { flash } = usePage<SharedData>().props as SharedData & {
        flash?: { success?: string; error?: string };
    };
    const success = flash?.success;
    const error = flash?.error;

    useEffect(() => {
        if (success) toast.success(success);
    }, [success]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    return null;
}
