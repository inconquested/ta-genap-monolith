import Pusher from 'pusher-js';

window.Pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY as string, {
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER as string,
    forceTLS: true,
    channelAuthorization: {
        endpoint: '/broadcasting/auth',
        transport: 'ajax',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
        },
    },
});
