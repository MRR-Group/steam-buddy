<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\Matching\MatchingService;
use Illuminate\Support\ServiceProvider;

class MatchingServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(
            MatchingService::class,
            fn() => new MatchingService(),
        );
    }
}
