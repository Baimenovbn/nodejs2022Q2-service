# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Running in docker prerequisites
- Git - [Download & Install Git](https://git-scm.com/downloads).
- Docker - [Download & Install Docker](https://docs.docker.com/desktop/install/mac-install/)  depends on your OS.

### Warning! Use 2nd version of docker-compose. You can change it in Docker Desktop:
 1. Open Docker Desktop
 2. Go to Settings -> General
 3. Check "Use Docker Compose V2" checkbox

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Environment configure
* Change *.env.example* filename to *.env*
* Set necessary variables correspondingly


## Running application


```
npm start
```

## Running in docker:

### Development mode:
1. Open command line (Windows "Fn + R" -> cmd.exe -> "Enter")
2. Go to *root* directory of the project
3. ```docker-compose up```
4. Make steps from Applying migrations section

### Production mode:
1. Open *docker-compose.yml* in *root* dir
2. Delete line 8
3. Change line 13 to command: *npm run start:prod* 
4. ```docker-compose up```
5. Make steps from Applying migrations section


#### Applying migrations:
1. ```docker container ls```
2. Find the CONTAINER_ID of the image with name "nodejs2022q2-service_app"
3. Copy CONTAINER_ID
4. ```docker exec -it CONTAINER_ID /bin/sh```
5. npx prisma migrate dev
6. Enjoy the app

#### Testing the application:
1. ```docker container ls```
2. Find the CONTAINER_ID of the image with name "nodejs2022q2-service_app"
3. Copy CONTAINER_ID
4. ```docker exec -it CONTAINER_ID /bin/sh```
5. ```npm run test```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Vulnerabilities
* ```npm run docker:scan:db``` - check postgresql image
* ```npm run docker:scan:app``` - check app image

## Images: 
* [Postgresql image](https://hub.docker.com/repository/docker/strefian/nodejs2022q2-nestjs-postgresql)
* [App image](https://hub.docker.com/repository/docker/strefian/nodejs2022q2-nestjs)

## To check final size of App image:
* Go to *root* directory of the project
* ```docker build . -t <TAG_NAME>```
* ```docker images -a```
* Check the size of the <TAG_NAME> image

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
