init: check-env-file
	@docker compose build

check-env-file:
	@if [ ! -f ".env" ]; then \
	  echo "Create .env file and adjust." ;\
	  exit 1;\
	fi; \

build:
	@docker-compose down
	@docker-compose -f ./docker-compose.prod.yml build
	@docker-compose -f ./docker-compose.prod.yml up -d

dev:
	@docker compose up -d
	@docker compose exec node npm run dev

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


.PHONY: init check-env-file run dev stop node php test fix