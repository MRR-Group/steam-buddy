<?php

declare(strict_types=1);

use App\Models\Achievement;
use App\Models\AchievementDetail;
use App\Models\Game;
use App\Models\GameDetail;
use App\Models\Tag;
use App\Models\User;
use App\Services\Steam\SteamService;
use App\Services\SteamApi\SteamApiService;
use Carbon\Carbon;

function run_method(mixed $object, string $method_name, array $args)
{
    $class = new ReflectionClass($object);
    $method = $class->getMethod($method_name);

    return $method->invokeArgs($object, $args);
}

function mock_steam_api(): SteamApiService
{
    return new class("TOKEN") extends SteamApiService {
        public function get_games(string $steam_id): array
        {
            return [[
                "appid" => 0,
                "playtime_forever" => 1112470620,
            ]];
        }

        public function get_game_data(int $game_id): array
        {
            return [
                "name" => "WarThunder",
                "detailed_description" => "War Thunder is the most comprehensive free-to-play, cross-platform, MMO military game",
            ];
        }

        public function get_game_cover(int $game_id): string
        {
            return "localhost/cover.png";
        }

        public function get_game_tags(int $game_id): array
        {
            return ["MMO", "FPS"];
        }

        public function get_game_achievements(int $game_id): array
        {
            return [[
                "name" => "TANKMAN",
                "displayName" => "Tankman",
                "icon" => "localhost/icon.png",
                "description" => "Use tank in the battle",
            ]];
        }

        public function get_user_achievements_for_game($steam_id, $game_id): array
        {
            return [
                [
                    "unlocktime" => Carbon::now()->getTimestamp(),
                    "apiname" => "TANKMAN",
                ],
            ];
        }
    };
}

describe("Steam", function (): void {
    describe("create_user_achievements", function (): void {
        it("should save fetched achievements in database", function (): void {
            $service = new SteamService(new class("TOKEN") extends SteamApiService {
                public function get_user_achievements_for_game($steam_id, $game_id): array
                {
                    return [
                        [
                            "unlocktime" => Carbon::now()->getTimestamp(),
                            "apiname" => "TANKMAN",
                        ],
                        [
                            "unlocktime" => Carbon::now()->getTimestamp(),
                            "apiname" => "TANK_DESTROYER",
                        ],
                    ];
                }
            });

            $game = Game::factory()->steam_id(0)->create();

            AchievementDetail::factory()->steam_id(0, "TANKMAN")->create();
            AchievementDetail::factory()->steam_id(0, "TANK_DESTROYER")->create();

            run_method($service, "create_user_achievements", [$game, "USER_ID"]);

            expect(count(Achievement::all()))->toBe(2)
                ->and(Achievement::query()->where(["steam_id" => "0/TANKMAN"])->count())->toBe(1)
                ->and(Achievement::query()->where(["steam_id" => "0/TANK_DESTROYER"])->count())->toBe(1);
        });

        it("should skip unachieved achievements", function (): void {
            $service = new SteamService(new class("TOKEN") extends SteamApiService {
                public function get_user_achievements_for_game($steam_id, $game_id): array
                {
                    return [
                        [
                            "unlocktime" => 0,
                            "apiname" => "TANKMAN",
                        ],
                        [
                            "unlocktime" => Carbon::now()->getTimestamp(),
                            "apiname" => "TANK_DESTROYER",
                        ],
                    ];
                }
            });

            $game = Game::factory()->steam_id(0)->create();

            AchievementDetail::factory()->steam_id(0, "TANKMAN")->create();
            AchievementDetail::factory()->steam_id(0, "TANK_DESTROYER")->create();

            run_method($service, "create_user_achievements", [$game, "USER_ID"]);

            expect(count(Achievement::all()))->toBe(1)
                ->and(Achievement::query()->where(["steam_id" => "0/TANKMAN"])->count())->toBe(0)
                ->and(Achievement::query()->where(["steam_id" => "0/TANK_DESTROYER"])->count())->toBe(1);
        });
    });

    describe("add_tags", function (): void {
        it("should add tags to game", function (): void {
            $service = new SteamService(new class("TOKEN") extends SteamApiService {
                public function get_game_tags(int $game_id): array
                {
                    return [
                        "MMO", "RPG",
                    ];
                }
            });

            /** @var GameDetail $game */
            $game = GameDetail::factory()->steam_id(0)->create();

            Tag::factory()->name("MMO")->create();
            Tag::factory()->name("RPG")->create();

            run_method($service, "add_tags", [$game]);

            expect(array_map(fn($game) => $game["name"], $game->tags->toArray()))->toBe(["MMO", "RPG"]);
        });
    });

    describe("create_achievement_if_not_exist", function (): void {
        it("should create a new achievement data and save it in database", function (): void {
            $service = new SteamService(new class("TOKEN") extends SteamApiService {});
            GameDetail::factory()->steam_id(0)->create();

            run_method($service, "create_achievement_if_not_exist", [0, [
                "name" => "TANKMAN",
                "displayName" => "Tankman",
                "icon" => "localhost/icon.png",
                "description" => "Use tank in the battle",
            ]]);

            expect(AchievementDetail::query()->where(["steam_id" => "0/TANKMAN"])->count())->toBe(1);
        });

        it("should set description to an empty string if it not exist in json", function (): void {
            $service = new SteamService(new class("TOKEN") extends SteamApiService {});
            GameDetail::factory()->steam_id(0)->create();

            run_method($service, "create_achievement_if_not_exist", [0, [
                "name" => "TANKMAN",
                "displayName" => "Tankman",
                "icon" => "localhost/icon.png",
            ]]);

            expect(AchievementDetail::query()->first()->description)->toBe("");
        });

        it("should skip achievement if it exists", function (): void {
            $service = new SteamService(new class("TOKEN") extends SteamApiService {});
            GameDetail::factory()->steam_id(0)->create();
            AchievementDetail::factory()->steam_id(0, "TANK_DESTROYER")->create();

            run_method($service, "create_achievement_if_not_exist", [0, [
                "name" => "TANKMAN",
                "displayName" => "Tankman",
                "icon" => "localhost/icon.png",
                "description" => "Use tank in the battle",
            ]]);

            run_method($service, "create_achievement_if_not_exist", [0, [
                "name" => "TANK_DESTROYER",
                "displayName" => "Tank destroyer",
                "icon" => "localhost/icon.png",
                "description" => "Use tank destroyer in the battle",
            ]]);

            expect(AchievementDetail::query()->count())->toBe(2);
        });
    });

    describe("update_achievements_data", function (): void {
        it("should update achievement data", function (): void {
            $service = new SteamService(new class("TOKEN") extends SteamApiService {
                public function get_game_achievements(int $game_id): array
                {
                    return [[
                        "name" => "TANKMAN",
                        "displayName" => "Tankman",
                        "icon" => "localhost/icon.png",
                        "description" => "Use tank in the battle",
                    ],
                        [
                            "name" => "TANK_DESTROYER",
                            "displayName" => "Tank destroyer",
                            "icon" => "localhost/icon.png",
                            "description" => "Use tank destroyer in the battle",
                        ]];
                }
            });

            GameDetail::factory()->steam_id(0)->create();
            AchievementDetail::factory()->steam_id(0, "TANKMAN")->create();

            run_method($service, "update_achievements_data", [0]);

            expect(AchievementDetail::query()->count())->toBe(2);
        });
    });

    describe("fetch_game_data", function (): void {
        it("should get game data", function (): void {
            $service = new SteamService(mock_steam_api());

            Tag::factory()->name("MMO")->create();
            Tag::factory()->name("FPS")->create();

            $game = run_method($service, "fetch_game_data", [0]);

            expect($game->name)->toBe("WarThunder")
                ->and($game->description)->toBe("War Thunder is the most comprehensive free-to-play, cross-platform, MMO military game")
                ->and($game->tags()->count())->toBe(2)
                ->and(AchievementDetail::all()->count())->toBe(1);
        });

        it("should return null if game does not exist in steamDB or is private", function (): void {
            $service = new SteamService(new class("TOKEN") extends SteamApiService {
                public function get_game_data(int $game_id): void
                {
                }
            });

            $game = run_method($service, "fetch_game_data", [0]);
            expect($game)->toBeNull();
        });
    });

    describe("get_game_data", function (): void {
        it("should return GameDetail from database", function (): void {
            $service = new SteamService(mock_steam_api());

            GameDetail::factory()->steam_id(0)->create();

            $game = run_method($service, "fetch_game_data", [0]);
            expect($game->steam_id)->toEqual(0);
        });

        it("should fetch GameDetail from steam if it does not exist in database", function (): void {
            $service = new SteamService(mock_steam_api());

            $game = run_method($service, "fetch_game_data", [0]);

            expect($game->name)->toBe("WarThunder")
                ->and($game->steam_id)->toEqual(0);
        });
    });

    describe("get_game_tags", function (): void {
        it("should return tags from GameDetail", function (): void {
            $service = new SteamService(mock_steam_api());

            GameDetail::factory()
                ->steam_id(0)
                ->has(Tag::factory()->name("MMO"))
                ->has(Tag::factory()->name("RPG"))
                ->create();

            $tags = run_method($service, "get_game_tags", [0]);
            expect(array_map(fn($tag) => $tag["name"], $tags->toArray()))->toBe(["MMO", "RPG"]);
        });

        it("should fetch tags from steam if GameDetail does not exist in database", function (): void {
            $service = new SteamService(mock_steam_api());

            Tag::factory()->name("MMO")->create();
            Tag::factory()->name("FPS")->create();

            $tags = run_method($service, "get_game_tags", [0]);
            expect(array_map(fn($tag) => $tag["name"], $tags->toArray()))->toBe(["MMO", "FPS"]);
        });
    });

    describe("is_game_multiplayer", function (): void {
        it("should return true if game contain at least one multiplayer tag", function (): void {
            $service = new SteamService(mock_steam_api());
            Tag::factory()->name("FPS")->create();
            Tag::factory()->name("MMO")->create();

            expect(run_method($service, "is_game_multiplayer", [0]))->toBeTrue();
        });

        it("should return true if game doesn't contain any multiplayer tag", function (): void {
            $service = new SteamService(mock_steam_api());
            Tag::factory()->name("FPS")->create();

            expect(run_method($service, "is_game_multiplayer", [0]))->toBeFalse();
        });
    });

    describe("fetch_game", function (): void {
        it("should fetch game and it's data from steam and add game instance to user library", function (): void {
            $service = new SteamService(mock_steam_api());

            Tag::factory()->name("FPS")->create();
            Tag::factory()->name("MMO")->create();

            $user = User::factory()->create();
            $service->fetch_game(0, 1112470620, $user);

            $game = $user->games()->first();

            expect($user->games()->count())->toBe(1)
                ->and($game->steam_id)->toBe(0)
                ->and($game->data->steam_id)->toBe(0)
                ->and($game->achievements()->count())->toBe(1);
        });

        it("should skip games without any multiplayer elements", function (): void {
            $service = new SteamService(mock_steam_api());

            Tag::factory()->name("FPS")->create();
            $user = User::factory()->create();

            $service->fetch_game(0, 1112470620, $user);

            expect($user->games()->count())->toBe(0);
        });

        it("should skip games that are private or not exist on steam", function (): void {
            $service = new SteamService(mock_steam_api());
            $user = User::factory()->create();

            $service->fetch_game(1, 1112470620, $user);

            expect($user->games()->count())->toBe(0);
        });
    });

    describe("fetch_games", function (): void {
        it("should fetch all user games via jobs", function (): void {
            $service = new SteamService(mock_steam_api());
            $user = User::factory()->create();

            $batch = $service->fetch_games($user);

            expect($batch->totalJobs)->toBe(1);
        });
    });
});
