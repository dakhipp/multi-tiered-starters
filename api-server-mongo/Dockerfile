FROM node:7.8-alpine

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 8000

CMD npm run start
