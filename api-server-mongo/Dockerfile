FROM node

RUN mkdir /app
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 8000

ENV DOCKER true

CMD ["npm", "run", "start"]
