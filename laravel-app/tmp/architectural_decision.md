# Architectural Decision: Report → Dual-Purpose Data Service

**Endpoint:** `GET /api/reports/{poll}` (today) → split into an end-user report + a provider analytics surface
**Status:** Proposed
**Scope:** Design only. No code in this document.

---

## 1. Current state (verified in code)

| Concern | Where | Reality |
|---|---|---|
| Route | `routes/api.php:23` | `Route::get('/reports/{poll}', [ReportController::class, 'index'])` — **no name, no middleware** |
| Controller | `app/Http/Controllers/ReportController.php:15` | Thin; delegates to the service, wraps in `ApiResponse::success()` |
| Logic | `app/Services/PollReportService.php:11` | `generatePollReport($req, $poll)` |
| Envelope | `app/Concerns/ApiResponse.php:15` | `{ success, message, data, status }` — HTTP stays `200`, real code is in body `status` |

Current `data` payload:

```jsonc
{
  "title": "…",
  "generated_at": "2026-07-16T…Z",
  "metrics": [ /* conditionally populated */ ]
}
```

`metrics[]` today:
- `winner` — from `poll_results` + `winner_options` (only if a result exists).
- `participation_rate` — **misnamed**: it is the raw `total_votes`, not a rate. Added only if `?participation_rate` present.
- `engagement_rate` — `round(total_votes / User::count() * 100) . '%'`. Added only if `?engagement_rate` present.

**Two honest facts the TASK premise gets wrong** (the redesign must not inherit the myth):
1. There is **no authorization** — no policy, no `auth` middleware. Any caller can report on any poll.
2. There is **no "poll concluded" guard**. `Poll::isClosed()` exists (`app/Models/Poll.php:85`) but the report never calls it — reports already work on active polls.

Item-schema inconsistency: some items use `value`, others `displayValue`. This must be normalized (below).

---

## 2. Decision

Split the two audiences into **two distinct surfaces**, preserving the existing one:

| Audience | Endpoint | Auth | Purpose |
|---|---|---|---|
| **End user** | `GET /api/reports/{poll}` *(preserved)* | current behavior | Their poll's results & performance |
| **Service provider** | `GET /api/analytics/polls/{poll}` *(new)* | `auth:sanctum` + `UserRole::ADMIN` | Per-poll KPIs / engagement / health |
| **Platform (existing)** | `GET /api/dashboard` *(reuse)* | admin *(to be gated)* | Platform-wide metrics — already `DashboardService::getAdminMetrics()` |

**Why a separate `/api/analytics/...` namespace** (not a `?scope=provider` flag, not a `/reports/{poll}/analytics` sub-resource):
- **Authorization is cleaner at the namespace boundary** — the whole `analytics` group carries `auth:sanctum` + admin; the end-user `reports` route is untouched. One flag on one endpoint would mix two trust levels in one route.
- **The two payloads are genuinely different resources**, not two shapes of one. A namespace signals that; a query flag hides it.
- **Room to grow** — `GET /api/analytics/overview` is the natural future home if the platform metrics ever migrate off `/api/dashboard`. Not built now (YAGNI); `/api/dashboard` stays the platform surface.

Rejected alternatives, in one line each:
- **`?scope=provider` on `/reports/{poll}`** — fewer routes, but couples end-user and admin authz into one endpoint and one payload. No.
- **`/reports/{poll}/analytics` sub-resource** — reasonable, but nests an admin resource under a public one; the namespace split keeps trust levels physically separated.

---

## 3. Schema & payload

**Adhere to the existing pattern.** Both surfaces keep the `ApiResponse` envelope and a `metrics[]` array. The **only** contract change is normalizing each metric item to one consistent shape (applies to both endpoints):

```jsonc
{
  "key":        "participation_rate",   // machine id
  "label":      "Partisipasi",          // human label (Indonesian, per app convention)
  "value":      0.62,                    // raw/machine value — ALWAYS present
  "displayValue": "62%",                 // formatted for UI — optional
  "type":       "percent",               // "text" | "number" | "percent" | "duration"
  "unit":       "%",                      // optional
  "highlight":  true                      // optional
}
```

> Normalizing `value`/`displayValue` on the **existing** `/reports/{poll}` too is additive and non-breaking — recommended, not required.

**Provider response** — `GET /api/analytics/polls/{poll}` (same envelope):

```jsonc
{
  "success": true,
  "message": "Success",
  "status": 200,
  "data": {
    "poll": {
      "id": "…", "title": "…",
      "status": "active|closed|finalized",
      "start_date": "…", "end_date": "…",
      "duration_minutes": 4320
    },
    "generated_at": "2026-07-16T…Z",
    "metrics": [ /* provider KPI items, normalized schema — see kpi_matrix.md */ ],

    // optional time-series, opt-in via ?window=24h&bucket=hour
    "timeseries": {
      "bucket": "hour",
      "points": [ { "bucket": "2026-07-16 09:00", "votes": 12 }, … ]
    }
  }
}
```

`?window` / `?bucket` reuse the exact `DATE_FORMAT(created_at, …) … groupBy('bucket')` approach already in
`DashboardService::getAdminMetrics()` (`app/Services/DashboardService.php:106`) — one grouped query, no new pattern.

Validation follows the app convention: a `FormRequest` under `app/Http/Requests/Analytics/` with `rules()` for
`window`/`bucket` and Indonesian `messages()`.

---

## 4. Authorization

The provider surface is the first place this app enforces a role. Minimal, using what exists:

- Route group: `Route::middleware(['auth:sanctum', 'admin'])->prefix('analytics')->group(...)`.
- `admin` = a tiny middleware (or `Gate`) checking `$request->user()?->role === UserRole::ADMIN`
  (`app/Enums/UserRole.php`, ADMIN=7 — cast on `User` but currently enforced nowhere).

End-user `/reports/{poll}` behavior is unchanged in this design. *Separately worth raising with the team:* it is
currently unauthenticated — but that is pre-existing and out of scope for this redesign.

---

## 5. Implementation notes (performance)

- **Index `votes(poll_id, created_at)`.** Velocity, peak-window, time-to-quorum and the `timeseries` bucket all
  filter+sort votes by time; `votes.created_at`/`voted_at` are **currently unindexed** (`2026_01_18_000003`) → full
  scans as vote volume grows. This is the one schema change worth doing when the feature is built.
- **Reuse precomputed aggregates.** Winner, draw, and `total_votes` are persisted in `poll_results` at
  `finalizePoll()` (`app/Services/PollService.php:189`). Read them; do not recompute per request.
- **No N+1.** Per-option counts via `withCount('votes')`; time buckets via a single grouped query. Never loop rows in PHP.
- **Cache finalized polls.** Once `is_finalized`, a poll's analytics are immutable → `Cache::remember` keyed by
  `poll:{id}:analytics:{updated_at}`. Live polls: short TTL (e.g. 30–60s) or no cache. `User::count()` (the
  participation denominator) is likewise cacheable.
- **Prefer `voted_at` for velocity** (business event time) over `created_at` (row insert), but index whichever the
  queries use consistently.

---

## 6. Compatibility

- End-user `GET /api/reports/{poll}`: **contract preserved.** Recommended (optional) additive fix: normalize
  `value`/`displayValue`.
- No breaking change to any existing endpoint. New surface is purely additive behind admin auth.
- Frontend: after routes are added (in the build phase), Wayfinder regenerates the `.ts` action files via
  `npm run dev`/`build` — not automatic at PHP runtime.
