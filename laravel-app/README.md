# Polling Application - Setup Guide

A real-time polling platform built with Laravel 12, React 19, Inertia.js, and Pusher WebSockets. Features include poll creation/voting, real-time achievement notifications, user leaderboards, and comments.

---

## Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 18 & NPM
- SQLite (default) or MySQL/PostgreSQL
- Pusher account (for real-time WebSockets)

---

## 1. Application Setup

### Clone & Install

```bash
# Clone the repository
git clone <repo-url>
cd laravel-app

# Install PHP dependencies
composer install

# Install Node dependencies
npm install
```

### Environment Configuration

```bash
# Copy the example environment file
copy .env.example .env

# Generate the application key
php artisan key:generate
```

### Database Setup

The default configuration uses SQLite. Create the database file and run migrations:

```bash
# Create the SQLite database file (if it doesn't exist)
type nul > database\database.sqlite

# Run migrations
php artisan migrate

# (Optional) Seed the database with sample data
php artisan db:seed
```

To use MySQL/PostgreSQL instead, update `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Then re-run migrations:

```bash
php artisan migrate:fresh
```

### Build Frontend Assets

```bash
# For production
npm run build

# For development (with hot reload)
npm run dev
```

### Run the Application

```bash
php artisan serve
```

The app will be available at `http://localhost:8000`.

---

## 2. Queue Setup

The application uses a **database** queue driver to handle background jobs (e.g., achievement record creation, poll finalization).

### Configuration

In `.env`, the queue connection is set to `database` by default:

```env
QUEUE_CONNECTION=database
```

The required `jobs`, `job_batches`, and `failed_jobs` tables are created automatically by the migrations.

### Running the Queue Worker

You **must** run the queue worker for background jobs to be processed:

```bash
php artisan queue:listen --tries=1
```

Or to process a limited number of jobs:

```bash
php artisan queue:work --tries=3 --timeout=90
```

### Development Mode (All-in-One)

Use the composer `dev` script to run the server, queue worker, and Vite dev server concurrently:

```bash
composer dev
```

This runs:
- `php artisan serve` — Laravel development server
- `php artisan queue:listen --tries=1` — Queue worker
- `npm run dev` — Vite frontend bundler

### Failed Jobs

Check failed jobs:

```bash
php artisan queue:failed
```

Retry all failed jobs:

```bash
php artisan queue:retry all
```

Flush failed jobs:

```bash
php artisan queue:flush
```

---

## 3. WebSocket (Pusher) Setup

Real-time features (achievement unlock notifications) are powered by Pusher WebSockets.

### Pusher Account Setup

1. Sign up at [pusher.com](https://pusher.com) and create a new app
2. Note your app credentials: **Key**, **Secret**, **App ID**, and **Cluster**

### Backend Configuration

Add your Pusher credentials to `.env`:

```env
BROADCAST_CONNECTION=pusher

PUSHER_APP_ID=your-pusher-app-id
PUSHER_APP_KEY=your-pusher-key
PUSHER_APP_SECRET=your-pusher-secret
PUSHER_APP_CLUSTER=your-cluster
```

The Pusher PHP server package is already installed via Composer:

```bash
composer require pusher/pusher-php-server
```

### Frontend Configuration

The frontend Pusher credentials are automatically exposed from `.env` via Vite. Ensure these are set in `.env`:

```env
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

After changing Vite environment variables, restart the Vite dev server or rebuild:

```bash
npm run dev
# or
npm run build
```

### Channel Authorization

Private channels are authorized via the `/broadcasting/auth` endpoint. This is configured in:

- **Frontend**: `resources/js/pusher.ts` — Pusher client sends AJAX auth requests with CSRF token
- **Backend**: `routes/channels.php` — Authorizes `user.{id}` private channel so only the authenticated user can subscribe

### How It Works

1. **Backend**: When a user unlocks an achievement, the `AchievementUnlocked` event is dispatched
2. **Broadcasting**: The event implements `ShouldBroadcastNow` and broadcasts on `private-user.{userId}` channel
3. **Frontend**: The `AchievementListener` component (rendered in the app layout) subscribes to the user's private channel
4. **Notification**: When the event is received, a Sonner toast notification displays the achievement details (name, description, icon)

### Testing Without Pusher (Local Development)

If you don't have Pusher credentials, you can set the broadcast connection to `log` to log events instead:

```env
BROADCAST_CONNECTION=log
```

Events will be written to `storage/logs/laravel.log` instead of being broadcast over WebSockets.

---

## Quick Start (Development)

```bash
# 1. Install dependencies
composer install
npm install

# 2. Set up environment
copy .env.example .env
php artisan key:generate

# 3. Configure Pusher credentials in .env (see WebSocket section above)

# 4. Set up database
type nul > database\database.sqlite
php artisan migrate
php artisan db:seed

# 5. Run server, queue, and Vite concurrently
composer dev
```

Then open `http://localhost:8000` in your browser.

---

## Project Structure

| Area | Location |
|------|----------|
| Backend routes | `routes/web.php`, `routes/api.php` |
| Frontend pages | `resources/js/pages/` |
| Components | `resources/js/components/` |
| Layouts | `resources/js/layouts/` |
| Events | `app/Events/` |
| Services | `app/Services/` |
| Models | `app/Models/` |
| Migrations | `database/migrations/` |
| Pusher client | `resources/js/pusher.ts` |
| Achievement listener | `resources/js/components/achievement-listener.tsx` |
| Channel auth | `routes/channels.php` |
| Broadcasting config | `config/broadcasting.php` |
