<?php

namespace App\Exceptions;

use Exception;

class GameNotFoundException extends Exception
{
    public function __construct()
    {
        parent::__construct("Game not found!", 404);
    }
}
