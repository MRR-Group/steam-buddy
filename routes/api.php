<?php

declare(strict_types=1);

use App\Http\Controllers\Api\StatisticController;
use Illuminate\Support\Facades\Route;

Route::get("/api/statistics/users", [StatisticController::class, "users"]);
Route::get("/api/statistics/games", [StatisticController::class, "games"]);
