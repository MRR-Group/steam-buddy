<?php

declare(strict_types=1);

use App\Models\Tag;
use App\Utilities\InputStream;

describe("ImportTags", function (): void {
    it("should throw error if received data isn't valid csv", function (): void {
        $this->mock(InputStream::class, function ($mock): void {
            $mock->shouldReceive("get")->once()->andReturn("0,tag1,\n1,tag2\n\n2,tag3\n3,tag4");
        });

        $this->artisan("app:import-tags")
            ->expectsOutput('ERROR: CSV parsing error. Line: "" is invalid or empty!')
            ->assertExitCode(1);
    });

    it("should skip already loaded tags", function (): void {
        Tag::factory()->name("tag1")->create();        

        $this->mock(InputStream::class, function ($mock): void {
            $mock->shouldReceive("get")->once()->andReturn("0,tag1\n1,tag2\n2,tag3\n3,tag4");
        });

        $this->artisan("app:import-tags")
            ->expectsOutput("skipped: 1, imported: 3")
            ->assertExitCode(0);
    });

    it("should load csv tags", function (): void {
        $this->mock(InputStream::class, function ($mock): void {
            $mock->shouldReceive("get")->once()->andReturn("0,tag1\n1,tag2\n2,tag3\n3,tag4");
        });

        $this->artisan("app:import-tags")
            ->expectsOutput("skipped: 0, imported: 4")
            ->assertExitCode(0);
    });
});
