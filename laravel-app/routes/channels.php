<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;

/**
 * Authorize private user channel subscriptions.
 *
 * Note: If you use the Pusher driver, ensure the PHP client is installed
 * (`composer require pusher/pusher-php-server`) or set `BROADCAST_CONNECTION=log`.
 */
Broadcast::channel('user.{id}', function (User $user, $id) {
    return (string) $user->id === (string) $id;
});
