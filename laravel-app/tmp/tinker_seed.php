<?php
/**
 * Manual seeding snippet — run with:
 *
 *     php artisan tinker tmp/tinker_seed.php
 *
 * Seeds diverse polls (varying option counts, quorum/comment restrictions, and statuses),
 * a realistic weighted mock-vote distribution, comments, and EXPLICITLY finalizes the closed
 * polls (writes PollResult + WinnerOption directly) — bypassing the FinalizePolls countdown/job.
 *
 * Vote/comment timestamps are spread across each poll's window so the analytics time-series has
 * real shape. Idempotent-friendly: each run appends a fresh batch of polls.
 */

use App\Enums\UserRole;
use App\Models\Comment;
use App\Models\Poll;
use App\Models\PollCategory;
use App\Models\PollResult;
use App\Models\User;
use App\Models\Vote;
use App\Models\WinnerOption;
use Illuminate\Support\Str;

$banner = base_path('tmp/asset/134254781495513390.jpg');

// --- actors: reuse existing users, top up to >=25 voters for realistic spread ---
$users = User::query()->limit(60)->get();
while ($users->count() < 25) {
    $users->push(User::create([
        'id' => (string) Str::uuid(),
        'username' => 'seed_'.Str::lower(Str::random(8)),
        'full_name' => 'Seed User '.($users->count() + 1),
        'email' => 'seed_'.Str::lower(Str::random(10)).'@example.com',
        'password' => 'password123',
        'role' => UserRole::USER,
    ]));
}
$creator = $users->first();

$categories = PollCategory::all();
if ($categories->isEmpty()) {
    $categories = collect(['Umum', 'Teknologi', 'Olahraga', 'Hiburan'])
        ->map(fn ($label) => PollCategory::create(['label' => $label]));
}

// --- blueprints: varied options / restrictions / statuses ---
$blueprints = [
    ['title' => 'Bahasa pemrograman favorit 2026', 'options' => ['PHP', 'JavaScript', 'Python', 'Go', 'Rust'], 'comments' => true,  'quorum' => 15,   'status' => 'finalized'],
    ['title' => 'Framework backend terbaik',       'options' => ['Laravel', 'Django', 'Rails', 'Spring'],       'comments' => true,  'quorum' => null, 'status' => 'finalized'],
    ['title' => 'Editor kode pilihan',             'options' => ['VS Code', 'JetBrains', 'Neovim'],             'comments' => false, 'quorum' => null, 'status' => 'finalized'],
    ['title' => 'Minuman saat ngoding',            'options' => ['Kopi', 'Teh', 'Air putih', 'Energy drink'],   'comments' => true,  'quorum' => 40,   'status' => 'finalized'], // quorum likely unmet
    ['title' => 'OS untuk development',            'options' => ['Linux', 'macOS', 'Windows'],                  'comments' => true,  'quorum' => null, 'status' => 'active'],    // still open
    ['title' => 'Database favorit',               'options' => ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB'],    'comments' => true,  'quorum' => null, 'status' => 'closed'],    // ended, not finalized
];

$sampleComments = [
    'Menarik sekali pollingnya!', 'Aku pilih yang pertama.', 'Kenapa nggak ada opsi lain?',
    'Setuju banget nih.', 'Hasilnya sesuai dugaan.', 'Seru, tunggu hasil akhirnya.',
    'Pilihanku beda dari mayoritas.', 'Mantap, lanjutkan!',
];

foreach ($blueprints as $bp) {
    $active = $bp['status'] === 'active';
    $start = now()->subDays(rand(6, 20));
    $end = $active ? now()->addDays(rand(2, 7)) : now()->subDays(rand(1, 3));
    // votes/comments land between start and whichever of end/now is earlier (no future events)
    $ceiling = $end->isFuture() ? now() : $end;
    $span = max(1, (int) $start->diffInMinutes($ceiling));
    $at = fn () => $start->addMinutes(rand(0, $span));

    $poll = Poll::create([
        'id' => (string) Str::uuid(),
        'creator_id' => $creator->id,
        'title' => $bp['title'],
        'description' => 'Seeded poll — '.$bp['title'],
        'category' => $categories->random()->id,
        'start_date' => $start,
        'end_date' => $end,
        'is_active' => $active,
        'is_finalized' => false,
        'allow_comments' => $bp['comments'],
        'allow_quorum' => $bp['quorum'] !== null,
        'quorum_count' => $bp['quorum'],
    ]);

    try {
        if (is_file($banner)) {
            $poll->addMedia($banner)->preservingOriginal()->toMediaCollection('banner');
        }
    } catch (\Throwable $e) {
        echo "  (banner skipped: {$e->getMessage()})".PHP_EOL;
    }

    // options with random popularity weights
    $options = collect($bp['options'])->values()->map(fn ($value, $i) => [
        'model' => $poll->options()->create(['id' => (string) Str::uuid(), 'value' => $value, 'display_order' => $i]),
        'weight' => rand(1, 10),
    ]);
    $totalWeight = $options->sum('weight');

    // realistic votes: a random subset of users, each voting once, option chosen by weight
    $voters = $users->shuffle()->take(rand(8, min(24, $users->count())));
    foreach ($voters as $voter) {
        $roll = rand(1, $totalWeight);
        $acc = 0;
        $chosen = $options->first()['model'];
        foreach ($options as $o) {
            $acc += $o['weight'];
            if ($roll <= $acc) { $chosen = $o['model']; break; }
        }
        $vote = Vote::create([
            'poll_id' => $poll->id,
            'option_id' => $chosen->id,
            'user_id' => $voter->id,
            'voted_at' => $at(),
        ]);
        Vote::whereKey($vote->id)->update(['created_at' => $vote->voted_at]); // spread created_at for time-series
    }

    if ($bp['comments']) {
        foreach ($voters->take(rand(2, 6)) as $commenter) {
            $c = Comment::create([
                'poll_id' => $poll->id,
                'user_id' => $commenter->id,
                'content' => $sampleComments[array_rand($sampleComments)],
            ]);
            Comment::whereKey($c->id)->update(['created_at' => $at()]);
        }
    }

    // --- explicit finalize: write results directly, bypass the FinalizePolls job ---
    if ($bp['status'] === 'finalized') {
        $counts = $poll->options()->withCount('votes')->get();
        $max = (int) $counts->max('votes_count');
        $winners = $counts->where('votes_count', $max);
        $result = PollResult::create([
            'id' => (string) Str::uuid(),
            'poll_id' => $poll->id,
            'is_draw' => $winners->count() > 1,
            'total_votes' => (int) $counts->sum('votes_count'),
        ]);
        foreach ($winners as $w) {
            WinnerOption::create(['id' => (string) Str::uuid(), 'poll_result_id' => $result->id, 'option_id' => $w->id]);
        }
        $poll->update(['is_finalized' => true, 'is_active' => false]);
    }

    echo "Seeded [{$bp['status']}] {$poll->title} — options: ".count($bp['options']).", voters: {$voters->count()}".PHP_EOL;
}

echo 'Done. Totals -> polls: '.Poll::count().', votes: '.Vote::count().', comments: '.Comment::count().PHP_EOL;
