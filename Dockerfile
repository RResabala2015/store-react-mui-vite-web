# syntax=docker/dockerfile:1.4
FROM node:lts-alpine3.20 AS builder
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm ci
COPY . /usr/src/app
RUN npm run build

FROM node:lts-alpine3.20 AS production
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm ci
COPY --from=builder /usr/src/app/dist/. .

EXPOSE 3000
CMD ["npm", "start"]
