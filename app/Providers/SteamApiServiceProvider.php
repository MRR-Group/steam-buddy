<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\SteamApi\SteamApiService;
use Illuminate\Support\ServiceProvider;

class SteamApiServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(
            SteamApiService::class,
            fn() => new SteamApiService(
                config("services.steam.client_secret"),
            ),
        );
    }
}
