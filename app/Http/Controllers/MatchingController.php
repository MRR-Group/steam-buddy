<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\GameNotFoundException;
use App\Models\Game;
use App\Models\GameDetail;
use App\Models\User;
use App\Services\Matching\MatchingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatchingController extends Controller
{
    public function show(int $game_id, Request $request)
    {
        return redirect(route("profile.games.show", ["user_id" => $request->user()->id, "game_id" => $game_id]));
    }

    public function find(int $game_id, Request $request, MatchingService $matchingService)
    {
        $user = $request->user();

        /** @var Game $user_game */
        $user_game = Game::query()->where("id", "=", $game_id)->first();

        if ($user_game === null) {
            throw new GameNotFoundException();
        }

        $candidates = $matchingService->find_candidates($user_game);

        /** @var GameDetail $data */
        $data = $user_game->data;

        for ($i = 0; $i < count($candidates); $i++) {
            $mate = User::query()->where(["id" => $candidates[$i]["id"]])->first();
            $game = $candidates[$i]["game"];

            $achievements = $game->with_achievements();
            $similar_achievements = $game->similar_achievements($request->user(), $achievements);    

            $candidates[$i] = [
                "id" => $mate->id,
                "name" => $mate->name,
                "description" => $mate->description,
                "image" => $mate->image,
                "statistics" => [
                    "id" => $game->id,
                    "play_time" => $game->play_time,
                    "game_completion" => $game->game_completion($achievements),
                    "similar_achievements" => $similar_achievements,
                    "achievements" => $achievements,
                ],
            ];
        }

        /** @var Game $game */
        $game = Game::query()->where(["id" => $game_id])->first();

        return Inertia::render("Matching/Show", [
            "user" => [
                "id" => $user->id, 
                "email" => $user->email, 
                "name" => $user->name, 
                "description" => $user->description,
            ],
            "game" => [
                "id" => $game_id,
                "steam_id" => $data->steam_id,
                "name" => $data->name,
                "cover" => $data->cover,
                "description" => $data->description,
            ],
            "candidates" => $candidates,
        ]);
    }
}
