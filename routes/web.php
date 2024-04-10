<?php

declare(strict_types=1);

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", fn() => Redirect::route("library"));

Route::get("/library", fn() => Inertia::render("Library"))->middleware(["auth", "verified", "steam"])->name("library");

Route::middleware(["auth", "verified", "steam"])->group(function (): void {
    Route::get("/profile", [ProfileController::class, "edit"])->name("profile.edit");
    Route::patch("/profile", [ProfileController::class, "update"])->name("profile.update");
    Route::delete("/profile", [ProfileController::class, "destroy"])->name("profile.destroy");
});

require __DIR__ . "/auth.php";
require __DIR__ . "/steam.php";
