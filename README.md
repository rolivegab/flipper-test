## Flipper test - Web Crawler v2
#

### How to use
<br />

Copy .env.model to .env, and fill USERNAME and PASSWORD with your legendas.tv credentials.

Run containers with
```
  docker-compose up -d
```
<br />

Install dependencies with
```
  docker-compose exec node npm i
```
<br />

Execute migrations with
```
  docker-compose exec node npx prisma migrate dev
```
<br />

Spawn one hundred jobs with:
```
  docker-compose exec node npm start -- src/produce
```
<br />

Spawn one worker with (you can spawn multiple workers executing it on different terminals):
```
  docker-compose exec node npm start -- src/worker
```
<br />

# Extras
To run tests:
```
  docker-compose exec node npm t
```
<br />

To view database results:
```
  docker-compose exec node node_modules/.bin/prisma2 studio
```
<br />
