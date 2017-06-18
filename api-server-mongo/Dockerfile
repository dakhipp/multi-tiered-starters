FROM node:7.8-alpine

RUN mkdir /app
WORKDIR /app

COPY . /app

EXPOSE 8000

CMD yarn install ; yarn run start
