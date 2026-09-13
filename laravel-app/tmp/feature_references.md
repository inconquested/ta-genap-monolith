# Feature References — Application-Side Integration Spec

Generated: 2026-08-27. Audience: an agent implementing the **frontend/application side** of every reworked feature against this Laravel 11 backend (Inertia + React, already partially wired). Every contract below was verified against source. On any dispute, the backend file (cited) is truth.

Features covered:
1. Auth & API conventions
2. Reports (growth / integrity / health / per-poll) + dashboard + per-poll analytics — **admin desktop client**
3. Achievement types CRUD — **admin**
4. User achievements: self view, admin revoke/restore
5. Realtime achievement unlock (Pusher)
6. Database notifications (achievement_unlocked / achievement_revoked)
7. Implementation checklist + known limitations

---

## 0. Environment & Conventions

- Base URL: `http://localhost:8000/api` (dev).
- **Envelope** (all endpoints EXCEPT `GET /user/achievements` — see §4.1): `app/Concerns/ApiResponse.php:15`
  ```jsonc
  { "success": true, "message": "Success", "data": { ... }, "status": 200 }
  ```
  `status` is repeated in the body; HTTP status also matches (201 on create, 204 on delete, 401/403 on auth, 422 on validation).
- Validation errors → Laravel default `422` with `{ "message": "...", "errors": { "field": [ "..." ] } }`.
- Auth: `Authorization: Bearer <token>` (from `POST /api/login`) **plus** `Accept: application/json`. Admin-only routes additionally require the user's `role === ADMIN` (value 7) — enforced by the `admin` middleware, not by the client.
- Seeded admin (after running `MockReportingSeeder`): `admin123@mail.com` / `password123`.
- Route order matters for reports: literal `/health`, `/growth`, `/integrity` are declared before `/{poll}` — never build URLs where a report kind could be parsed as a poll id (`routes/api.php:31-36`).

---

## 1. Auth

| Endpoint | Method | Body | Notes |
|---|---|---|---|
| `/api/login` | POST | `{ email, password }` | Returns sanctum token. |
| `/api/logout` | POST | — | Invalidates token. |

Roles: `App\Enums\UserRole` — `ADMIN = 7`, users are everyone else. Admin gating is only on the route groups listed below; the client should still hide admin UI for non-admins.

---

## 2. Reports, Dashboard & Analytics (admin only — `auth:sanctum` + `admin`)

All routes in `routes/api.php:24-49`. Non-admin or missing token → `401`/`403` (`{success:false,...}` envelope).

### 2.1 Route map

| Route | Controller | Purpose |
|---|---|---|
| `GET /api/dashboard` | `DashboardController::metrics` | Admin KPI cards + chart + table, `?time_frame=` |
| `GET /api/dashboard/health` | `DashboardController::health` | Platform health (same as `/reports/health`) |
| `GET /api/reports/health` | `ReportController::health` | Platform health report |
| `GET /api/reports/growth` | `ReportController::growth` | Growth & activation report, **requires `from`+`to`** |
| `GET /api/reports/integrity` | `ReportController::integrity` | Abuse radar report, **requires `from`+`to`** |
| `GET /api/reports/{poll}` | `ReportController::index` | Per-poll end-user summary (poll UUID) |
| `GET /api/analytics/polls/{poll}` | `AnalyticsController::show` | Provider per-poll analytics |
| `GET /api/analytics/polls/{poll}/comments` | `AnalyticsController::comments` | Per-poll comment analytics |

### 2.2 Shared window params (growth + integrity only)

`ReportController::window()` (`app/Http/Controllers/ReportController.php:53`):

| Param | Required | Rules | Notes |
|---|---|---|---|
| `from` | yes | any `Carbon::parse()` date string | inclusive lower bound |
| `to` | yes | date, `after_or_equal:from` | inclusive upper bound |
| `bucket` | no | `hour` \| `day` \| `week` | auto if omitted: ≤48h→hour, ≤92d→day, else week; silently coarsened to keep ≤750 points — **read the effective value from `data.window.bucket`**, not from your request |
| `compare` | no | boolean-ish | when truthy, each metric gains a `delta` object and the response gains a `compare` (previous equal-length window) object |

**The API has NO presets** — the client must provide a date-range picker (calendar control), granularity selector, and compare toggle itself.

### 2.3 Growth report — `GET /api/reports/growth?from=...&to=...[&bucket=&compare=]`

`app/Services/Reports/GrowthReportService.php:16`. Response `data`:

```jsonc
{
  "report": "growth",
  "window":  { "from": "ISO8601", "to": "ISO8601", "bucket": "day" },
  "compare": null | { "from", "to", "bucket" },          // only when ?compare
  "generated_at": "ISO8601",
  "metrics": [ /* 7 metric objects, order below */ ],
  "funnel":  [ { "stage": "registered", "label": "Terdaftar", "count": 39, "pct": 100 },
               { "stage": "voted", ... }, { "stage": "commented", ... }, { "stage": "created_poll", ... } ],
  "series":  [ { "bucket": "2026-06-07", "new_users": 2, "active_voters": 5, "votes": 11 }, ... ]
}
```

- Metric keys in order: `new_users`, `active_voters`, `votes_cast`, `activation_rate`, `median_time_to_first_vote`, `returning_voters`, `retention_rate`.
- `series` is **dense and gap-filled** — every bucket between from/to appears, zeros included, ascending. Render directly as a chart; no client-side filling.
- `funnel.pct` is computed vs `registered` (100-based).

### 2.4 Integrity report — `GET /api/reports/integrity?from=...&to=...[&bucket=&compare=]`

`app/Services/Reports/IntegrityReportService.php:16`. Response `data`:

```jsonc
{
  "report": "integrity",
  "window":  { "from", "to", "bucket" },
  "compare": null | { ... },
  "generated_at": "ISO8601",
  "status": "ok" | "attention",   // attention when any shared-IP cluster (≥3 accounts/IP) exists
  "metrics": [ /* 9 metric objects */ ],
  "flagged_ips": [ { "ip": "203.0.113.99", "votes": 14, "distinct_users": 14, "suspicious": true }, ... ], // top 10 by users desc
  "series": [ { "bucket": "2026-06-07", "votes": 11 }, ... ]
}
```

- Metric keys in order: `votes_in_window`, `unique_voters`, `unique_ips`, `max_accounts_per_ip`, `shared_ip_clusters`, `off_hours_share`, `peak_burst`, `integrity_status`, `platform_split`.
- Drive a status banner from `status` / the `integrity_status` metric (`highlight: true` when ≠ ok).
- `flagged_ips` → table with a "suspicious" highlight when `suspicious === true`.

### 2.5 Metric object (shared shape)

`docs/reports-api.md:104`:

```jsonc
{
  "key": "activation_rate",
  "label": "Aktivasi 24 Jam",
  "value": 23.08,             // number | string | object (breakdown)
  "displayValue": "23%",      // pre-formatted, safe to render as-is
  "type": "number" | "percent" | "duration" | "text" | "breakdown",
  "unit": "%" | "menit" | null,
  "highlight": true | false,  // visual emphasis flag
  "delta": { "value": 5, "pct": 12.5, "direction": "up"|"down", "prior": 40 }  // only with ?compare
}
```

- `percent`: `value` is already ×100; render `displayValue`.
- `duration`: minutes, unit label `menit` (Indonesian).
- `breakdown` (e.g. `platform_split`): `value` is an object map name→count.

### 2.6 Platform health — `GET /api/reports/health` (or `/api/dashboard/health`)

`app/Services/DashboardService.php:160`, cached 30s server-side. `data`:

```jsonc
{
  "status": "ok" | "attention",     // attention when polls ended but not finalized
  "generated_at": "ISO8601",
  "active_users": 1,                 // sessions active last 5 min
  "votes_last_24h": 0,
  "totals":  { "users": 40, "polls": 20, "votes": 500, "comments": 120 },
  "polls":   { "active": 10, "finalized": 10, "pending_finalization": 0 }
}
```

### 2.7 Admin dashboard metrics — `GET /api/dashboard?time_frame=24h`

`app/Services/DashboardService.php:47`. `time_frame`: int 1..2160 with optional `h` suffix (hours, cap 90d; days cap 365d). `data`:

```jsonc
{
  "users_active": 0, "polls_created": 0, "votes_casted": 0,
  "chart_data": [ { /* bucket + counts */ } ],   // gap-filled, bucket hour if ≤24h else day
  "table_data": [ /* top-10 rows */ ]
}
```

### 2.8 Per-poll report — `GET /api/reports/{poll}` (end-user summary)

`app/Services/PollReportService.php:11`. `data`:

```jsonc
{ "title": "Poll title", "generated_at": "ISO8601",
  "metrics": [ { "key": "winner", "value": "Laravel", "type": "text", "highlight": true }, ... ] }
```

Always present: `total_votes`, `unique_voters`, `total_comments`, `unique_commenters`, `comment_engagement`. Conditional: `winner` (only when finalized with a result; `"Seri"` on draw), and opt-in query flags `?participation_rate=1` / `?engagement_rate=1` add those percent metrics. No `from`/`to`.

### 2.9 Per-poll analytics — `GET /api/analytics/polls/{poll}` (+ `/comments`)

`app/Services/PollAnalyticsService.php:17`. Optional `?bucket=hour|day` (auto: ≤48h→hour). Cached server-side (finalized polls 1h, else 30s). `data` = `{ poll, generated_at, metrics[], timeseries: { bucket, points } }` — metric keys include `participation_rate`, `unique_voters`, `total_votes`, conditional `turnout_vs_quorum`/`time_to_quorum`, `vote_velocity` (/jam), `peak_voting_window`, `finalization_latency`, `winner_margin`, `vote_concentration`, `options_utilized`, `comment_engagement`, `platform_split`, `poll_status`, `poll_duration`. Same metric-object shape as §2.5. Comment analytics analogous.

### 2.10 Report client implementation requirements

1. Date-range picker emitting `from`/`to` (no presets exist server-side).
2. Granularity selector for `bucket`; display the **effective** bucket from `data.window.bucket` (server may coarsen).
3. Compare toggle → `?compare=true`; render `metric.delta` arrows.
4. Growth: KPI grid from `metrics`, funnel chart from `funnel`, line/bar chart from `series` (3 series: `new_users`, `active_voters`, `votes`).
5. Integrity: status banner from `status`, flagged-IP table from `flagged_ips`, chart from `series` (`votes`).
6. Health: status pill + 4 stat cards (`active_users`, `votes_last_24h`, `totals`, `polls`).
7. Handle `422` (bad window), `401/403` (gate), poll `404`.
8. Seeding for demo data: `php artisan db:seed --class=MockReportingSeeder` (40 users, 20 polls, votes/audit/comments/results, deliberate integrity anomalies: shared-IP cluster at `203.0.113.66`, burst at `203.0.113.99`).

---

## 3. Achievement Types (CRUD — currently PUBLIC routes)

`routes/api.php:61` — `apiResource /achievement-types`, **no auth middleware** (see §8). Controller `app/Http/Controllers/AchievementTypeController.php`, service `app/Services/AchievementTypeService.php`.

| Route | Method | Notes |
|---|---|---|
| `/api/achievement-types` | GET | All types; `?search=` filters `code`/`label`/`description` (LIKE) |
| `/api/achievement-types` | POST | Create — multipart when icon attached |
| `/api/achievement-types/{achievement_type}` | GET | Single (UUID) |
| `/api/achievement-types/{achievement_type}` | PUT/PATCH | Update |
| `/api/achievement-types/{achievement_type}` | DELETE | Delete — **notifies all non-revoked holders** (§6.2), then cascades their rows |

### 3.1 Fields

Model `app/Models/AchievementType.php:12` — UUID PK. JSON always includes appended `icon_url` and `name` (= `label`, accessor `:31`; the DB column is `label`, `name` is an alias kept for frontend compatibility — **prefer reading `label` in new code, `name` still works**).

| Field | Rules (store) | Rules (update) |
|---|---|---|
| `code` | `required string min:2 max:16` | `sometimes string min:2 max:16` |
| `label` | `required string` | `sometimes string` |
| `description` | `required string` | `sometimes string` |
| `requirement_type` | `required string` | `sometimes string` |
| `requirement_value` | `required integer` | `sometimes integer` |
| `icon` (file) | `required image mimes:jpg,png,webp,jpeg max:2048` | `sometimes image ...` |

`requirement_type` domain (backend match, default false): `vote_count`, `poll_count`, `streak_days`, `popular_polls` (`app/Services/AchievementService.php:42`).

- `icon` upload: multipart form-data field `icon`. Stored via Spatie single-file collection `achievement_icon`; served at `icon_url`.
- `icon_url` falls back to a **hardcoded localhost URL** when no media exists (`app/Models/AchievementType.php:39`) — treat empty/failing icons gracefully.
- Store returns `201`; destroy returns `204`.

---

## 4. User Achievements

### 4.1 Self view — `GET /user/achievements` (`routes/api.php:20`)

**Raw JSON, NO ApiResponse envelope** (`app/Http/Controllers/UserAchievementController.php:14`). **Auth caveat**: route has no `auth:sanctum` middleware; `$req->user()` resolves via the web (session) guard — this works for logged-in Inertia requests, but pure Bearer-token API clients will get a null user error. Call it from the Inertia side (session cookie present).

Optional `?type=<achievement_type_id>` filters `earned`. Response:

```jsonc
{
  "earned": [ /* UserAchievement[]: id, user_id, achievement_type_id, progress_data{completed_at,current_value}, earned_at, revoked_at:null */ ],
  "types": [ /* AchievementType[] incl. icon_url, name */ ],
  "progress": [
    { "achievement": { /* AchievementType */ },
      "current": 3,          // vote_count/poll_count only; streak/popular always 0 (§8)
      "required": 10,
      "percentage": 30 }     // capped at 100
  ]
}
```

`earned` excludes revoked rows (`whereNull('revoked_at')`, `app/Services/AchievementService.php:190`). Client pattern: match `types` against `earned` to mark locked/unlocked; use `progress` for progress bars.

### 4.2 Admin revoke — `POST /api/user-achievements/{userAchievement}/revoke`

Admin-gated (`routes/api.php:39`). Body (JSON, optional): `{ "reason": "string max 255" }`. Envelope `success`, `data` = fresh row:

```jsonc
{ "id": "...", "user_id": "...", "achievement_type_id": "...",
  "earned_at": "...", "revoked_at": "2026-08-27T...", "revocation_reason": "..." }
```

Semantics (`app/Services/AchievementService.php:150`):
- Row is **kept**, `revoked_at` set → achievement hidden from `earned` AND the DB unique constraint blocks automatic re-award on the user's next vote/poll.
- User receives an `achievement_revoked` database notification (§6.2) immediately (sync).
- Calling revoke on an already-revoked row **updates the reason only** — no second notification. Use this for reason correction.
- Reason omitted → stored null; notification says revoked without a reason.

### 4.3 Admin restore — `POST /api/user-achievements/{userAchievement}/restore`

Admin-gated. No body. Nulls `revoked_at` + `revocation_reason`; achievement shows as earned again instantly. **No notification is sent on restore** — if the client wants the user informed, that's a deliberate backend gap (§8).

### 4.4 Client implementation requirements

1. Admin: user-achievement management view listing a user's earned achievements (from §4.1 or a joined view), with revoke action (reason textarea, optional) and restore action. Use the returned row's `revoked_at` to toggle the button.
2. Client must render `data.revoked_at`/`revocation_reason` from revoke/restore responses (envelope), but remember §4.1 is unenveloped — write two response handlers.
3. Wayfinder TS actions for revoke/restore are **not yet generated** — run `npm run build` (or dev) so `resources/js/actions/.../UserAchievementController.ts` picks them up, or call the URLs directly.

---

## 5. Realtime Achievement Unlock (Pusher)

**Pipeline**: vote/poll action → `UserActed` → `AchievementService::CheckAndAward` → `AchievementUnlocked` event → (a) Pusher broadcast on private channel, (b) DB row + database notification. Everything is **synchronous** — no queue worker needed; the toast and the notification appear within the same request that triggered them.

### 5.1 Backend event contract — `app/Events/AchievementUnlocked.php:13`

- Broadcast connection: **pusher** (real, cluster `ap1` — verified end-to-end).
- Channel: `private-user.{user_id}` (UUID). Authorization: `Broadcast::channel('user.{id}')` allows only the owner (`routes/channels.php:12`).
- Event name: `achievement.unlocked`.
- Payload:

```jsonc
{
  "user_id": "uuid",
  "achievement": {
    "id": "uuid", "code": "FIRST_VOTE", "name": "Pemula",
    "description": "...", "icon_url": "http://...", "requirement_value": 1
  }
}
```

### 5.2 Existing frontend wiring (reuse, do not rewrite)

- `resources/js/pusher.ts` — creates `window.Pusher` from `VITE_PUSHER_APP_KEY` / `VITE_PUSHER_APP_CLUSTER` (must be present in the frontend env), `forceTLS`, channel auth via `POST /broadcasting/auth` (ajax, `X-CSRF-TOKEN` from the `csrf-token` meta tag). Requires the user to be session-authenticated (Inertia) — channel auth uses the web guard.
- `resources/js/components/achievement-listener.tsx:34` — mounts in the authenticated layout; subscribes `private-user.{auth.user.id}`; on `achievement.unlocked` renders a sonner `toast.success` with the achievement name, description, and icon image; unsubscribes on unmount. **Requirement: import `resources/js/pusher.ts` once (app bootstrap) and render `<AchievementListener />` inside the authenticated layout, both with a valid session + CSRF meta tag.**
- Existing display components: `resources/js/components/ui/achievement-badge.tsx` (tier: `requirement_value ≥100` Gold / `≥50` Silver / else Bronze; grayscale when locked) and `resources/js/components/achievement-card.tsx` (progress bar from `percentage`).

### 5.3 What the client must still implement

1. Ensure the two mount points above actually exist in the app shell (verify; they may already be wired).
2. Achievements page: earn grid from §4.1 (`types` × `earned`) using the badge/card components, progress section from `progress[]`.
3. No polling needed — realtime arrives via Pusher; durable history via the notifications API (§6).

---

## 6. Database Notifications

Both types are `database` channel, Indonesian copy, scalars-only payloads (they survive deletion of the AchievementType row).

### 6.1 `achievement_unlocked` — `app/Notifications/AchievementNotification.php:12`

`data`:

```jsonc
{ "type": "achievement_unlocked",
  "message": "Selamat! Anda membuka pencapaian: \"Pemula\"",
  "achievement_id": "uuid",          // type may be deleted later — do not lazy-load it
  "action_url": "/dashboard", "icon": "Trophy" }
```

### 6.2 `achievement_revoked` — `app/Notifications/AchievementRevokedNotification.php:13`

Fired (a) on admin revoke (message includes the reason when present), (b) on AchievementType deletion for every non-revoked holder (message: "telah dihapus atau digantikan dan dihapus dari profil Anda"). `data`:

```jsonc
{ "type": "achievement_revoked",
  "message": "Pencapaian \"Pemula\" Anda telah dicabut oleh admin. Alasan: ...",
  "achievement_id": "uuid", "action_url": "/dashboard", "icon": "CircleSlash" }
```

### 6.3 Client implementation requirements

1. Notification bell/list should branch on `data.type` (`achievement_unlocked`, `achievement_revoked`, plus pre-existing poll types) and map `icon` names to lucide icons (`Trophy`, `CircleSlash`).
2. `achievement_id` may reference a deleted type — render from `message`, never join.
3. Push-based toast only exists for unlock (§5); revoked arrives via notification polling/refresh — consider refreshing the notification list on page focus.

---

## 7. Implementation Checklist (application side)

| # | Item | Sections |
|---|---|---|
| 1 | Admin auth flow + route guards for admin-only UI | §1 |
| 2 | Reports workspace: growth, integrity, health pages with date-range/bucket/compare controls | §2 |
| 3 | Admin dashboard metrics page (`?time_frame=`) | §2.7 |
| 4 | Per-poll report view (end-user) + per-poll analytics views (provider/admin) | §2.8–2.9 |
| 5 | Achievement type admin CRUD with icon upload + search | §3 |
| 6 | User achievements page: earned grid + progress | §4.1, §5.3 |
| 7 | Admin revoke/restore actions with reason dialog | §4.2–4.3 |
| 8 | Verify Pusher bootstrap + `AchievementListener` mounted; VITE_ env vars set | §5.2 |
| 9 | Notification bell rendering by `data.type` incl. revoked case | §6 |
| 10 | Run `npm run build`/dev once so Wayfinder generates TS actions for the new revoke/restore routes | §4.4 |
| 11 | Seed demo data: `php artisan db:seed --class=MockReportingSeeder` | §2.10 |

## 8. Known limitations (do not "fix" client-side; flag to backend)

1. **`/achievement-types` CRUD and `GET /user/achievements` have no auth middleware** (`routes/api.php:20,61`) — public as shipped. Client should still gate its UI; backend hardening is a separate ticket.
2. `GET /user/achievements` is unenveloped raw JSON and effectively session-only (§4.1) — two response shapes exist across the achievement feature.
3. Restore sends **no** user notification (§4.3).
4. Progress `current` is always 0 for `streak_days` / `popular_polls` types (`AchievementService.php:114`) — render those without a numeric progress bar or show indeterminate.
5. `icon_url` fallback is a hardcoded localhost asset (`AchievementType.php:39`).
6. Wayfinder actions for `growth`/`integrity` (and revoke/restore) are absent from the committed `resources/js/actions/` snapshot until the build regenerates them.
7. `routes/web.php:60` references a nonexistent `LeaderboardController` — `php artisan route:list` throws; unrelated to these features but don't be surprised by it.

---

*Verified against source 2026-08-27: `routes/api.php`, `app/Http/Controllers/{ReportController,UserAchievementController,AchievementTypeController,DashboardController}.php`, `app/Services/{AchievementService,AchievementTypeService,PollReportService,DashboardService,PollAnalyticsService}.php`, `app/Services/Reports/{GrowthReportService,IntegrityReportService,ReportWindow}.php`, `app/Events/AchievementUnlocked.php`, `app/Notifications/{AchievementNotification,AchievementRevokedNotification}.php`, `app/Models/AchievementType.php`, `routes/channels.php`, `resources/js/pusher.ts`, `resources/js/components/achievement-listener.tsx`, `database/migrations/2026_08_27_000001_add_revoked_at_to_user_achievements.php`, `docs/reports-api.md`.*
