<?php

declare(strict_types=1);

describe("Steam connection screen", function (): void {
    it("should render", function (): void {
        $response = $this->get("/steam/connect");

        $response->assertStatus(200);
    });
});
