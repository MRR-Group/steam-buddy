<?php

declare(strict_types=1);

namespace App\Services\SteamApi;

use App\Exceptions\InvalidSteamApiResponseException;
use App\Exceptions\InvalidSteamTokenException;
use App\Exceptions\NoJSONInSteamApiResponseException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class SteamApiService
{
    private const URL = "https://api.steampowered.com/";

    public function __construct(
        private $token,
    ) {}

    public function get_games(string $steam_id): array
    {
        $url = self::URL . "IPlayerService/GetOwnedGames/v0001/?key=" . $this->token . "&steamid=" . $steam_id . "&format=json&include_played_free_games&include_appinfo=1";
        $validation = [
            "response" => "present|array",
            "response.games" => "present|array",
            "response.games.*.appid" => "present|numeric",
            "response.games.*.playtime_forever" => "present|numeric",
        ];

        $json = $this->fetch_json_or_throw_error($url, $validation);

        return $json["response"]["games"];
    }

    public function get_user_achievements_for_game(string $steam_id, int $game_id)
    {
        $url = self::URL . "ISteamUserStats/GetPlayerAchievements/v0001/?appid=" . $game_id . "&key=" . $this->token . "&steamid=" . $steam_id . "&format=json";
        $validation = [
            "playerstats" => "present|array",
            "playerstats.achievements" => "nullable|array",
            "playerstats.achievements.*.unlocktime" => "present|numeric",
            "playerstats.achievements.*.apiname" => "present|string",
        ];

        $json = $this->fetch_json_or_throw_error($url, $validation);
        $data = $json["playerstats"];

        if (!array_key_exists("achievements", $data)) {
            return [];
        }

        return $data["achievements"];
    }

    public function get_game_achievements(int $game_id)
    {
        $url = self::URL . "ISteamUserStats/GetSchemaForGame/v0002/?appid=" . $game_id . "&key=" . $this->token . "&l=english&format=json";
        $validation = [
            "game" => "present|array",
            "game.availableGameStats" => "nullable|array",
            "game.availableGameStats.achievements" => "nullable|array",
            "game.availableGameStats.achievements.*.name" => "present|string",
            "game.availableGameStats.achievements.*.description" => "nullable|string",
            "game.availableGameStats.achievements.*.displayName" => "present|string",
            "game.availableGameStats.achievements.*.icon" => "present|string",
        ];

        $json = $this->fetch_json_or_throw_error($url, $validation);

        // Game can be hidden be publisher.
        $is_game_available = Validator::make($json["game"], [
            "availableGameStats" => "present|array",
            "availableGameStats.achievements" => "present",
        ]);

        if ($is_game_available->fails()) {
            return [];
        }

        return $json["game"]["availableGameStats"]["achievements"];
    }

    public function get_game_data(int $game_id)
    {
        $url = "https://store.steampowered.com/api/appdetails?appids=" . $game_id;

        $validation = [
            $game_id . ".data" => "nullable|array",
            $game_id . ".data.name" => "required_if:" . $game_id . ",data|string",
            $game_id . ".data.detailed_description" => "required_if:" . $game_id . ",data|string",
        ];

        $json = $this->fetch_json_or_throw_error($url, $validation);

        // I cannot manage the '$game_id => "present|array|"' validation rule to work, so i moved it here.
        if (!array_key_exists($game_id, $json)) {
            throw new InvalidSteamApiResponseException($url, ["The " . $game_id . " field must be present."], $json);
        }

        // Game can be hidden be publisher.
        $is_game_available = Validator::make($json[$game_id], [
            "data" => "present",
        ]);

        if ($is_game_available->fails()) {
            return;
        }

        return $json[$game_id]["data"];
    }

    public function get_game_tags(int $game_id)
    {
        $url = "https://steamspy.com/api.php?request=appdetails&appid=" . $game_id;
        $validation = ["tags" => "present|array"];

        $json = $this->fetch_json_or_throw_error($url, $validation);

        return array_keys($json["tags"]);
    }

    public function get_game_cover(int $game_id): string
    {
        $url_2019 = "https://steamcdn-a.akamaihd.net/steam/apps/" . $game_id . "/library_600x900_2x.jpg";

        if ($this->does_image_exist($url_2019)) {
            return $url_2019;
        }

        $url_2014 = "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/" . $game_id . "/hero_capsule.jpg";

        if ($this->does_image_exist($url_2014)) {
            return $url_2014;
        }

        // pre 2014
        return "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/" . $game_id . "/capsule_231x87.jpg";
    }

    public function get_game_background(int $game_id): string
    {
        $url = "https://steamcdn-a.akamaihd.net/steam/apps/" . $game_id . "/library_hero.jpg";

        if ($this->does_image_exist($url)) {
            return $url;
        }

        return "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/" . $game_id . "/header.jpg";
    }

    public function get_game_logo(int $game_id): string
    {
        $url = "https://steamcdn-a.akamaihd.net/steam/apps/" . $game_id . "/logo.png";

        if ($this->does_image_exist($url)) {
            return $url;
        }
        
        return "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/" . $game_id . "/capsule_231x87.jpg";
    }

    protected function does_image_exist(string $url): bool {    
        return Http::get($url)->status() === HttpFoundationResponse::HTTP_OK;
    }

    protected function fetch_json_or_throw_error(String $url, array $rules): array
    {
        $response = Http::get($url);

        if ($response->status() === HttpFoundationResponse::HTTP_UNAUTHORIZED) {
            throw new InvalidSteamTokenException();
        }

        $json = $response->json();

        if ($json === null) {
            throw new NoJSONInSteamApiResponseException($url, $response);
        }

        $validator = Validator::make($json, $rules);

        if ($validator->fails()) {
            throw new InvalidSteamApiResponseException($url, $validator->messages()->messages(), $response->json());
        }

        return $validator->valid();
    }
}