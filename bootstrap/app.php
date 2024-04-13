<?php

declare(strict_types=1);

use App\Http\Middleware\EnsureProfileDataAreFetched;
use App\Http\Middleware\EnsureSteamIsConnected;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RedirectIfConnectedToSteam;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Middleware\TrustProxies;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . "/../routes/web.php",
        commands: __DIR__ . "/../routes/console.php",
        health: "/up",
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->replace(
            TrustProxies::class,
            Monicahq\Cloudflare\Http\Middleware\TrustProxies::class,
        );

        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            "steam.fetched" => EnsureProfileDataAreFetched::class,
            "steam.connected" => EnsureSteamIsConnected::class,
            "steam.unconnected" => RedirectIfConnectedToSteam::class,
        ]);

        $middleware->appendToGroup("steam", [
            EnsureSteamIsConnected::class,
            // EnsureProfileDataAreFetched::class, TO-DO uncomment this line when fetching functionality will be ready
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
    })->create();
