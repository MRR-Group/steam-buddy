<?php

declare(strict_types=1);

use App\Http\Controllers\Steam\SteamConnectionController;
use App\Http\Controllers\Steam\SteamDataFetcherController;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth", "verified", "steam.unconnected"])->group(function (): void {
    Route::get("/steam/connect", [SteamConnectionController::class, "show"])->name("steam.connect");
    Route::get("/steam/redirect", [SteamConnectionController::class, "redirect"])->name("steam.redirect");
    Route::get("/steam/callback", [SteamConnectionController::class, "callback"])->name("steam.callback");
});

Route::middleware(["auth", "verified", "steam.connected"])->group(function (): void {
    Route::get("/steam/fetch", [SteamDataFetcherController::class, "show"])->name("steam.fetch");
});
