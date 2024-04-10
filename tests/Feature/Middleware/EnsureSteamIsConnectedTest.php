<?php

declare(strict_types=1);

use App\Http\Middleware\EnsureSteamIsConnected;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

describe("EnsureSteamIsConnected", function (): void {
    it("should redirect to the steam connecting page if user hasn't steam_id", function (): void {
        $request = Request::create("/", "GET");
        $request->setUserResolver(fn() => User::factory()->unconnected()->create());

        $middleware = new EnsureSteamIsConnected();
        $response = $middleware->handle($request, fn() => new Response("I have not been redirected"));

        expect($response->isRedirect(route("steam.connect")))->toBeTrue();
    });

    it("shouldn't redirect to the connecting connecting page if use has steam_id", function (): void {
        $request = Request::create("/", "GET");
        $request->setUserResolver(fn() => User::factory()->create());

        $middleware = new EnsureSteamIsConnected();
        $response = $middleware->handle($request, fn() => new Response("I have not been redirected"));

        $this->assertEquals("I have not been redirected", $response->getContent());
    });
});
