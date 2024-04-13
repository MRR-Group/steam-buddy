FROM node:20-alpine AS frontend

RUN apk update
RUN apk --no-cache add bash git

COPY . /app
COPY ./.env.example /app/.env
WORKDIR /app
RUN npm install
RUN npm run build

ENTRYPOINT ["docker-entrypoint.sh"]

FROM php:8.2-fpm-alpine3.16

COPY --from=composer/composer:2.4.4 /usr/bin/composer /usr/bin/composer

RUN apk update
RUN apk --no-cache add bash zip git libzip-dev libpng-dev libpq-dev

RUN docker-php-ext-install zip gd pdo pdo_pgsql
RUN docker-php-ext-configure zip

COPY --from=frontend /app/public /build
WORKDIR /app

ENTRYPOINT ["php-fpm"]