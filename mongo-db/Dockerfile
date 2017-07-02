FROM mongo:latest

RUN mkdir /temp

COPY . /temp

RUN . /temp/setup.sh

RUN rm -rf /temp

CMD mongod --auth
