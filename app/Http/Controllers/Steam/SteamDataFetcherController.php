<?php

declare(strict_types=1);

namespace App\Http\Controllers\Steam;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SteamDataFetcherController extends Controller
{
    public function show(Request $request): Response
    {
        $name = $request->user()->name;

        return Inertia::render("Steam/Fetch", ["name" => $name, "status" => session("status")]);
    }
}
