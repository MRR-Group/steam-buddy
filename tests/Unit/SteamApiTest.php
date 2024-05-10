<?php

declare(strict_types=1);

use App\Exceptions\CSVParsingException;
use App\Services\SteamApi\SteamApiService;
use App\Utilities\CSVParser;

describe("StemAPI", function (): void {
    describe("fetch_json_or_throw_error", function (): void {
        it("should throw error if steam returns BAD REQUEST response", function (): void {
            $api = new SteamApiService("TOKEN");

            $class = new \ReflectionClass();
            $method = $class->getMethod("fetch_json_or_throw_error");

            $method->invokeArgs();
        });
    });

    it("should throw error if line doesn't contain valid csv", function (): void {
        $parser = new CSVParser();
        $parser->parse("test1,test2\n\nfalse,true");
    })->throws(CSVParsingException::class);

    it("should throw error if data is an empty string", function (): void {
        $parser = new CSVParser();
        $parser->parse("");
    })->throws(CSVParsingException::class);

    it("should parse string to csv array", function (): void {
        $parser = new CSVParser();
        $result = $parser->parse("test1,test2\n0,1\nfalse,true");

        expect($result)->toBe([["test1", "test2"], ["0", "1"], ["false", "true"]]);
    });

    it("should skip header tag if it exist", function (): void {
        $parser = new CSVParser();
        $result = $parser->parse("#,line1,line2\ntest1,test2\n0,1\nfalse,true");

        expect($result)->toBe([["test1", "test2"], ["0", "1"], ["false", "true"]]);
    });

    it("should work with windows new line character", function (): void {
        $parser = new CSVParser();
        $result = $parser->parse("test1,test2\r\n0,1\r\nfalse,true");

        expect($result)->toBe([["test1", "test2"], ["0", "1"], ["false", "true"]]);
    });
});
