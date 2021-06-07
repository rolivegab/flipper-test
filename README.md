## Flipper test - Web Crawler v2
#

### How to use
<br />

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

#

To run tests:
```
  docker-compose exec node npm t
```
<br />
