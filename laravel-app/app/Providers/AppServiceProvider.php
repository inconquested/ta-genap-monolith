<?php

namespace App\Providers;

use App\Events\AchievementUnlocked;
use App\Events\UserActed;
use App\Listeners\CreateUserAchievementRecord;
use App\Services\AchievementService;
use Carbon\CarbonImmutable;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen(UserActed::class, function (UserActed $event) {
            app(AchievementService::class)->CheckAndAward($event->user);
        });

        $this->configureDefaults();
        RateLimiter::for('strict-api', function (Request $req) {
            return Limit::perMinute(60)
                ->by($req->user()->id ?? $req->ip())
                ->response(function (Request $req, array $headers) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Too Many Requests'
                    ], 429, $headers);
                });
        });
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn(): ?Password => app()->isProduction()
                ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
                : null
        );
    }
}
