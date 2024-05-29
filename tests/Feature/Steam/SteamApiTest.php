<?php

declare(strict_types=1);

use App\Exceptions\InvalidSteamApiResponseException;
use App\Exceptions\InvalidSteamTokenException;
use App\Exceptions\NoJSONInSteamApiResponseException;
use App\Services\SteamApi\SteamApiService;
use Illuminate\Support\Facades\Http;

function fake_steam_response(string $url, array $response = [], int $code = 200, string $service = "https://api.steampowered.com/"): void
{
    Http::fake([($service . $url) => Http::response($response, $code)]);
}

describe("StemAPI", function (): void {
    describe("fetch_json_or_throw_error", function (): void {
        it("should throw error if steam returns UNAUTHORIZED response", function (): void {
            $api = new SteamApiService("TOKEN");

            $class = new ReflectionClass($api);
            $method = $class->getMethod("fetch_json_or_throw_error");

            Http::fake(["localhost/test-url" => Http::response([], 401)]);

            $method->invokeArgs($api, ["https://localhost/test-url", []]);
        })->throws(InvalidSteamTokenException::class);

        it("should throw error if steam doesn't return json data", function (): void {
            $api = new SteamApiService("TOKEN");

            $class = new ReflectionClass($api);
            $method = $class->getMethod("fetch_json_or_throw_error");

            Http::fake(["localhost/test-url" => Http::response("NOT_A_JSON", 200)]);

            $method->invokeArgs($api, ["https://localhost/test-url", []]);
        })->throws(NoJSONInSteamApiResponseException::class);

        it("should throw error if steam doesn't return does't pass validation", function (): void {
            $api = new SteamApiService("TOKEN");

            $class = new ReflectionClass($api);
            $method = $class->getMethod("fetch_json_or_throw_error");

            Http::fake(["localhost/test-url" => Http::response(["age" => "no_a_number"], 200)]);

            $method->invokeArgs($api, ["https://localhost/test-url", ["age" => "present|numeric"]]);
        })->throws(InvalidSteamApiResponseException::class);
    });

    describe("get_games", function (): void {
        it("should return user games", function (): void {
            $api = new SteamApiService("TOKEN");
            $games = [
                [
                    "appid" => 0,
                    "playtime_forever" => 1112470620,
                ],
                [
                    "appid" => 1,
                    "playtime_forever" => 1112470620,
                ],
            ];

            fake_steam_response("IPlayerService/GetOwnedGames/v0001/?key=TOKEN&steamid=USER&format=json&include_played_free_games&include_appinfo=1", [
                "response" => [
                    "games" => $games,
                ],
            ]);

            expect($api->get_games("USER"))->toBe($games);
        });

        it("should validate data received from steam", function (): void {
            $api = new SteamApiService("TOKEN");

            fake_steam_response("IPlayerService/GetOwnedGames/v0001/?key=TOKEN&steamid=USER&format=json&include_played_free_games&include_appinfo=1", [
                "invalid" => ["data"],
            ]);

            $api->get_games("USER");
        })->throws(InvalidSteamApiResponseException::class);
    });

    describe("get_user_achievements_for_game", function (): void {
        it("should return user achievements for game with index 1", function (): void {
            $api = new SteamApiService("TOKEN");
            $achievements = [
                [
                    "unlocktime" => 1112470620,
                    "apiname" => "KILL_TEN_PLAYERS",
                ],
                [
                    "unlocktime" => 1112470620,
                    "apiname" => "TANKMAN",
                ],
            ];

            fake_steam_response("ISteamUserStats/GetPlayerAchievements/v0001/?appid=1&key=TOKEN&steamid=USER&format=json", [
                "playerstats" => [
                    "achievements" => $achievements,
                ],
            ]);

            expect($api->get_user_achievements_for_game("USER", 1))->toBe($achievements);
        });

        it("should return an empty array if game doesn't have any achievements", function (): void {
            $api = new SteamApiService("TOKEN");

            fake_steam_response("ISteamUserStats/GetPlayerAchievements/v0001/?appid=1&key=TOKEN&steamid=USER&format=json", [
                "playerstats" => [],
            ]);

            expect($api->get_user_achievements_for_game("USER", 1))->toBe([]);
        });

        it("should validate data received from steam", function (): void {
            $api = new SteamApiService("TOKEN");

            fake_steam_response("ISteamUserStats/GetPlayerAchievements/v0001/?appid=1&key=TOKEN&steamid=USER&format=json", [
                "invalid" => ["data"],
            ]);

            $api->get_user_achievements_for_game("USER", 1);
        })->throws(InvalidSteamApiResponseException::class);
    });

    describe("get_game_achievements", function (): void {
        it("should return achievements for game with index 1", function (): void {
            $api = new SteamApiService("TOKEN");
            $achievements = [
                [
                    "name" => "KILL_TEN_PLAYERS",
                    "displayName" => "Killer",
                    "description" => "Kill ten players",
                    "icon" => "localhost/killer.png",
                ],
                [
                    "name" => "TANKMAN",
                    "displayName" => "Tankman",
                    "description" => "Use a tank",
                    "icon" => "localhost/tankman.png",
                ],
            ];

            fake_steam_response("ISteamUserStats/GetSchemaForGame/v0002/?appid=1&key=TOKEN&l=english&format=json", [
                "game" => [
                    "availableGameStats" => [
                        "achievements" => $achievements,
                    ],
                ],
            ]);

            expect($api->get_game_achievements(1))->toBe($achievements);
        });

        it("should return an empty array if game doesn't have any achievements", function (): void {
            $api = new SteamApiService("TOKEN");

            fake_steam_response("ISteamUserStats/GetSchemaForGame/v0002/?appid=1&key=TOKEN&l=english&format=json", [
                "game" => [
                    "availableGameStats" => [],
                ],
            ]);

            expect($api->get_game_achievements(1))->toBe([]);
        });

        it("should return an empty array if game is private", function (): void {
            $api = new SteamApiService("TOKEN");

            fake_steam_response("ISteamUserStats/GetSchemaForGame/v0002/?appid=1&key=TOKEN&l=english&format=json", [
                "game" => [],
            ]);

            expect($api->get_game_achievements(1))->toBe([]);
        });

        it("should validate data received from steam", function (): void {
            $api = new SteamApiService("TOKEN");

            fake_steam_response("ISteamUserStats/GetSchemaForGame/v0002/?appid=1&key=TOKEN&l=english&format=json", [
                "invalid" => ["data"],
            ]);

            $api->get_game_achievements( 1);
        })->throws(InvalidSteamApiResponseException::class);
    });

    describe("get_game_data", function (): void {
        it("should return data for game with index 10", function (): void {
            $api = new SteamApiService("TOKEN");
            $data = [
                "name" => "Portal",
                "detailed_description" => "Portal™ is a new single player game from Valve. Set in the mysterious",
            ];

            fake_steam_response("appdetails?appids=10", [
                "10" => [
                    "data" => $data,
                ],
            ], 200, "https://store.steampowered.com/api/");

            expect($api->get_game_data(10))->toBe($data);
        });

        it("should return null if game is private", function (): void {
            $api = new SteamApiService("TOKEN");

            fake_steam_response("appdetails?appids=1", [
                "1" => [],
            ], 200, "https://store.steampowered.com/api/");

            expect($api->get_game_data(1))->toBeNull();
        });

        it("should validate data received from steam", function (): void {
            $api = new SteamApiService("TOKEN");

            fake_steam_response("appdetails?appids=1", [
                "invalid" => ["data"],
            ], 200, "https://store.steampowered.com/api/");

            $api->get_game_data(1);
        })->throws(InvalidSteamApiResponseException::class);
    });

    describe("get_game_tags", function (): void {
        it("should return tags for game with index 1", function (): void {
            $api = new SteamApiService("TOKEN");
            $tags = [
                "Puzzle" => 4183,
                "Puzzle-Platformer" => 3153,
                "First-Person" => 2516,
            ];

            fake_steam_response("appdetails&appid=1", [
                "tags" => $tags,
            ], 200, "https://steamspy.com/api.php?request=");

            expect($api->get_game_tags(1))->toBe(["Puzzle", "Puzzle-Platformer", "First-Person"]);
        });

        it("should validate data received from steam", function (): void {
            $api = new SteamApiService("TOKEN");

            fake_steam_response("appdetails&appid=1", [
                "invalid" => ["data"],
            ], 200, "https://steamspy.com/api.php?request=");

            $api->get_game_tags(1);
        })->throws(InvalidSteamApiResponseException::class);
    });

    describe("get_game_cover", function (): void {
        it("should return link to cover image for game with index 1", function (): void {
            $api = new SteamApiService("TOKEN");
            
            fake_steam_response("steam/apps/1/library_600x900_2x.jpg", [ "status" => 200 ], 200, "https://steamcdn-a.akamaihd.net/");

            expect($api->get_game_cover(1))->toBe("https://steamcdn-a.akamaihd.net/steam/apps/1/library_600x900_2x.jpg");
        });

        it("should return link to alternative cover image if game doesn't have cover for 2019 library version", function (): void {
            $api = new SteamApiService("TOKEN");
            
            fake_steam_response("steam/apps/1/library_600x900_2x.jpg", [ "status" => 404 ], 404, "https://steamcdn-a.akamaihd.net/");

            expect($api->get_game_cover(1))->toBe("https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1/capsule_616x353.jpg");
        });
    });

    describe("get_game_background", function (): void {
        it("should return link to background image for game with index 1", function (): void {
            $api = new SteamApiService("TOKEN");
            
            fake_steam_response("steam/apps/1/library_hero.jpg", [ "status" => 200 ], 200, "https://steamcdn-a.akamaihd.net/");

            expect($api->get_game_background(1))->toBe("https://steamcdn-a.akamaihd.net/steam/apps/1/library_hero.jpg");
        });

        it("should return link to alternative background image if game doesn't have background for 2019 library version", function (): void {
            $api = new SteamApiService("TOKEN");
            
            fake_steam_response("steam/apps/1/library_hero.jpg", [ "status" => 404 ], 404, "https://steamcdn-a.akamaihd.net/");
            
            expect($api->get_game_background(1))->toBe("https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1/header.jpg");
        });
    });

    describe("get_game_logo", function (): void {
        it("should return link to logo image for game with index 1", function (): void {
            $api = new SteamApiService("TOKEN");
            
            fake_steam_response("steam/apps/1/logo.png", [ "status" => 200 ], 200, "https://steamcdn-a.akamaihd.net/");

            expect($api->get_game_logo(1))->toBe("https://steamcdn-a.akamaihd.net/steam/apps/1/logo.png");
        });

        it("should return link to alternative logo image if game doesn't have logo for 2019 library version", function (): void {
            $api = new SteamApiService("TOKEN");
            
            fake_steam_response("steam/apps/1/logo.png", [ "status" => 404 ], 404, "https://steamcdn-a.akamaihd.net/");
            
            expect($api->get_game_logo(1))->toBe("https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1/capsule_231x87.jpg");
        });
    });
});
