<?php

declare(strict_types=1);

namespace App\Services\Steam;

use App\Jobs\FetchSteamGame;
use App\Models\Achievement;
use App\Models\AchievementDetail;
use App\Models\Game;
use App\Models\GameDetail;
use App\Models\Tag;
use App\Models\User;
use App\Services\SteamApi\SteamApiService;
use Carbon\Carbon;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;

class SteamService
{
    public function __construct(
        private SteamApiService $api,
    ) {}

    public function fetch_games(User $user): Batch
    {
        $data = $this->api->get_games($user->steam_id);
        $jobs = [];

        foreach ($data as $game) {             
            array_push($jobs, new FetchSteamGame($game["appid"], $game["playtime_forever"], $user));
        }

        return Bus::batch($jobs)->dispatch();
    }
 
    public function fetch_game(int $game_id, int $playtime, User $user): void
    {                
        if (!$this->is_game_multiplayer($game_id)) {
            return;
        }

        $model = new Game();
        $model->steam_id = $game_id;
        $model->play_time = $playtime;
        
        $data = $this->get_game_data($game_id);

        if ($data == null) {
            return;
        }

        $model->data()->associate($data);
        $model->user()->associate($user);
        $model->save();

        $this->create_user_achievements($model, $user->steam_id);
    }

    protected function get_game_data(int $game_id): ?GameDetail {
        if (GameDetail::exist($game_id)) {
            return GameDetail::get_by_steam_id($game_id);
        }

        return $this->fetch_game_data($game_id);
    }

    protected function fetch_game_data(int $game_id): ?GameDetail {
        $details = $this->api->get_game_data($game_id);

        if ($details == null) {
            return null;
        }

        $model = new GameDetail();
        $model->name = $details["name"];
        $model->steam_id = $game_id;
        $model->description = $details["detailed_description"];
        $model->cover = $this->api->get_game_cover($game_id);
        $model->save();

        $this->update_achievements_data($game_id);
        $this->add_tags($model);

        return $model;
    }

    protected function update_achievements_data(int $game_id) {
        $achievements = $this->api->get_game_achievements($game_id);

        foreach ($achievements as $achievement) {
            $this->create_achievement_if_not_exist($game_id, $achievement);
        }
    }

    protected function create_achievement_if_not_exist(int $game_id, array $json) {            
        if (AchievementDetail::exist($game_id, $json["name"])) {
            return;
        }

        if (!array_key_exists("description", $json)) {
            $json["description"] = "";
        }

        $model = new AchievementDetail();
        $model->name = $json["displayName"];
        $model->description = $json["description"];
        $model->icon = $json["icon"];
        $model->set_steam_id($game_id, $json["name"]);
        $model->save();
    }

    protected function add_tags(GameDetail $game) {
        $game_tags = array_keys($this->api->get_game_tags($game->steam_id));

        $tags = Tag::get_by_names($game_tags);
        $game->tags()->attach($tags);
        $game->save();
    }

    protected function is_game_multiplayer(int $game_id) {
        $tags = $this->get_game_tags($game_id);

        foreach ($tags as $tag) {
            if ($tag->is_multiplayer()) {
                return true;
            }
        }

        return false;
    }

    protected function get_game_tags(int $game_id) {
        if (!GameDetail::exist($game_id)) {
            $tags = array_keys($this->api->get_game_tags($game_id));

            return Tag::get_by_names($tags);
        }
        
        $detail = GameDetail::get_by_steam_id($game_id);

        return $detail->tags()->get();
    }

    protected function create_user_achievements(Game $game, string $steam_id) {
        $achievements = $this->api->get_user_achievements_for_game($steam_id, $game->steam_id);
        
        foreach($achievements as $json) {
            $unlocked_at = $json["unlocktime"];
            $model = new Achievement();
            
            if ($unlocked_at <= 0) {
                continue;
            }

            $model->unlocked_at = Carbon::createFromTimestamp($unlocked_at);
            $model->set_steam_id($game->steam_id, $json["apiname"]);

            $model->data()->associate(AchievementDetail::get_by_name($game->steam_id, $json["apiname"]));
            $model->game()->associate(Game::get_by_steam_id($game->steam_id));
            $model->save();
        }
    }
}
