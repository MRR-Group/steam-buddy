<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class GameController extends Controller
{
    public function show(string $user_id, string $game_id, Request $request)
    {
        /** @var User $user */
        $user = User::query()->where(["id" => $user_id])->first();

        if ($user === null) {
            throw new NotFoundHttpException();
        }

        $is_owner = $user->id === $request->user()->id;

        /** @var Game $game */
        $game = Game::query()->where(["id" => $game_id])->first();

        /** @var GameDetail $data */
        $data = $game->data;

        $achievements = $game->json_achievements();
        $similar_achievements = $is_owner ? null : $game->similar_achievements($request->user(), $achievements);

        return Inertia::render("Game/Show", [
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
            ],
            "game" => [
                "name" => $data->name,
                "description" => $data->description,
                "cover" => $data->cover,
                "id" => $game->id,
                "tags" => $game->tags_name(),
                "play_time" => $game->play_time,
                "game_completion" => $game->game_completion($achievements),
                "similar_achievements" => $similar_achievements,
                "achievements" => $achievements,
            ],
            "is_owner" => $is_owner,
        ]);
    }
}
