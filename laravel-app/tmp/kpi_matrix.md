# KPI Matrix — Provider-Facing Poll Analytics

Metrics for `GET /api/analytics/polls/{poll}` (admin). **Every KPI below is computable from data that already
exists** — no new columns required. Sources verified in the codebase. Metrics not backed by existing data are in
§2, with the upgrade path named.

Envelope: each row maps to one normalized `metrics[]` item — `{ key, label, value, displayValue?, type, unit?, highlight? }`.

## 1. Feasible today (no schema change)

| KPI (`key`) | What it measures | Formula | Data source (existing) | Type |
|---|---|---|---|---|
| `participation_rate` | Reach: share of eligible users who voted | `unique_voters / User::count()` | `votes.user_id` (distinct), `users` | percent |
| `unique_voters` | True reach vs raw vote count | `COUNT(DISTINCT votes.user_id)` | `votes` (app enforces ~1 vote/user/poll) | number |
| `total_votes` | Raw volume | `poll_results.total_votes` (precomputed) | `poll_results` | number |
| `turnout_vs_quorum` | Did the poll clear its threshold | `total_votes / quorum_count` (when `allow_quorum`) | `poll_results`, `polls.quorum_count` | percent |
| `vote_velocity` | Momentum — votes per minute | `total_votes / active_minutes` | `votes` ts, `polls.start_date`/`end_date` | number (`/min`) |
| `peak_voting_window` | When engagement concentrates | hour bucket with `MAX(votes)` | `votes.created_at` bucketed (`DATE_FORMAT … GROUP BY`) | text |
| `time_to_quorum` | Traction speed | `first_ts_reaching(quorum) − start_date` | `votes` ordered by `voted_at`, `polls` | duration |
| `finalization_latency` | Operational health of finalize job | `poll_results.created_at − poll.end_date` | `poll_results`, `polls` | duration |
| `winner_margin` | Decisiveness of outcome | `(top1_votes − top2_votes) / total_votes` | `poll_options` + `withCount('votes')` | percent |
| `vote_concentration` | Dominance of leading option | `top1_votes / total_votes` | `poll_options` + `withCount('votes')` | percent |
| `options_utilized` | Option-set relevance | `options_with_≥1_vote / total_options` | `poll_options` + `withCount('votes')` | percent |
| `comment_engagement` | Discussion depth per voter | `comments_count / unique_voters` | `comments`, `votes` | number |
| `platform_split` | Channel/device mix | `GROUP BY vote_audit_logs.platform` | `vote_audit_logs.platform` | text/breakdown |
| `poll_status` | Lifecycle state | `active` / `closed` / `finalized` from flags | `polls.is_active`, `end_date`, `is_finalized` | text |
| `poll_duration` | Voting window length | `end_date − start_date` | `polls` | duration |

**Time-series (opt-in, `?window`&`?bucket`):** votes bucketed hourly/daily via the existing
`DashboardService::getAdminMetrics()` grouped-query pattern (`app/Services/DashboardService.php:106`). Powers a
votes-over-time chart and derives `vote_velocity` / `peak_voting_window` in one query.

## 2. NOT feasible without new data (ceiling + upgrade path)

| Desired KPI | Why blocked | Upgrade path |
|---|---|---|
| **Drop-off / conversion rate** (viewed but didn't vote) | No impression/view tracking exists — only votes are recorded | Add a `poll_views` table (or impression counter) tracking `poll_id, user_id?, viewed_at`; then `1 − (voters / viewers)` |
| **Creator historical win-rate** | `LeaderboardService::getGlobalLeaderboard()` hardcodes `win_rate_percentage = 0` | Derive per-user wins from `winner_options` → `poll_results` → `polls.creator_id` history, or persist a running tally at finalize |
| **Bounce / session-level abstention** | No per-session poll-view linkage | Same as drop-off — requires a views/impressions source |

## Notes

- **Participation vs engagement:** the current `/reports/{poll}` reports `engagement_rate = total_votes / User::count()`
  and mislabels raw `total_votes` as `participation_rate`. The provider `participation_rate` above is the *real* rate
  (distinct voters / eligible users); keep the two distinct.
- **One-vote-per-user** is enforced in `VoteService::CastVote`, so `unique_voters ≈ total_votes` for most polls — but
  the DB unique key is `(poll_id, user_id, option_id)`, looser than the app rule, so compute `unique_voters` from
  `DISTINCT user_id` rather than assuming equality.
- **Perf:** velocity, peak-window, time-to-quorum and the time-series all sort/filter `votes` by time — add index
  `votes(poll_id, created_at)` before relying on them at scale (see architectural_decision.md §5).
