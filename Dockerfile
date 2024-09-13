# syntax=docker/dockerfile:1.4
FROM node:lts-alpine3.20 AS builder
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm ci
COPY . /usr/src/app
RUN npm run build:client

FROM nginx:stable-alpine-slim AS production
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY ./etc/docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
