#!/bin/bash

chown -R www-data:www-data /app/storage

composer install

php artisan key:generate
php artisan migrate
php artisan cache:clear
php artisan config:clear
