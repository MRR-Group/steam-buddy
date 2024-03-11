#!/bin/bash

cd /app

composer update

php artisan key:generate
php artisan cache:clear
php artisan config:clear

chown -R www-data:www-data /app/storage

php-fpm
