FROM node:18.14.0-alpine3.16 AS build

WORKDIR /app

COPY src ./src
COPY package.json ./
COPY vite.config.js ./
COPY index.html ./
COPY public ./public

RUN yarn install &&\
        yarn build

COPY robots.txt ./dist

FROM nginx:1.23.3-alpine AS serve

RUN chown -R nginx:nginx /usr/share/nginx/html

COPY ./docker/default.conf /etc/nginx/conf.d/
COPY --from=build ./app/dist /usr/share/nginx/html

EXPOSE 80