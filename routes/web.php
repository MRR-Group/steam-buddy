<?php

declare(strict_types=1);

use App\Http\Controllers\GameController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\LangController;
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
    Route::post("/invite/{user_id}/{game_id}", [InviteController::class, "send_invite"])->name("invite.send");
    Route::get("/invite", [InviteController::class, "show"])->name("invite.show");
    Route::patch("/invite/{id}", [InviteController::class, "update"])->name("invite.update");
    Route::delete("/invite/{id}", [InviteController::class, "remove"])->name("invite.remove");
});

Route::post("/lang/{locale}", [LangController::class, "set"])->name("lang.set");

require __DIR__ . "/auth.php";
require __DIR__ . "/steam.php";
require __DIR__ . "/api.php";
