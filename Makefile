init: check-env-file
	@docker compose build

check-env-file:
	@if [ ! -f ".env" ]; then \
	  echo "Create .env file and adjust." ;\
	  exit 1;\
	fi; \

dev:
	@docker compose up -d
	@docker compose exec node npm run dev

populate:
	@docker compose exec php php artisan migrate:fresh
	@docker compose exec php php artisan db:seed
	@docker compose exec php sh -c 'php artisan app:import-tags < ./tags.csv'

queue:
	@docker compose exec php php artisan queue:work

stop:
	@docker compose stop

node:
	@docker compose exec -it node bash

php:
	@docker compose exec -it php bash

test:
	@docker compose exec php composer test
	@docker compose exec node npm test

fix:
	@docker compose exec -t php composer csf
	@docker compose exec -t node npm run lintf

prod:
	@docker compose -f ./docker-compose.prod.yml up -d
	@docker compose -f ./docker-compose.prod.yml exec -it php bash /app/docker/production/php/init.sh
	@docker compose -f ./docker-compose.prod.yml exec -it node bash /app/docker/production/node/init.sh
	@docker compose -f ./docker-compose.prod.yml exec -it php bash

prod-down:
	@docker compose -f ./docker-compose.prod.yml down

.PHONY: init check-env-file run dev stop node php test fix actions prod-down prod-download prod-update
