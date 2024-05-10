<?php

declare(strict_types=1);

use App\Services\SteamApi\SteamApiService;
use Illuminate\Support\Facades\Http;

describe("StemAPI", function (): void {
    describe("fetch_json_or_throw_error", function (): void {
        it("should throw error if steam returns BAD REQUEST response", function (): void {
            $api = new SteamApiService("TOKEN");

            $class = new \ReflectionClass($api);
            $method = $class->getMethod("fetch_json_or_throw_error");
            
            Http::fake(['localhost/test-url' => Http::response([], 400)]);

            $method->invokeArgs($api, array("https://localhost/test-url"), []);
        })->throws(\App\Exceptions\InvalidSteamTokenException::class);

        it("should throw error if steam doesn't return json data", function (): void {
            $api = new SteamApiService("TOKEN");

            $class = new \ReflectionClass($api);
            $method = $class->getMethod("fetch_json_or_throw_error");
            
            Http::fake(['localhost/test-url' => Http::response("NOT_A_JSON", 200)]);

            $method->invokeArgs($api, array("https://localhost/test-url"), []);
        })->throws(\App\Exceptions\NoJSONInSteamApiResponseException::class);

        it("should throw error if steam doesn't return does't pass validation", function (): void {
            $api = new SteamApiService("TOKEN");

            $class = new \ReflectionClass($api);
            $method = $class->getMethod("fetch_json_or_throw_error", ["age" => "present|numeric"]);
            
            Http::fake(['localhost/test-url' => Http::response(["age"=>"no_a_number"], 200)]);

            $method->invokeArgs($api, array("https://localhost/test-url"));
        })->throws(\App\Exceptions\InvalidSteamApiResponseException::class);
    });
});
