FROM node:20-alpine

RUN apk update
RUN apk --no-cache add bash git

COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

ENTRYPOINT ["docker-entrypoint.sh"]