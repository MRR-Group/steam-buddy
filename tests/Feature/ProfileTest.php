<?php

declare(strict_types=1);

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test("profile page is displayed", function (): void {
    $user = User::factory()->create();
    $user1 = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get("/profile/" . $user1->id );

    $response->assertOk();
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
