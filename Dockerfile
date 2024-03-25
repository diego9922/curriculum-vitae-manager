FROM node:20

COPY ./ /node/home/
WORKDIR /node/home/

RUN npm install