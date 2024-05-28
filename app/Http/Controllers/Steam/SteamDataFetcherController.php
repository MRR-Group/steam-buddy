<?php

declare(strict_types=1);

namespace App\Http\Controllers\Steam;

use App\Http\Controllers\Controller;
use App\Services\Steam\SteamService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Inertia\Inertia;
use Inertia\Response;

class SteamDataFetcherController extends Controller
{
    public function show(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render("Steam/Fetch", ["name" => $user->name, "status" => session("status")]);
    }

    public function fetch(Request $request, SteamService $steam): Response
    {
        $user = $request->user();
        $batch = $steam->fetch_games($user);

        return Inertia::render("Steam/Fetch", [
            "name" => $user->name,
            "batch" => $batch->id,
        ]);
    }

    public function progress(Request $request): JsonResponse
    {
        $batch = Bus::findBatch($request->batch);

        if ($batch === null) {
            return \response()->json([
                "message" => "Batch not found",
            ], 404);
        }

        if ($batch->cancelled()) {
            return \response()->json([
                "message" => "There was an error, please try again latter.",
            ], 500);
        }

        return \response()->json([
            "all" => $batch->totalJobs,
            "done" => $batch->processedJobs(),
        ]);
    }
}
