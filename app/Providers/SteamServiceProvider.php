<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\Steam\SteamService;
use Illuminate\Support\ServiceProvider;

class SteamServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(
            SteamService::class,
            fn() => new SteamService(),
        );
    }
}
