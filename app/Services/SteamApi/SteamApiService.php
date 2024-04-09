<?php

declare(strict_types=1);

namespace App\Services\SteamApi;

class SteamApiService
{
    public function __construct(
        private $token,
    ) {}
}
