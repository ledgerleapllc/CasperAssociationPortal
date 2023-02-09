FROM node:18.14.0-alpine3.16 as build

WORKDIR /app

COPY src ./src
COPY package.json ./
COPY vite.config.js ./
COPY index.html ./
COPY public ./public
COPY robots.txt ./

RUN yarn install &&\
    yarn build

FROM nginx:1.23.3-alpine as serve

COPY --from=build ./app/dist /usr/share/nginx/html
