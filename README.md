# Puppeteer Docker
Run puppeteer inside docker container on most linux servers

## How to use

For correctly use, you dont need run `npm install` ou `yarn` outside docker, because puppeteer install on your platform insteaxd docker container.

Anyelse change on your puppeteer project, need to run first time steps, we recommend to develop in yout platform and run this container only in production

### First time runing project:
```console
$ rm -rf node_modules
$ docker-compose up --build
```

### Next times:

```console
$ docker-compose up
```

## NOTE: 

- This node app use app.js as entrypoint, to change it edit Dockerfile `CMD ["concurrently","node ./app.js"]` with your entrypoint
- Your puppeteer project need to args provided in app.js: 
```typescript
  const browser = await puppeteer.launch(
    {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  );
```