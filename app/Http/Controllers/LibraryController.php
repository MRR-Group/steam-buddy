<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LibraryController extends Controller
{
    public function show(Request $request) {
        /** @var User $user */ 
        $user = $request->user();
        $games = [];

        foreach ($user->games()->get() as $game) {
            array_push($games, $game->full());
        }

        return Inertia::render("Library", [
            "games" => $games,
            "status" => session("status"),
        ]);
    }
}
