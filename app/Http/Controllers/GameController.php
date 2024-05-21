<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class GameController extends Controller
{
    public function show(string $user_id, string $game_id)
    {
        /** @var User $user */
        $user = User::query()->where(["id" => $user_id])->first();

        if ($user === null) {
            throw new NotFoundHttpException();
        }

        $game = Game::query()->where(["id" => $game_id, "user_id" => $user_id])->first();

        /** @var GameDetail $data */
        $data = $game->data;

        return Inertia::render("Game/ShowGame", [
            "user_id" => $user->id,
            "user_name" => $user->name,
            "user_email" => $user->email,
            "game_name" => $data->name,
            "game_description" => $data->description,
            "game_cover" => $data->cover,
            "game_id" => $game->id,
            "game_tags" => $game->tags_name(),
        ]);
    }
}
