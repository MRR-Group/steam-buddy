<?php

declare(strict_types=1);

use App\Models\Game;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test("profile page is displayed", function (): void {
    $user = User::factory()->create();
    $user1 = User::factory()->create();
    $game = Game::factory()->user($user1, "Swordplay", "Harem")->create();
    $game1 = Game::factory()->user($user1, "Music", "Great Soundtrack")->create();

    $response = $this
        ->actingAs($user)
        ->get("/profile/" . $user1->id );

    $games = [
        [
            "cover" => $game->data->cover,
            "description" => $game->data->description,
            "id" => $game->id,
            "name" => $game->data->name,
            "tags" => ["Swordplay", "Harem"],
            "play_time" => $game->play_time,
            "steam_id" => $game->steam_id,
        ],
        [
            "cover" => $game1->data->cover,
            "description" => $game1->data->description,
            "id" => $game1->id,
            "name" => $game1->data->name,
            "tags" => ["Music", "Great Soundtrack"],
            "play_time" => $game1->play_time,
            "steam_id" => $game1->steam_id,
        ],
    ];

    $response->assertInertia(
        fn(Assert $page) => $page
            ->where("name", $user1->name)
            ->where("email", $user1->email)
            ->where("description", $user1->description)
            ->where("image", $user1->image)
            ->where("games", $games)
            ->where("is_owner", false),
    );
});

test("profile page should return is_owner: true if user is displaying it's own profile", function (): void {
    $user = User::factory()->create();
    $game = Game::factory()->user($user, "Swordplay", "Harem")->create();

    $response = $this
        ->actingAs($user)
        ->get("/profile/" . $user->id );

    $games = [
        [
            "cover" => $game->data->cover,
            "description" => $game->data->description,
            "id" => $game->id,
            "name" => $game->data->name,
            "tags" => ["Swordplay", "Harem"],
            "play_time" => $game->play_time,
            "steam_id" => $game->steam_id,
        ],
    ];

    $response->assertInertia(
        fn(Assert $page) => $page
            ->where("name", $user->name)
            ->where("email", $user->email)
            ->where("description", $user->description)
            ->where("image", $user->image)
            ->where("games", $games)
            ->where("is_owner", true),
    );
});

test("edit profile page is displayed", function (): void {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get("/profile/edit");

    $response->assertInertia(
        fn(Assert $page) => $page
            ->where("name", $user->name)
            ->where("email", $user->email)
            ->where("image", $user->image)
            ->where("description", $user->description),
    );
});

test("profile information can be updated", function (): void {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->patch("/profile", [
            "name" => "Test Name",
            "description" => "Test Description",
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect("/profile/" . $user->id );

    $user->refresh();

    $this->assertSame("Test Name", $user->name);
    $this->assertSame("Test Description", $user->description);
});
