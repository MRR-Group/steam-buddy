#!/bin/bash

cd /app

composer install

php artisan key:generate
php artisan cache:clear
php artisan config:clear
php artisan cloudflare:reload

chown -R www-data:www-data /app/storage

php-fpm
