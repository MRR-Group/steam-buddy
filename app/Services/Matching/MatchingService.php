<?php

declare(strict_types=1);

namespace App\Services\Matching;

use App\Models\Game;
use Illuminate\Support\Facades\Log;

class MatchingService
{
    public function find_candidates(Game $user_game)
    {
        $games = Game::query()->where("steam_id", "=", $user_game->steam_id)->whereNot("id", "=", $user_game->id)->get();
        $mates = [];

        for ($i = 0; $i < count($games); $i++) {
            $mates[] = [
                "delta_play_time" => abs($games[$i]->play_time - $user_game->play_time),
                "id" => $games[$i]->user_id,
                "game" => $games[$i],
            ];
        }

        usort($mates, fn($a, $b) => $a["delta_play_time"] - $b["delta_play_time"]);
        Log::channel('invites')->info('Searching players for game ' . $user_game->id . ' found: ' . count($mates) . ' candidates');

        return $mates;
    }
}
