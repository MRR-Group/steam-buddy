<?php

declare(strict_types=1);

namespace App\Services\Matching;

use App\Exceptions\GameNotFoundException;
use App\Models\Game;
use App\Models\User;

use function Laravel\Prompts\error;

class MatchingService
{
    public function find_mates(User $user, int $game_id)
    {
        /** @var Game $user_game */
        $user_game = Game::query()->where('id', '=', $game_id)->first();

        if(is_null($user_game))
        {
            throw new GameNotFoundException();
        }

        $games = Game::query()->where('steam_id','=', $user_game->steam_id)->whereNot('id', '=', $game_id)->get()->toArray();
        $mates = [];

        for($i = 0; $i < count($games); $i++)
        {
            $mates[] = [
                'delta_play_time'=>abs($games[$i]['play_time'] - $user_game->play_time),
                'game_id'=>$games[$i]['id'],
                'id'=>$games[$i]['user_id']
            ];
        }

        usort($mates, fn($a, $b)=>$a['delta_play_time'] - $b['delta_play_time']);

        return $mates;
    }
}
