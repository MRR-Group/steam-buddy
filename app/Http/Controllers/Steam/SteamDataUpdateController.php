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

class SteamDataUpdateController extends Controller
{
    public function show(Request $request): Response
    {
        return Inertia::render("Steam/Update", ["status" => session("status"), "batch" => null]);
    }


    public function update(Request $request, SteamService $steam): Response
    {
        $user = $request->user();
        $batch = $steam->update_games($user);

        return Inertia::render("Steam/Update", [
            "batch" => $batch->id,
            "status" => session("status"),
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
