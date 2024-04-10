<?php

declare(strict_types=1);

use App\Http\Middleware\EnsureProfileDataAreFetched;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

describe("EnsureProfileDataAreFetched", function (): void {
    it("should redirect to the fetching page if user's steam data were never fetched", function (): void {
        $request = Request::create("/", "GET");
        $request->setUserResolver(fn() => User::factory()->never_fetched()->create());

        $middleware = new EnsureProfileDataAreFetched();
        $response = $middleware->handle($request, fn() => new Response("I have not been redirected"));

        expect($response->isRedirect(route("steam.fetch")))->toBeTrue();
    });

    it("shouldn't redirect to the fetching page if user's steam data were fetched", function (): void {
        $request = Request::create("/", "GET");
        $request->setUserResolver(fn() => User::factory()->create());

        $middleware = new EnsureProfileDataAreFetched();
        $response = $middleware->handle($request, fn() => new Response("I have not been redirected"));

        $this->assertEquals("I have not been redirected", $response->getContent());
    });
});
