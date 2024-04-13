chown -R www-data:www-data /app/storage

composer install

cp /build /app/public

php artisan migrate
php artisan cloudflare:reload

