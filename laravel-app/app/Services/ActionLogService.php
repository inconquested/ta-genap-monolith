<?php

namespace App\Services;

use App\Enums\VoteActions;
use App\Models\VoteAuditLog;
use Illuminate\Support\Str;

/**
 * Single writer for the audit log (vote_audit_logs table). Vote rows carry
 * vote_id; poll/comment lifecycle rows carry only poll_id (+ ids in
 * new_values) so vote-metric consumers must scope with whereNotNull('vote_id').
 *
 * Request context is resolved here — never in domain services — and degrades
 * to nulls outside HTTP (jobs, console, tests).
 */
final class ActionLogService
{
    public static function record(
        VoteActions $action,
        ?string $actorId = null,
        ?string $pollId = null,
        ?string $voteId = null,
        ?string $optionId = null,
        ?array $old = null,
        ?array $new = null,
    ): VoteAuditLog {
        $ctx = self::requestContext();

        return VoteAuditLog::create([
            'id' => (string) Str::uuid(),
            'action' => $action,
            'vote_id' => $voteId,
            'performed_by_user_id' => $actorId,
            'performed_by_user_ip' => $ctx['ip'],
            'platform' => $ctx['platform'],
            'user_agent' => $ctx['ua'],
            'old_values' => $old,
            'new_values' => $new,
            'poll_id' => $pollId,
            'option_id' => $optionId,
        ]);
    }

    /** @return array{ip: ?string, platform: ?string, ua: ?string} */
    private static function requestContext(): array
    {
        try {
            $req = request();

            return [
                'ip' => $req->ip(),
                'platform' => $req->header('sec-ch-ua-platform', 'Web'),
                'ua' => $req->userAgent(),
            ];
        } catch (\Throwable) {
            return ['ip' => null, 'platform' => null, 'ua' => null];
        }
    }
}
