<?php

declare(strict_types=1);

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Client\Response;

class NoJSONInSteamApiResponseException extends Exception
{
    public function __construct(
        private String $url,
        private Response $response,
    ) {
        parent::__construct("Data received from steam doesn't contain json", 500);
    }

    /**
     * Get the exception's context information.
     *
     * @return array<string, mixed>
     */
    public function context(): array
    {
        return [
            "url" => $this->url,
            "response" => $this->response,
        ];
    }
}
