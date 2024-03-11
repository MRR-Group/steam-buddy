<?php

declare(strict_types=1);

use Blumilk\Codestyle\Config;
use Blumilk\Codestyle\Configuration\Defaults\LaravelPaths;

$config = new Config(
    paths: new LaravelPaths(LaravelPaths::LARAVEL_8_PATHS),
);

return $config->config();
