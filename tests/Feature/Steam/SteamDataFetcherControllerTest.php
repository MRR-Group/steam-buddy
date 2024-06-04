<?php

declare(strict_types=1);

use App\Jobs\FetchSteamGame;
use App\Models\User;
use App\Services\Steam\SteamService;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Testing\Fakes\BatchFake;
use Inertia\Testing\AssertableInertia as Assert;

describe("Steam fetch screen", function (): void {
    describe("show", function (): void {
        it("should render", function (): void {
            $user = User::factory()->create();
            $response = $this->actingAs($user)->get("/steam/fetch");

            $response->assertStatus(200);
        });

        it("should redirect to login if user isn't logged", function (): void {
            $response = $this->get("/steam/fetch");

            expect($response->isRedirect("http://localhost/login"))->toBeTrue();
        });

        it("should redirect to confirm if user email isn't confirmed", function (): void {
            $user = User::factory()->unverified()->create();
            $response = $this->actingAs($user)->get("/steam/fetch");

            expect($response->isRedirect("http://localhost/verify-email"))->toBeTrue();
        });

        it("should redirect to library if user isn't connected to steam", function (): void {
            $user = User::factory()->unconnected()->create();
            $response = $this->actingAs($user)->get("/steam/fetch");

            expect($response->isRedirect("http://localhost/steam/connect"))->toBeTrue();
        });
    });

    describe("fetch", function (): void {
        it("should start game fetching and return batch id", function (): void {
            $this->mock(SteamService::class, function ($mock): void {
                $mock->shouldReceive("fetch_games")->once()->andReturn(new BatchFake(
                    "0",
                    "fetch_games",
                    1,
                    1,
                    0,
                    [],
                    [],
                    CarbonImmutable::now(),
                ));
            });

            $user = User::factory()->create();
            $response = $this->actingAs($user)->post("/steam/fetch");

            $response->assertInertia(
                fn(Assert $page) => $page
                    ->where("name", $user->name)
                    ->where("batch", "0"),
            );
        });
    });

    describe("progress", function (): void {
        it("should return job progress", function (): void {
            Bus::fake();
            $user = User::factory()->create();

            $batch = Bus::batch([
                new FetchSteamGame(0, 1000, $user),
                new FetchSteamGame(1, 1000, $user),
            ])->dispatch();

            $response = $this->actingAs($user)->get("/steam/fetch/progress?batch=" . $batch->id);

            $response->assertJson(["all" => 2, "done" => 0]);
            $response->assertStatus(200);
        });

        it("should return error 404 if batch does not exist", function (): void {
            $user = User::factory()->create();

            $response = $this->actingAs($user)->get("/steam/fetch/progress?batch=-1");
            $response->assertJson(["message" => "Batch not found"]);
            $response->assertStatus(404);
        });

        it("should return error 500 if batch was canceled", function (): void {
            Bus::fake();
            $user = User::factory()->create();

            $batch = Bus::batch([
                new FetchSteamGame(0, 1000, $user),
                new FetchSteamGame(1, 1000, $user),
            ])->dispatch();

            $batch->cancel();

            $response = $this->actingAs($user)->get("/steam/fetch/progress?batch=" . $batch->id);

            $response->assertJson(["message" => "There was an error, please try again latter."]);
            $response->assertStatus(500);
        });
    });
});
