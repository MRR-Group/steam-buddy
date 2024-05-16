<?php

declare(strict_types=1);

namespace App\Exceptions;

use Exception;

class InvalidSteamApiResponseException extends Exception
{
    public function __construct(
        private String $url,
        private array $validation_error,
        private array $response,
    ) {
        parent::__construct("Data received from steam doesn't match validator rules!", 500);
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
            "errors" => $this->validation_error,
        ];
    }
}
