<?php

declare(strict_types=1);

namespace App\Services\SteamApi;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
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
        $response = Http::get($url);

        $json = $this->load_json_or_throw_error($response);

        return $json["response"]["games"];
    }

    public function get_user_achievements_for_game(string $steam_id, int $game_id)
    {
        $url = self::URL . "ISteamUserStats/GetPlayerAchievements/v0001/?appid=" . $game_id . "&key=" . $this->token . "&steamid=" . $steam_id . "&format=json";
        $response = Http::get($url);

        $json = $this->load_json_or_throw_error($response);
        $data = $json["playerstats"];

        if (!array_key_exists("achievements", $data)) {
            return [];
        }

        return $data["achievements"];
    }

    public function get_game_achievements(int $game_id)
    {
        $url = self::URL . "ISteamUserStats/GetSchemaForGame/v0002/?appid=" . $game_id . "&key=" . $this->token . "&l=english&format=json";
        $response = Http::get($url);

        $json = $this->load_json_or_throw_error($response);

        // Game is set to private by publisher.
        if (!array_key_exists("availableGameStats", $json["game"])) {
            return [];
        }

        $data = $json["game"]["availableGameStats"];

        if (!array_key_exists("achievements", $data)) {
            return [];
        }

        return $data["achievements"];
    }

    public function get_game_data(int $game_id)
    {
        $url = "https://store.steampowered.com/api/appdetails?appids=" . $game_id;
        $response = Http::get($url);

        $json = $this->load_json_or_throw_error($response);

        // Game is no longer available
        if (!array_key_exists("data", $json[$game_id])) {
            return;
        }

        return $json[$game_id]["data"];
    }

    public function get_game_tags(int $game_id)
    {
        $url = "https://steamspy.com/api.php?request=appdetails&appid=" . $game_id;
        $response = Http::get($url);

        $json = $this->load_json_or_throw_error($response);

        return $json["tags"];
    }

    public function get_game_cover(int $game_id): string
    {
        return "https://steamcdn-a.akamaihd.net/steam/apps/" . $game_id . "/library_600x900_2x.jpg";
    }

    public function get_game_background(int $game_id): string
    {
        return "https://steamcdn-a.akamaihd.net/steam/apps/" . $game_id . "/library_hero.jpg";
    }

    public function get_game_logo(int $game_id): string
    {
        return "https://steamcdn-a.akamaihd.net/steam/apps/" . $game_id . "/logo.png";
    }

    protected function load_json_or_throw_error(Response $response): array
    {
        if ($response->status() === HttpFoundationResponse::HTTP_BAD_REQUEST) {
            // throw invalid steam_token_error;
        }

        $json = $response->json();

        if ($json === null) {
            // throw no json response error
        }

        return $json;
    }
}
