<?php

declare(strict_types=1);

namespace App\Utilities;

class InputStream
{
    public function get(): string
    {
        return file_get_contents("php://stdin");
    }
}
