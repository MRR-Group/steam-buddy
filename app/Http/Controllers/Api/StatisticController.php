<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\Game;
use App\Models\GameDetail;
use App\Models\User;

class StatisticController extends Controller
{
    public function users()
    {
        $hours_played = 0;
        $common_games = 0;

        foreach (GameDetail::all() as $game) {
            if (count($game->games) >= 2) {
                ++$common_games;
            }
        }

        foreach (Game::all() as $game) {
            $hours_played += $game->play_time / 60;
        }

        return response()->json([
            "users" => User::all()->count(),
            "all_games" => Game::all()->count(),
            "all_titles" => GameDetail::all()->count(),
            "common_titles" => $common_games,
            "achievements_reached" => Achievement::all()->count(),
            "hours_played" => $hours_played,
            "days_played" => $hours_played / 24,
        ], 200);
    }

    public function games()
    {
        $most_completed = null;
        $most_completed_result = 0;

        $most_achievements_reached = null;
        $most_achievements_reached_result = 0;

        $most_time_consuming = null;
        $most_time_consuming_result = 0;

        if (Game::all()->count() === 0) {
            return response()->json(["message" => "Cannot load statistics for empty library"], 404);
        }

        foreach (Game::all() as $game) {
            $achievements = $game->achievements;
            $completion = $game->game_completion();

            if ($achievements->count() > 0 && $most_completed_result < $completion) {
                $most_completed_result = $completion;
                $most_completed = $game;
            }

            if ($achievements->count() > $most_achievements_reached_result) {
                $most_achievements_reached_result = $achievements->count();
                $most_achievements_reached = $game;
            }

            if ($game->play_time > $most_time_consuming_result) {
                $most_time_consuming_result = $game->play_time;
                $most_time_consuming = $game;
            }
        }

        return response()->json([
            "most_completed" => [
                "title" => $most_completed->data->name,
                "play_time" => $most_completed->play_time / 60,
                "achievements" => $most_completed->achievements->count(),
                "all_achievements" => $most_completed->data->achievements->count(),
                "completion" => $most_completed_result,
            ],
            "most_achievements_reached" => [
                "title" => $most_achievements_reached->data->name,
                "play_time" => $most_achievements_reached->play_time / 60,
                "achievements" => $most_achievements_reached_result,
                "all_achievements" => $most_achievements_reached->data->achievements->count(),
                "completion" => $most_achievements_reached->game_completion(),
            ],
            "most_time_consuming" => [
                "title" => $most_time_consuming->data->name,
                "play_time" => $most_time_consuming->play_time / 60,
                "achievements" => $most_time_consuming->achievements->count(),
                "all_achievements" => $most_time_consuming->data->achievements->count(),
                "completion" => $most_time_consuming->game_completion(),
            ],
        ], 200);
    }
}
