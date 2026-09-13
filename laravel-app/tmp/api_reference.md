# API Reference — Poll Reports & Analytics

Client-side reference for the Report data service. Two surfaces:

| Audience | Endpoint | Auth |
|---|---|---|
| End user | `GET /api/reports/{poll}` | none (current behavior) |
| Provider | `GET /api/analytics/polls/{poll}` | Sanctum token + **admin** |
| Provider | `GET /api/dashboard/health` · `GET /api/reports/health` | Sanctum token + **admin** |

All responses use the shared envelope:

```jsonc
{ "success": true, "message": "Success", "data": { … }, "status": 200 }
```

> Note: the HTTP status is `200` on success; the real code is in the body `status` field
> (existing app convention). The admin gate is the exception — it returns HTTP **403**.

Every metric in `data.metrics[]` uses one normalized shape:

```jsonc
{
  "key": "participation_rate",   // machine id (stable)
  "label": "Partisipasi",        // human label (Indonesian)
  "value": 62.5,                  // raw value — ALWAYS present
  "displayValue": "63%",         // formatted for UI — optional
  "type": "percent",             // "text" | "number" | "percent" | "duration" | "breakdown"
  "unit": "%",                    // optional
  "highlight": true               // optional
}
```

---

## 1. End-user report — `GET /api/reports/{poll}`

Their poll's result summary. **Unchanged** by this redesign.

Query params (optional flags, presence toggles the metric):
- `?participation_rate` — include the participation metric.
- `?engagement_rate` — include the engagement metric.

```jsonc
// GET /api/reports/{poll}?participation_rate&engagement_rate
{
  "success": true, "message": "Success", "status": 200,
  "data": {
    "title": "Best framework 2026",
    "generated_at": "2026-07-16T09:00:00+00:00",
    "metrics": [
      { "key": "winner", "label": "Pemenang", "value": "Laravel", "type": "text" },
      { "key": "participation_rate", "label": "Partisipasi", "value": "1200.00", "type": "number" },
      { "key": "engagement_rate", "label": "Engagement", "displayValue": "34%", "type": "percent", "highlight": true }
    ]
  }
}
```

---

## 2. Provider analytics — `GET /api/analytics/polls/{poll}`

Deep per-poll KPIs. **Admin only.**

**Auth:** send a Sanctum bearer token (obtain via `POST /api/login`). The token's user must have
the `admin` role, else `403`:

```
Authorization: Bearer <token>
```

Query params:
- `?bucket=hour|day` — time-series bucket. Optional; auto-selects `hour` for polls ≤ 48h, else `day`.

```jsonc
// GET /api/analytics/polls/{poll}?bucket=hour
{
  "success": true, "message": "Success", "status": 200,
  "data": {
    "poll": {
      "id": "9b2c…", "title": "Best framework 2026",
      "status": "finalized",                 // active | closed | finalized
      "start_date": "2026-07-14T00:00:00+00:00",
      "end_date":   "2026-07-16T00:00:00+00:00",
      "duration_minutes": 2880
    },
    "generated_at": "2026-07-16T09:00:00+00:00",
    "metrics": [
      { "key": "participation_rate",   "label": "Partisipasi",           "value": 62.5, "displayValue": "63%",  "type": "percent",  "unit": "%" },
      { "key": "unique_voters",        "label": "Pemilih Unik",          "value": 1200, "type": "number" },
      { "key": "total_votes",          "label": "Total Suara",           "value": 1200, "type": "number" },
      { "key": "turnout_vs_quorum",    "label": "Turnout vs Kuorum",     "value": 240.0,"displayValue": "240%", "type": "percent",  "unit": "%", "highlight": true },
      { "key": "time_to_quorum",       "label": "Waktu Capai Kuorum",    "value": 45,   "type": "duration", "unit": "menit" },
      { "key": "vote_velocity",        "label": "Kecepatan Suara",       "value": 25.0, "displayValue": "25/jam", "type": "number", "unit": "/jam" },
      { "key": "peak_voting_window",   "label": "Puncak Aktivitas",      "value": "2026-07-15 20:00:00", "type": "text" },
      { "key": "finalization_latency", "label": "Jeda Finalisasi",       "value": 12,   "type": "duration", "unit": "menit" },
      { "key": "winner_margin",        "label": "Selisih Pemenang",      "value": 18.3, "displayValue": "18%",  "type": "percent", "unit": "%" },
      { "key": "vote_concentration",   "label": "Konsentrasi Suara",     "value": 44.1, "displayValue": "44%",  "type": "percent", "unit": "%" },
      { "key": "options_utilized",     "label": "Opsi Terpakai",         "value": 100.0,"displayValue": "4/4",  "type": "percent", "unit": "%" },
      { "key": "comment_engagement",   "label": "Keterlibatan Komentar", "value": 0.12, "type": "number" },
      { "key": "platform_split",       "label": "Distribusi Platform",   "value": { "web": 900, "android": 300 }, "type": "breakdown" },
      { "key": "poll_status",          "label": "Status",                "value": "finalized", "type": "text" },
      { "key": "poll_duration",        "label": "Durasi",                "value": 2880, "type": "duration", "unit": "menit" }
    ],
    "timeseries": {
      "bucket": "hour",
      "points": [
        { "bucket": "2026-07-14 00:00:00", "votes": 40 },
        { "bucket": "2026-07-14 01:00:00", "votes": 55 }
      ]
    }
  }
}
```

Conditional metrics (may be absent):
- `turnout_vs_quorum`, `time_to_quorum` — only when the poll has a quorum (`allow_quorum` + `quorum_count`); `time_to_quorum` only if the quorum was actually reached.
- `finalization_latency` — only when the poll is finalized.
- `peak_voting_window` — only when there is at least one vote.

`403` (not admin):

```jsonc
{ "success": false, "message": "Forbidden", "errors": "Admin access required", "status": 403 }
```

Notes for clients:
- `value` is machine-readable (numbers stay numbers); render `displayValue` when present, else format `value` + `unit`.
- `platform_split.value` is an object keyed by platform → count.
- Finalized polls are cached ~1h server-side; live polls ~30s. Expect brief staleness on active polls.

> KPIs not yet available (need new tracking): view→vote **drop-off/conversion** and creator **win-rate**.
> See `tmp/kpi_matrix.md` §2.

---

## 3. Platform healthcheck — `GET /api/dashboard/health` · `GET /api/reports/health`

Application-level health signals for the provider. **Both endpoints return the same payload** (exposed on the
dashboard and report surfaces); pick whichever fits the caller. **Admin only.**

> This is a health *metrics* report, not a liveness probe — for "is the app up?" use Laravel's native `GET /up`.

**Auth:** Sanctum bearer token whose user has the `admin` role; else `403` (same shape as §2).

No query params.

```jsonc
// GET /api/dashboard/health   (identical for /api/reports/health)
{
  "success": true, "message": "Success", "status": 200,
  "data": {
    "status": "ok",                       // "ok" | "attention" (attention = polls ended but not finalized)
    "generated_at": "2026-07-16T19:46:58+07:00",
    "active_users": 1,                    // sessions active in the last 5 minutes
    "votes_last_24h": 0,
    "totals": {
      "users": 4,
      "polls": 2,
      "votes": 1,
      "comments": 0
    },
    "polls": {
      "active": 2,
      "finalized": 2,
      "pending_finalization": 0           // ended but not finalized — drives data.status
    }
  }
}
```

Notes for clients:
- `data.status` is the at-a-glance signal: `attention` means `polls.pending_finalization > 0` (the finalization
  flow is behind); `ok` otherwise.
- `active_users` counts recent sessions (last 5 min), not registered users — `totals.users` is the registered count.
