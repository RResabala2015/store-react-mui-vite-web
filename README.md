# Transporte - Web template with Vite + Material UI in TypeScript

## How to use

Download the code [or clone the repo](http://git.anai.edu.lan/rresabala/transporte-web.git):

<!-- #default-branch-switch -->

```bash
git clone http://git.anai.edu.lan/rresabala/transporte-web.git
cd transporte
```

## If you develop in a containerized way:
To build and raise the image
```bash
docker compose -f "compose.yml" up -d --build
```
To raise the image
```bash
docker compose -f "compose.yml" up
```
View container logs:
```bash
docker exec -it ${"idContainer"} bash
docker container logs ${"idContainer"} -f
```
Connect to the container:
```bash
docker compose exec frontend bash
```
Or
```bash
docker exec -it ${"idContainer"} bash
```

To restart the image
```bash
docker compose -f "compose.yml" restart
```
To stop the image
```bash
docker compose -f "compose.yml" stop
```
To down the image
```bash
docker compose -f "compose.yml" down -v
```
To delete all
```bash
docker compose -f "compose.yml" down --rmi all
```

Install it and run:

```bash
npm install
npm start
```
