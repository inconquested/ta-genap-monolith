# Reports API — Admin Desktop Client Rework Guide

Audience: the admin-only desktop client team. This documents the **reworked
`/api/reports/*` surface** so the client can be updated. The report feature is
now a set of **dynamic-window analytics** endpoints, not a single per-poll card.

> **Scope note:** Only `/reports/*` changed. `/dashboard`, `/dashboard/health`,
> and `/analytics/*` are **untouched** — do not re-point those.

---

## 1. Breaking changes (read first)

| Change | Before | After | Client action |
| --- | --- | --- | --- |
| `GET /api/reports/{poll}` auth | **Public** | **Admin-only** (`auth:sanctum` + `admin`) | Send the admin bearer token; expect `401/403` without it. |
| New endpoints | — | `/reports/growth`, `/reports/integrity` | Add two new report screens. |
| `/reports/health` | (existing) | Unchanged, now formally grouped under `reports` | None. |
| Window model | per-poll only | **dynamic `from`/`to` window** on growth & integrity | Add a date-range picker; **no presets** are provided by the API. |

All `/api/reports/*` routes require:

```
Authorization: Bearer <admin token>
Accept: application/json
```

A non-admin (or unauthenticated) caller receives the standard auth failure — the
client must treat these screens as admin-gated.

---

## 2. Endpoint catalogue

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/reports/health` | Platform healthcheck (unchanged). |
| GET | `/api/reports/growth` | **New.** Growth & Activation over a window. |
| GET | `/api/reports/integrity` | **New.** Integrity & Abuse radar over a window. |
| GET | `/api/reports/{poll}` | Per-poll report (now admin-gated). |

> Route ordering note (server-side, informational): literal segments
> (`health`, `growth`, `integrity`) are declared before `/{poll}`, so those
> words are **reserved** and cannot be used as a poll id in this namespace.

---

## 3. Shared query parameters (`growth` & `integrity`)

Both windowed reports take the **same** query string:

| Param | Type | Required | Notes |
| --- | --- | --- | --- |
| `from` | date/datetime string | **yes** | Any value `Carbon::parse()` accepts — `2026-06-01` or `2026-06-01T00:00:00+07:00`. Inclusive lower bound. |
| `to` | date/datetime string | **yes** | Must be **on or after** `from` (`after_or_equal:from`). Inclusive upper bound. |
| `bucket` | `hour` \| `day` \| `week` | no | Time-series granularity. Omit to let the server auto-pick from the range. |
| `compare` | boolean | no | When truthy, adds period-over-period deltas vs. the **equal-length window immediately before `from`**. |

### Bucket behaviour the client should mirror in its UI

- **Auto-select** (when `bucket` omitted): `≤ 48h → hour`, `≤ 92 days → day`, else `week`.
- **Safety coarsening:** the server caps a series at **750 points**. If the
  requested `bucket` would exceed that for the range, it is silently coarsened
  (e.g. `hour` → `day`). **Always read the effective bucket back from
  `data.window.bucket`** rather than assuming the one you sent.
- `week` buckets are **Monday-aligned** (ISO week; key is the Monday date).

### Validation errors

Missing/invalid params return Laravel's `422` with a `errors` map
(`from`, `to`, `bucket`, `compare`). Surface these against the range picker.

---

## 4. Response envelope

Every endpoint wraps its payload in the standard `ApiResponse` envelope:

```json
{
  "success": true,
  "message": "...",
  "data": { /* report body — shapes below */ },
  "status": 200
}
```

The client reads `data`. All shapes below are the contents of `data`.

### 4.1 `window` object (present on growth & integrity)

```json
{ "from": "2026-06-07T00:00:00+07:00", "to": "2026-08-07T00:00:00+07:00", "bucket": "day" }
```

`bucket` here is the **effective** bucket (post auto-select / coarsening).

### 4.2 `compare` object

- `null` when `compare` was falsy.
- Otherwise the prior window as a `window` object (`{from,to,bucket}`), so the UI
  can label "vs. Jun 7 – Aug 7".

### 4.3 `metric` object (array items in `metrics[]`)

```json
{
  "key": "activation_rate",
  "label": "Aktivasi 24 Jam",
  "value": 23.08,
  "type": "percent",
  "unit": "%",
  "displayValue": "23%",
  "highlight": true,
  "delta": { "value": 5, "pct": 12.5, "direction": "up", "prior": 40 }
}
```

| Field | Meaning |
| --- | --- |
| `key` | Stable machine id — key your UI off this, not `label`. |
| `label` | Human label (Indonesian). |
| `value` | Raw numeric/text/breakdown value (see `type`). |
| `type` | `number` \| `percent` \| `duration` \| `text` \| `breakdown`. Drives rendering. |
| `unit` | Optional unit suffix (`%`, `menit`). |
| `displayValue` | Optional pre-formatted string; prefer it when present. |
| `highlight` | Optional; render emphasized when `true`. |
| `delta` | **Only present when `compare=true`.** See below. |

**`delta`** — `value` = current − prior (absolute); `pct` = percent change (or
`null` when prior was 0, i.e. "no baseline"); `direction` = `up`\|`down`\|`flat`;
`prior` = the prior window's raw value.

**`type` rendering hints**
- `number` → integer.
- `percent` → `value` is already a percent (e.g. `23.08` = 23.08%); prefer `displayValue`.
- `duration` → `value` is **minutes** (`unit: "menit"`).
- `text` → `value` is a short string (e.g. `"ok"` / `"attention"`).
- `breakdown` → `value` is an **object** `{ label: count }` (render as a mini bar/pie).

### 4.4 `series[]`

Dense, gap-filled, ascending. Each point has `bucket` plus one integer field per
tracked measure. Empty buckets are emitted as `0` (no holes). Example (growth):

```json
[
  { "bucket": "2026-06-07", "new_users": 2, "active_voters": 5, "votes": 11 },
  { "bucket": "2026-06-08", "new_users": 0, "active_voters": 3, "votes": 7 }
]
```

`bucket` key format: `hour` → `"YYYY-MM-DD HH:00:00"`, `day`/`week` → `"YYYY-MM-DD"`.

---

## 5. `GET /api/reports/growth` — payload

```jsonc
{
  "report": "growth",
  "window":  { "from": "...", "to": "...", "bucket": "day" },
  "compare": null,                       // or a prior-window object
  "generated_at": "2026-08-07T12:00:00+07:00",
  "metrics": [ /* metric objects, see keys below */ ],
  "funnel":  [ /* funnel rows */ ],
  "series":  [ /* points: bucket + new_users + active_voters + votes */ ]
}
```

### Metric keys (in order)

| `key` | `type` | Meaning |
| --- | --- | --- |
| `new_users` | number | Non-admin signups with `created_at` in window. Has `delta` under compare. |
| `active_voters` | number | Distinct users who voted in window. Has `delta`. |
| `votes_cast` | number | Votes with `voted_at` in window. Has `delta`. |
| `activation_rate` | percent | % of the window's signup cohort that cast a first vote within **24h**. `highlight: true`. |
| `median_time_to_first_vote` | duration | Median minutes from signup → first vote, for the window's cohort. |
| `returning_voters` | number | Distinct users who voted in **both** this window and the prior equal window. |
| `retention_rate` | percent | `returning_voters` ÷ prior window's voter base. `0` when there is no prior activity. |

> Note: `returning_voters`/`retention_rate` compare against the immediately
> prior equal-length window **regardless** of the `compare` flag (they are
> intrinsically period-over-period). If your range has no earlier data, both are
> `0` — that is correct, not an error.

### `funnel[]` — signup-cohort progression

Ordered stages for users who **registered in the window**:

```json
[
  { "stage": "registered",   "label": "Terdaftar",    "count": 39, "pct": 100.0 },
  { "stage": "voted",        "label": "Memilih",      "count": 39, "pct": 100.0 },
  { "stage": "commented",    "label": "Berkomentar",  "count": 38, "pct": 97.44 },
  { "stage": "created_poll", "label": "Membuat Poll", "count": 18, "pct": 46.15 }
]
```

`pct` is relative to `registered`. Render as a descending funnel.

---

## 6. `GET /api/reports/integrity` — payload

```jsonc
{
  "report": "integrity",
  "window":  { "from": "...", "to": "...", "bucket": "day" },
  "compare": null,
  "generated_at": "2026-08-07T12:00:00+07:00",
  "status": "attention",                 // "ok" | "attention" — top-level banner
  "metrics": [ /* metric objects */ ],
  "flagged_ips": [ /* top IPs by fan-out */ ],
  "series":  [ /* points: bucket + votes */ ]
}
```

Data source: `vote_audit_logs` (IP, platform, user-agent, timing) for
`action = created` rows in the window. **By design the app blocks re-votes, so
only `created` rows exist — there is no vote-flip/vote-change signal**; do not
build UI expecting edit/delete audit actions here.

### Top-level `status`

`"attention"` when any shared-IP cluster exists or `max_accounts_per_ip ≥ 3`,
else `"ok"`. Drive a red/green banner off this (also mirrored in the
`integrity_status` metric).

### Metric keys (in order)

| `key` | `type` | Meaning |
| --- | --- | --- |
| `votes_in_window` | number | Audited votes in window. Has `delta` under compare. |
| `unique_voters` | number | Distinct `performed_by_user_id`. |
| `unique_ips` | number | Distinct `performed_by_user_ip`. |
| `max_accounts_per_ip` | number | Largest # of distinct accounts behind one IP. `highlight` when `≥ 3`. |
| `shared_ip_clusters` | number | Count of IPs with `≥ 3` distinct accounts. |
| `off_hours_share` | percent | % of votes struck before **05:00** local. `displayValue` e.g. `"22%"`. |
| `peak_burst` | number | Busiest single minute; `value` = count, `displayValue` = `"9 @ 2026-08-01 02:03:00"`. |
| `integrity_status` | text | `"ok"` / `"attention"` (mirrors top-level `status`). |
| `platform_split` | breakdown | `{ "Windows": 96, "Android": 94, ... }` — votes per client platform. |

### `flagged_ips[]` — top 10 IPs by distinct-account fan-out

```json
[
  { "ip": "203.0.113.99", "votes": 14, "distinct_users": 14, "suspicious": true },
  { "ip": "203.0.113.66", "votes": 63, "distinct_users": 6,  "suspicious": true },
  { "ip": "198.51.100.10","votes": 15, "distinct_users": 1,  "suspicious": false }
]
```

`suspicious = distinct_users ≥ 3`. Render suspicious rows emphasized; a single
IP behind many **distinct** accounts is the primary multi-account signal.

---

## 7. Per-poll report — `GET /api/reports/{poll}`

Payload shape is **unchanged** from before; only the auth changed (now
admin-gated). `{poll}` is a poll id/uuid. Keep the existing per-poll screen, just
route its request through the admin token.

---

## 8. Client migration checklist

1. Attach the admin bearer token to **all** `/reports/*` calls (including the
   previously-public `/reports/{poll}`).
2. Add a **`from`/`to` date-range picker** (no preset buttons — the API has none;
   presets, if wanted, are a pure client convenience that just compute two dates).
3. Optional **granularity selector** (`hour`/`day`/`week`) → `bucket`; default to
   "auto" (omit the param). Always re-read `data.window.bucket` for labels.
4. Optional **"compare to previous period"** toggle → `compare=true`; when on,
   render `delta` chips on metrics and the `compare` window label.
5. Build two screens keyed off `metrics[].key` / `funnel[].stage` /
   `flagged_ips[]`:
   - **Growth & Activation** (`/reports/growth`).
   - **Integrity & Abuse radar** (`/reports/integrity`) with the `status` banner.
6. Handle `422` validation errors against the range picker; handle `401/403` by
   sending the user back to admin auth.

---

## 9. Not implemented (backlog)

Per product direction, **end users cannot self-serve their poll metrics**. A user
who wants metrics for their own poll is expected to **open a support ticket**;
that ticket workflow is **not built yet** and is intentionally out of scope for
this rework. No user-facing export/delivery exists.
