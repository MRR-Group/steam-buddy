<?php

declare(strict_types=1);

use App\Http\Middleware\RedirectIfConnectedToSteam;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

describe("RedirectIfConnectedToSteam", function (): void {
    it("should redirect to the library page if user has steam_id", function (): void {
        $request = Request::create("/", "GET");
        $request->setUserResolver(fn() => User::factory()->create());

        $middleware = new RedirectIfConnectedToSteam();
        $response = $middleware->handle($request, fn() => new Response("I have not been redirected"));

        expect($response->isRedirect(route("library")))->toBeTrue();
    });

    it("shouldn't redirect to the library page if use hasn't steam_id", function (): void {
        $request = Request::create("/", "GET");
        $request->setUserResolver(fn() => User::factory()->unconnected()->create());

        $middleware = new RedirectIfConnectedToSteam();
        $response = $middleware->handle($request, fn() => new Response("I have not been redirected"));

        $this->assertEquals("I have not been redirected", $response->getContent());
    });
});
