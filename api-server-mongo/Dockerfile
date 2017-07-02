FROM node:6-alpine

RUN mkdir /app
WORKDIR /app

COPY . /app

EXPOSE 8000

RUN apk --no-cache add --virtual builds-deps build-base python && yarn install && apk del builds-deps

CMD yarn run start
