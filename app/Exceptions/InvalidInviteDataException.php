<?php

namespace App\Exceptions;

use Exception;

class InvalidInviteDataException extends Exception
{
    public function __construct()
    {
        parent::__construct("Cannot accept rejected invite!", 400);
    }
}
