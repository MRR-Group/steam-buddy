<?php

declare(strict_types=1);

use App\Models\Game;
use App\Models\GameDetail;
use App\Models\Tag;
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

    $games = array(
        [
            "id" => $game->id,
            "name" => $game->data->name,
            "cover" => $game->data->cover,
            "tags" => array('Swordplay', 'Harem'),
        ],
        [
            "id" => $game1->id,
            "name" => $game1->data->name,
            "cover" => $game1->data->cover,
            "tags" => array('Music', 'Great Soundtrack'),
        ]
    );

    $response->assertInertia(
        fn(Assert $page) => $page
            ->where("name", $user1->name)
            ->where("email", $user1->email)
            ->where("description", $user1->description)
            ->where("image", $user1->image)
            ->where("games", $games)
    );
});

test("edit profile page is displayed", function (): void {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get("/profile/edit");

    $response->assertInertia(
        fn(Assert $page) => $page
            ->where("name", $user->name)
            ->where("email", $user->email)
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
