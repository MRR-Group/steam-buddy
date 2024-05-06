<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class CSVParsingException extends Exception
{
    public function __construct(string $line, int $code = 1, Throwable|null $previous = null)
    {
        parent::__construct('CSV parsing error. Line: "' . $line . '" is invalid or empty!', $code, $previous);
    }
}
