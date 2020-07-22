FROM node:10

WORKDIR /usr/src/airbnb_suggestions

COPY ./ ./

RUN npm install
