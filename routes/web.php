<?php

declare(strict_types=1);

use App\Http\Controllers\GameController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\MatchingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

Route::get("/", fn() => Redirect::route("library"));

Route::get("/library", [LibraryController::class, "show"])->middleware(["auth", "verified", "steam"])->name("library");

Route::middleware(["auth", "verified", "steam"])->group(function (): void {
    Route::get("/profile/edit", [ProfileController::class, "edit"])->name("profile.edit");
    Route::patch("/profile", [ProfileController::class, "update"])->name("profile.update");
    Route::get("/profile/{id}", [ProfileController::class, "show"])->name("profile.show");
    Route::get("/profile/{user_id}/games/{game_id}", [GameController::class, "show"])->name("profile.games.show");
    Route::get("/match/{game_id}", [MatchingController::class, "show"]);
    Route::post("/match/{game_id}", [MatchingController::class, "find"])->name("match.find");
});

require __DIR__ . "/auth.php";
require __DIR__ . "/steam.php";
