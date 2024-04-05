#!/bin/bash

cd /app

npm install
npm run build

docker-entrypoint.sh