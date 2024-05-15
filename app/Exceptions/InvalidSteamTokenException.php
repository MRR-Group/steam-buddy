<?php

declare(strict_types=1);

namespace App\Exceptions;

use Exception;

class InvalidSteamTokenException extends Exception
{
    public function __construct()
    {
        parent::__construct("Invalid SteamApi token!", 500);
    }
}
