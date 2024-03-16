FROM node:20-alpine

RUN apk update
RUN apk --no-cache add bash git

COPY ./docker/development/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
