import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { type SharedData } from '@/types';

interface AchievementPayload {
    name: string;
    description: string;
    icon_url: string;
}

const handleAchievementNotification = (achievement: AchievementPayload) => {
    toast.success(`🏆 Achievement Unlocked: ${achievement.name}`, {
        description: achievement.description,
        icon: achievement.icon_url ? (
            <img
                src={achievement.icon_url}
                alt="achievement icon"
                className="h-8 w-8 rounded-full object-cover"
            />
        ) : undefined,
        duration: 5000,
    });
};

export default function AchievementListener() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        if (!auth?.user || !window.Pusher) return;

        const userId = auth.user.id as string;
        const channelName = `private-user.${userId}`;
        const channel = window.Pusher.subscribe(channelName);

        channel.bind('achievement.unlocked', (payload: AchievementPayload) => {
            handleAchievementNotification(payload);
        });

        return () => {
            window.Pusher.unsubscribe(channelName);
        };
    }, [auth?.user?.id]);

    return null;
}
