<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\Validator;

class InvalidSteamApiResponseException extends Exception
{
    public function __construct(private String $url, private Validator $validator, private array $response)
    {
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
            "errors" => $this->validator->messages(),
        ];
    }
}
