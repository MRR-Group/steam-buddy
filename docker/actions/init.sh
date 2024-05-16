#!/bin/bash

cp /app/.env.actions /app/.env
chown -R www-data:www-data /app/storage

composer install

npm install
npm run build

php artisan key:generate
php artisan migrate
php artisan cache:clear
php artisan config:clear