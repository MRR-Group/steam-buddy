<?php

declare(strict_types=1);

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

describe("Steam fetch screen", function (): void {
    describe("show", function (): void {
        it("should render", function (): void {
            $user = User::factory()->create();
            $response = $this->actingAs($user)->get("/steam/fetch");

            $response->assertStatus(200);
        });

        it("should redirect to login if user isn't logged", function(): void {
            $response = $this->get("/steam/fetch");
            
            expect($response->isRedirect("http://localhost/login"))->toBeTrue();
        });

        it("should redirect to confirm if user email isn't confirmed", function(): void {
            $user = User::factory()->unverified()->create();
            $response = $this->actingAs($user)->get("/steam/fetch");
            
            expect($response->isRedirect("http://localhost/verify-email"))->toBeTrue();
        });

        it("should redirect to library if user isn't connected to steam", function(): void {
            $user = User::factory()->unconnected()->create();
            $response = $this->actingAs($user)->get("/steam/fetch");
            
            expect($response->isRedirect("http://localhost/steam/connect"))->toBeTrue();
        });
    });
});
