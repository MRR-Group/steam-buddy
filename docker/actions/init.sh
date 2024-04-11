#!/bin/bash

cp /app/.env.actions /app/.env
echo " " > /app/database.sqlite 

composer install

npm install
npm run build

php artisan key:generate
php artisan migrate
php artisan cache:clear
php artisan config:clear

