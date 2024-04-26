<?php

declare(strict_types=1);

use App\Http\Controllers\LibraryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

Route::get("/", fn() => Redirect::route("library"));

Route::get("/library", [LibraryController::class, "show"])->middleware(["auth", "verified", "steam"])->name("library");

Route::middleware(["auth", "verified", "steam"])->group(function (): void {
    Route::get("/profile/edit", [ProfileController::class, "edit"])->name("profile.edit");
    Route::patch("/profile", [ProfileController::class, "update"])->name("profile.update");
    Route::get("/profile/{id}", [ProfileController::class, "show"])->name("profile.show");
});

require __DIR__ . "/auth.php";
require __DIR__ . "/steam.php";
