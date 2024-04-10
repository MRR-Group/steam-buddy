<?php

declare(strict_types=1);

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

describe("Steam connection screen", function (): void {
    describe("show", function (): void {
        it("should render", function (): void {
            $user = User::factory()->unconnected()->create();
            $response = $this->actingAs($user)->get("/steam/connect");

            $response->assertStatus(200);
        });

        it("should redirect to login if user isn't logged", function (): void {
            $response = $this->get("/steam/connect");

            expect($response->isRedirect("http://localhost/login"))->toBeTrue();
        });

        it("should redirect to confirm if user email isn't confirmed", function (): void {
            $user = User::factory()->unverified()->create();
            $response = $this->actingAs($user)->get("/steam/connect");

            expect($response->isRedirect("http://localhost/verify-email"))->toBeTrue();
        });

        it("should redirect to library if user is connected to steam", function (): void {
            $user = User::factory()->create();
            $response = $this->actingAs($user)->get("/steam/connect");

            expect($response->isRedirect("http://localhost/library"))->toBeTrue();
        });
    });

    describe("redirect", function (): void {
        it("should redirect via Socialite", function (): void {
            $user = User::factory()->unconnected()->create();

            Socialite::shouldReceive("driver")->once()->with("steam")->andReturn(new class() {
                public function redirect()
                {
                    return Redirect("https://redirected.to/steam/oath");
                }
            });

            $response = $this->actingAs($user)->get("/steam/redirect");

            expect($response->isRedirect("https://redirected.to/steam/oath"))->toBeTrue();
        });

        it("should redirect to login if user isn't logged", function (): void {
            $response = $this->get("/steam/redirect");

            expect($response->isRedirect("http://localhost/login"))->toBeTrue();
        });

        it("should redirect to confirm if user email isn't confirmed", function (): void {
            $user = User::factory()->unverified()->create();
            $response = $this->actingAs($user)->get("/steam/redirect");

            expect($response->isRedirect("http://localhost/verify-email"))->toBeTrue();
        });

        it("should redirect to library if user is connected to steam", function (): void {
            $user = User::factory()->create();
            $response = $this->actingAs($user)->get("/steam/redirect");

            expect($response->isRedirect("http://localhost/library"))->toBeTrue();
        });
    });

    describe("callback", function (): void {
        it("should redirect to connect page with error message if socialite throws exception", function (): void {
            $user = User::factory()->unconnected()->create();

            Socialite::shouldReceive("driver")->once()->with("steam")->andReturn(new class() {
                public function user(): void
                {
                    throw new Exception("test");
                }
            });

            $response = $this->actingAs($user)->get("/steam/callback");

            expect($response->isRedirect("http://localhost/steam/connect"))->toBeTrue();
            $response->assertSessionHas("status", "Cannot connect your Steam account to our service, please try again later.");
        });

        it("should redirect to fetch page with success message if socialite doesn't throw error", function (): void {
            $user = User::factory()->unconnected()->create();

            Socialite::shouldReceive("driver")->once()->with("steam")->andReturn(new class() {
                public function user()
                {
                    return new class() {
                        public $id = "test_id";
                        public $nickname = "test_nick";
                        public $avatar = "test_avatar";
                    };
                }
            });

            $response = $this->actingAs($user)->get("/steam/callback");

            $this->assertEquals($user->steam_id, "test_id");
            $this->assertEquals($user->name, "test_nick");
            $this->assertEquals($user->image, "test_avatar");

            expect($response->isRedirect("http://localhost/steam/fetch"))->toBeTrue();
            $response->assertSessionHas("status", "Your steam account has been successfully connected to our service.");
        });

        it("should redirect to login if user isn't logged", function (): void {
            $response = $this->get("/steam/callback");

            expect($response->isRedirect("http://localhost/login"))->toBeTrue();
        });

        it("should redirect to confirm if user email isn't confirmed", function (): void {
            $user = User::factory()->unverified()->create();
            $response = $this->actingAs($user)->get("/steam/callback");

            expect($response->isRedirect("http://localhost/verify-email"))->toBeTrue();
        });

        it("should redirect to library if user is connected to steam", function (): void {
            $user = User::factory()->create();
            $response = $this->actingAs($user)->get("/steam/callback");

            expect($response->isRedirect("http://localhost/library"))->toBeTrue();
        });
    });
});
