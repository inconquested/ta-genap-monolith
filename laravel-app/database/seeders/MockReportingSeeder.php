<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Enums\VoteActions;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

/**
 * Purges stale mock data and reseeds a clean, reporting-friendly dataset.
 *
 * Design goals:
 *  - FAST: everything goes in via chunked DB::table()->insert() bulk writes and
 *    no Eloquent model events / image manipulation are triggered.
 *  - STATIC PHOTO: banners reuse the single image already sitting in
 *    storage/media-library instead of being generated or fetched. We write plain
 *    `media` rows and copy that one file into each media id folder, so
 *    `media[0].original_url` resolves without Spatie ever processing an upload.
 *  - IDEAL REPORTING: created_at/voted_at are spread across the last 30 days so
 *    the dashboard/admin-metrics charts are populated, every ended poll is
 *    finalized (health status stays "ok"), and finalized polls carry real
 *    poll_results + winner_options so the per-poll report renders a winner.
 */
class MockReportingSeeder extends Seeder
{
    /** Static source banner living in storage/media-library. */
    private function bannerSource(): string
    {
        return storage_path(
            'media-library/temp/5y7ghNouS17NWeonJPzz3USuBfWCl1GQ/f7v0w4whtLTzF7lIngavybBb1V0N0N2kbanner.jpg'
        );
    }

    /** Number of regular (non-admin) users to seed. */
    private const USER_COUNT = 40;

    public function run(): void
    {
        $this->command?->info('Purging stale mock data…');
        $this->purge();

        $this->command?->info('Seeding users…');
        [$adminId, $userIds, $signupAt] = $this->seedUsers();

        $this->command?->info('Seeding poll categories…');
        $categories = $this->seedCategories();

        $this->command?->info('Seeding polls, options, votes, comments, audit logs & reports…');
        $this->seedPolls($adminId, $userIds, $signupAt, $categories);

        $this->summarize();
    }

    /**
     * Wipe all transactional/mock rows. FK checks are disabled so the truncate
     * order doesn't matter; reference/config tables (achievement_types, cache,
     * jobs, sessions) are intentionally left untouched.
     */
    private function purge(): void
    {
        // Remove physical banner folders + rows for Poll media only, so
        // achievement icons and other media stay intact.
        $pollMedia = DB::table('media')->where('model_type', \App\Models\Poll::class)->get(['id']);
        foreach ($pollMedia as $m) {
            $dir = storage_path('app/public/' . $m->id);
            if (File::isDirectory($dir)) {
                File::deleteDirectory($dir);
            }
        }

        Schema::disableForeignKeyConstraints();
        try {
            DB::table('media')->where('model_type', \App\Models\Poll::class)->delete();

            foreach ([
                'winner_options',
                'poll_results',
                'vote_audit_logs',
                'votes',
                'comments',
                'poll_options',
                'polls',
                'poll_categories',
                'user_achievements',
                'notifications',
                'personal_access_tokens',
                'users',
            ] as $table) {
                DB::table($table)->truncate();
            }
        } finally {
            Schema::enableForeignKeyConstraints();
        }
    }

    /**
     * @return array{0:string,1:array<int,string>,2:array<string,\Carbon\CarbonInterface>}
     *         [adminId, regularUserIds, signupAt(id => created_at)]
     */
    private function seedUsers(): array
    {
        $now = now();
        $password = Hash::make('password');

        $adminId = (string) Str::uuid();
        $adminCreated = $now->copy()->subDays(60);
        $rows = [[
            'id' => $adminId,
            'username' => 'admin',
            'full_name' => 'Admin ElectA',
            'email' => 'admin123@mail.com',
            'email_verified_at' => $adminCreated,
            'password' => Hash::make('password123'),
            'role' => UserRole::ADMIN->value,
            'remember_token' => Str::random(10),
            'created_at' => $adminCreated,
            'updated_at' => $adminCreated,
        ]];

        $userIds = [];
        $signupAt = [];
        for ($i = 1; $i <= self::USER_COUNT; $i++) {
            $id = (string) Str::uuid();
            $userIds[] = $id;
            // Slope signups toward recent days (r^2) so the growth series has a
            // realistic upward trend rather than a flat random spread.
            $createdAt = $this->sloped(60);
            $signupAt[$id] = $createdAt;
            $rows[] = [
                'id' => $id,
                'username' => 'user' . str_pad((string) $i, 3, '0', STR_PAD_LEFT),
                'full_name' => $this->fakeName($i),
                'email' => 'user' . str_pad((string) $i, 3, '0', STR_PAD_LEFT) . '@mail.com',
                'email_verified_at' => $createdAt,
                'password' => $password,
                'role' => UserRole::USER->value,
                'remember_token' => Str::random(10),
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ];
        }

        foreach (array_chunk($rows, 200) as $chunk) {
            DB::table('users')->insert($chunk);
        }

        return [$adminId, $userIds, $signupAt];
    }

    /**
     * @return array<string,string> label => category uuid
     */
    private function seedCategories(): array
    {
        $now = now();
        $labels = [
            'Politik' => 'Isu pemerintahan, kebijakan publik, dan pemilihan.',
            'Sosial' => 'Dinamika masyarakat dan kehidupan bersama.',
            'Teknologi' => 'Inovasi, gawai, dan tren dunia digital.',
            'Hiburan' => 'Film, musik, selebriti, dan budaya pop.',
            'Olahraga' => 'Kompetisi, atlet, dan pertandingan.',
            'Pendidikan' => 'Sekolah, kurikulum, dan pembelajaran.',
            'Kesehatan' => 'Gaya hidup sehat dan layanan kesehatan.',
            'Ekonomi' => 'Bisnis, keuangan, dan pasar.',
            'Lingkungan' => 'Iklim, konservasi, dan keberlanjutan.',
            'Kuliner' => 'Makanan, minuman, dan tren kuliner.',
        ];

        $rows = [];
        $map = [];
        foreach ($labels as $label => $description) {
            $id = (string) Str::uuid();
            $map[$label] = $id;
            $rows[] = [
                'id' => $id,
                'label' => $label,
                'description' => $description,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }
        DB::table('poll_categories')->insert($rows);

        return $map;
    }

    /**
     * Curated poll blueprints:
     * [title, categoryLabel, [options...], finalized(bool)].
     *
     * @return array<int,array{0:string,1:string,2:array<int,string>,3:bool}>
     */
    private function pollBlueprints(): array
    {
        return [
            ['Siapa tokoh yang paling layak memimpin daerahmu?', 'Politik', ['Calon A', 'Calon B', 'Calon C', 'Belum memutuskan'], true],
            ['Bahasa pemrograman favoritmu di 2026?', 'Teknologi', ['JavaScript', 'Python', 'Go', 'Rust'], true],
            ['Olahraga apa yang paling seru ditonton?', 'Olahraga', ['Sepak bola', 'Bulu tangkis', 'Basket', 'Voli'], true],
            ['Genre film terbaik tahun ini?', 'Hiburan', ['Aksi', 'Drama', 'Komedi', 'Horor'], true],
            ['Kebijakan sekolah gratis: setuju atau tidak?', 'Pendidikan', ['Sangat setuju', 'Setuju', 'Netral', 'Tidak setuju'], true],
            ['Sumber energi terbaik untuk masa depan?', 'Lingkungan', ['Surya', 'Angin', 'Air', 'Nuklir'], true],
            ['Menu sarapan andalanmu?', 'Kuliner', ['Nasi goreng', 'Bubur ayam', 'Roti', 'Lontong sayur'], true],
            ['Cara terbaik menjaga kesehatan mental?', 'Kesehatan', ['Olahraga', 'Meditasi', 'Hobi', 'Berlibur'], true],
            ['Investasi paling menarik bagi anak muda?', 'Ekonomi', ['Saham', 'Reksadana', 'Emas', 'Kripto'], true],
            ['Isu sosial yang paling mendesak?', 'Sosial', ['Pendidikan', 'Kemiskinan', 'Kesehatan', 'Lapangan kerja'], true],
            ['Fitur ponsel yang paling kamu prioritaskan?', 'Teknologi', ['Kamera', 'Baterai', 'Performa', 'Layar'], false],
            ['Destinasi liburan impianmu tahun ini?', 'Hiburan', ['Pantai', 'Gunung', 'Kota besar', 'Luar negeri'], false],
            ['Transportasi harian yang paling nyaman?', 'Sosial', ['Motor', 'Mobil', 'Transportasi umum', 'Sepeda'], false],
            ['Platform belajar online favoritmu?', 'Pendidikan', ['YouTube', 'Coursera', 'Kelas lokal', 'Buku'], false],
            ['Klub sepak bola jagoanmu?', 'Olahraga', ['Persija', 'Persib', 'Arema', 'Lainnya'], false],
            ['Kebiasaan sehat yang ingin kamu mulai?', 'Kesehatan', ['Tidur cukup', 'Kurangi gula', 'Rutin jalan', 'Minum air'], false],
            ['Tren teknologi paling berdampak 2026?', 'Teknologi', ['AI generatif', 'Kendaraan listrik', 'Robotika', 'IoT'], false],
            ['Camilan terbaik saat begadang?', 'Kuliner', ['Keripik', 'Cokelat', 'Kopi', 'Mie instan'], false],
            ['Prioritas anggaran negara menurutmu?', 'Ekonomi', ['Infrastruktur', 'Pendidikan', 'Kesehatan', 'Subsidi'], false],
            ['Aksi hijau yang paling mudah dilakukan?', 'Lingkungan', ['Kurangi plastik', 'Hemat listrik', 'Daur ulang', 'Naik sepeda'], false],
        ];
    }

    private function seedPolls(string $adminId, array $userIds, array $signupAt, array $categories): void
    {
        $blueprints = $this->pollBlueprints();

        $pollRows = [];
        $optionRows = [];
        $voteRows = [];
        $auditRows = [];
        $commentRows = [];
        $resultRows = [];
        $winnerRows = [];

        $creatorPool = array_merge([$adminId], $userIds);
        $now = now();

        $mediaInserts = [];

        // --- Integrity anomalies planted for the abuse radar -----------------
        // A shared-IP cluster: these accounts all vote from ONE address (multi-account signal).
        $sharedIpUsers = array_flip(array_slice($userIds, 0, 6));
        $sharedIp = '203.0.113.66';
        // A stable "home" IP per honest user, so IP fan-out stays ~1 account/IP for them.
        $userIp = [];
        foreach (array_values($userIds) as $n => $uid) {
            $userIp[$uid] = '198.51.100.' . (($n % 250) + 1);
        }
        // One active poll gets a burst: many votes inside a 2-minute, off-hours window.
        $burstPollIndex = 10; // first non-finalized blueprint
        $burstIp = '203.0.113.99';

        foreach ($blueprints as $index => [$title, $categoryLabel, $optionValues, $finalized]) {
            $pollId = (string) Str::uuid();
            $creatorId = $creatorPool[$index % count($creatorPool)];

            // Older polls are finalized; newer ones stay active. Spread over 30 days.
            if ($finalized) {
                $createdAt = $this->randomPast(30, 12);
                $endDate = (clone $createdAt)->addDays(random_int(3, 7));
                if ($endDate->greaterThan($now)) {
                    $endDate = (clone $now)->subDays(random_int(1, 3));
                }
                $isActive = false;
            } else {
                $createdAt = $this->randomPast(14);
                $endDate = (clone $now)->addDays(random_int(3, 21));
                $isActive = true;
            }

            $allowComments = true;

            $pollRows[] = [
                'id' => $pollId,
                'creator_id' => $creatorId,
                'title' => $title,
                'description' => 'Jajak pendapat seputar ' . strtolower($categoryLabel) . '. Berikan suaramu dan lihat hasilnya secara langsung.',
                'start_date' => $createdAt,
                'end_date' => $endDate,
                'is_finalized' => $finalized,
                'is_active' => $isActive,
                'allow_comments' => $allowComments,
                'allow_quorum' => false,
                'quorum_count' => null,
                'category' => $categories[$categoryLabel],
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ];

            // Options
            $optionIds = [];
            foreach ($optionValues as $order => $value) {
                $optionId = (string) Str::uuid();
                $optionIds[] = $optionId;
                $optionRows[] = [
                    'id' => $optionId,
                    'poll_id' => $pollId,
                    'value' => $value,
                    'display_order' => $order,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ];
            }

            // Static banner media row (files copied after insert to id folders).
            $mediaUuid = (string) Str::uuid();
            $mediaInserts[] = [
                'model_type' => \App\Models\Poll::class,
                'model_id' => $pollId,
                'uuid' => $mediaUuid,
                'collection_name' => 'banner',
                'name' => 'banner',
                'file_name' => 'banner.jpg',
                'mime_type' => 'image/jpeg',
                'disk' => 'public',
                'conversions_disk' => 'public',
                'size' => File::size($this->bannerSource()),
                'manipulations' => '[]',
                'custom_properties' => '[]',
                'generated_conversions' => '[]',
                'responsive_images' => '[]',
                'order_column' => 1,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ];

            // Votes — one per voter, weighted so a clear winner usually emerges.
            // Only users who had already signed up before the vote window closes are
            // eligible, so voted_at is always >= the voter's created_at (activation
            // and time-to-first-vote depend on that ordering being sane).
            $voteWindowEnd = $endDate->greaterThan($now) ? $now : $endDate;
            $eligible = array_values(array_filter(
                $userIds,
                fn ($uid) => $signupAt[$uid]->lessThanOrEqualTo($voteWindowEnd)
            ));
            $voterCount = min(random_int(15, 38), count($eligible));
            $voters = collect($eligible)->shuffle()->take($voterCount)->all();

            $isBurstPoll = $index === $burstPollIndex;
            // Off-hours burst anchor: 02:xx on the day after the poll opened, clamped to the window.
            $burstBase = $createdAt->copy()->addDay()->setTime(2, random_int(0, 3));
            if ($burstBase->greaterThan($voteWindowEnd)) {
                $burstBase = $voteWindowEnd->copy()->subMinutes(3);
            }
            // Only voters who existed before the burst moment can take part, so the
            // spike's voted_at never predates their signup.
            $burstVoterIds = $isBurstPoll
                ? collect($voters)->filter(fn ($u) => $signupAt[$u]->lessThanOrEqualTo($burstBase))->take(14)->flip()
                : collect();

            $tally = array_fill_keys($optionIds, 0);
            foreach ($voters as $slot => $voterId) {
                $optionId = $this->weightedOption($optionIds);
                $tally[$optionId]++;

                // Timing + IP: honest voters spread across the window from their own IP;
                // the shared-IP cluster reuses one address; the burst crowds votes
                // into a 2-minute off-hours spike from a single address.
                $inBurst = $burstVoterIds->has($voterId);
                if ($inBurst) {
                    $votedAt = $burstBase->copy()->addSeconds(random_int(0, 110));
                    $ip = $burstIp;
                } else {
                    $lowerBound = $signupAt[$voterId]->greaterThan($createdAt) ? $signupAt[$voterId] : $createdAt;
                    $votedAt = $this->randomBetween($lowerBound, $voteWindowEnd);
                    $ip = isset($sharedIpUsers[$voterId]) ? $sharedIp : $userIp[$voterId];
                }

                $voteId = (string) Str::uuid();
                $voteRows[] = [
                    'id' => $voteId,
                    'poll_id' => $pollId,
                    'option_id' => $optionId,
                    'user_id' => $voterId,
                    'voted_at' => $votedAt,
                    'created_at' => $votedAt,
                    'updated_at' => $votedAt,
                ];

                [$platform, $userAgent] = $this->device($slot);
                $auditRows[] = [
                    'id' => (string) Str::uuid(),
                    'action' => VoteActions::CREATED->value,
                    'vote_id' => $voteId,
                    'performed_by_user_id' => $voterId,
                    'performed_by_user_ip' => $ip,
                    'platform' => $platform,
                    'user_agent' => $userAgent,
                    'old_values' => null,
                    'new_values' => json_encode(['poll_id' => $pollId, 'option_id' => $optionId]),
                    'poll_id' => $pollId,
                    'option_id' => $optionId,
                    'created_at' => $votedAt,
                    'updated_at' => $votedAt,
                ];
            }

            // Comments — a subset of voters leave one comment each.
            $commenters = collect($voters)->shuffle()->take(random_int(3, 10))->all();
            foreach ($commenters as $commenterId) {
                $commentedAt = $this->randomBetween($createdAt, $voteWindowEnd);
                $commentRows[] = [
                    'id' => (string) Str::uuid(),
                    'user_id' => $commenterId,
                    'poll_id' => $pollId,
                    'content' => $this->fakeComment(),
                    'created_at' => $commentedAt,
                    'updated_at' => $commentedAt,
                ];
            }

            // Finalized polls get a poll_result + winner_option(s).
            if ($finalized) {
                $totalVotes = array_sum($tally);
                $maxVotes = max($tally);
                $winners = array_keys($tally, $maxVotes, true);
                $isDraw = count($winners) > 1;

                $resultId = (string) Str::uuid();
                $resultRows[] = [
                    'id' => $resultId,
                    'poll_id' => $pollId,
                    'is_draw' => $isDraw,
                    'total_votes' => $totalVotes,
                    'created_at' => $endDate,
                    'updated_at' => $endDate,
                ];
                foreach ($winners as $winnerOptionId) {
                    $winnerRows[] = [
                        'id' => (string) Str::uuid(),
                        'poll_result_id' => $resultId,
                        'option_id' => $winnerOptionId,
                        'created_at' => $endDate,
                        'updated_at' => $endDate,
                    ];
                }
            }
        }

        // Bulk write everything.
        DB::table('polls')->insert($pollRows);
        foreach (array_chunk($optionRows, 500) as $chunk) {
            DB::table('poll_options')->insert($chunk);
        }
        DB::table('media')->insert($mediaInserts);
        foreach (array_chunk($voteRows, 500) as $chunk) {
            DB::table('votes')->insert($chunk);
        }
        foreach (array_chunk($auditRows, 500) as $chunk) {
            DB::table('vote_audit_logs')->insert($chunk);
        }
        foreach (array_chunk($commentRows, 500) as $chunk) {
            DB::table('comments')->insert($chunk);
        }
        if ($resultRows) {
            DB::table('poll_results')->insert($resultRows);
        }
        if ($winnerRows) {
            DB::table('winner_options')->insert($winnerRows);
        }

        // Copy the single static banner into each media id folder so the
        // Spatie-style /storage/{id}/banner.jpg URL resolves.
        $this->placeBanners();
    }

    /**
     * Copy the one static banner into storage/app/public/{media_id}/banner.jpg
     * for every freshly-inserted Poll media row.
     */
    private function placeBanners(): void
    {
        $source = $this->bannerSource();
        $media = DB::table('media')->where('model_type', \App\Models\Poll::class)->get(['id', 'file_name']);
        foreach ($media as $m) {
            $dir = storage_path('app/public/' . $m->id);
            File::ensureDirectoryExists($dir);
            File::copy($source, $dir . '/' . $m->file_name);
        }
    }

    // ---- small helpers -----------------------------------------------------

    /** Weighted pick: earlier options are more likely, producing clear winners. */
    private function weightedOption(array $optionIds): string
    {
        $weights = [];
        $n = count($optionIds);
        foreach ($optionIds as $i => $id) {
            $weights[$i] = $n - $i + 1; // descending: n+1, n, ... 2
        }
        $total = array_sum($weights);
        $roll = random_int(1, $total);
        foreach ($optionIds as $i => $id) {
            $roll -= $weights[$i];
            if ($roll <= 0) {
                return $id;
            }
        }
        return $optionIds[array_key_last($optionIds)];
    }

    /** A Carbon timestamp somewhere in the last $days days (min $minHours ago). */
    private function randomPast(int $days, int $minHours = 0): CarbonInterface
    {
        $maxMinutes = $days * 24 * 60;
        $minMinutes = $minHours * 60;
        return now()->subMinutes(random_int($minMinutes, $maxMinutes));
    }

    /**
     * A signup timestamp in the last $days days, sloped toward recent (r^2) so the
     * growth series trends upward instead of being uniformly random.
     */
    private function sloped(int $days): CarbonInterface
    {
        $r = random_int(0, 1000) / 1000;
        $daysAgo = (int) round($days * $r * $r);

        return now()->subDays($daysAgo)->subMinutes(random_int(0, 1439));
    }

    /**
     * A stable-ish (platform, user-agent) pair for an audit row, varied per vote slot
     * so the platform breakdown shows a realistic device mix.
     *
     * @return array{0:string,1:string}
     */
    private function device(int $slot): array
    {
        $devices = [
            ['Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'],
            ['Android', 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36'],
            ['iOS', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'],
            ['macOS', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15'],
            ['Linux', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'],
        ];

        return $devices[$slot % count($devices)];
    }

    private function randomBetween(CarbonInterface $start, CarbonInterface $end): CarbonInterface
    {
        $span = $end->getTimestamp() - $start->getTimestamp();
        if ($span <= 0) {
            return $start;
        }
        // Offset from $start so the result keeps $start's timezone. Using
        // Carbon::createFromTimestamp() would yield a UTC instant that serializes
        // to a different wall-clock than the app-tz signup rows, producing bogus
        // "voted before signup" mismatches on naive datetime comparison.
        return $start->copy()->addSeconds(random_int(0, $span));
    }

    private function fakeName(int $i): string
    {
        $first = ['Andi', 'Budi', 'Citra', 'Dewi', 'Eka', 'Farhan', 'Gita', 'Hadi', 'Indah', 'Joko', 'Kirana', 'Lukman', 'Maya', 'Nanda', 'Oki', 'Putri', 'Rizki', 'Sari', 'Taufik', 'Umar'];
        $last = ['Santoso', 'Wijaya', 'Pratama', 'Lestari', 'Kusuma', 'Hartono', 'Nugroho', 'Anggraini', 'Saputra', 'Maulana'];
        return $first[$i % count($first)] . ' ' . $last[$i % count($last)];
    }

    private function fakeComment(): string
    {
        $comments = [
            'Menarik sekali pilihannya, saya jelas mendukung yang ini!',
            'Menurutku hasilnya sudah bisa ditebak dari awal.',
            'Susah memilih, semua opsinya bagus.',
            'Terima kasih sudah membuat jajak pendapat ini.',
            'Aku penasaran bagaimana hasil akhirnya nanti.',
            'Pilihanku mungkin beda dari mayoritas, tapi tetap yakin.',
            'Data seperti ini sangat membantu untuk diskusi.',
            'Semoga makin banyak yang ikut memberikan suara.',
            'Opsi pertama paling masuk akal buatku.',
            'Seru banget lihat perbandingannya!',
        ];
        return $comments[random_int(0, count($comments) - 1)];
    }

    private function summarize(): void
    {
        $this->command?->info(sprintf(
            'Done. users=%d polls=%d options=%d votes=%d audit=%d comments=%d results=%d winners=%d media=%d',
            DB::table('users')->count(),
            DB::table('polls')->count(),
            DB::table('poll_options')->count(),
            DB::table('votes')->count(),
            DB::table('vote_audit_logs')->count(),
            DB::table('comments')->count(),
            DB::table('poll_results')->count(),
            DB::table('winner_options')->count(),
            DB::table('media')->where('model_type', \App\Models\Poll::class)->count(),
        ));
    }
}
