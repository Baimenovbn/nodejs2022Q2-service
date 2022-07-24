# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Running in docker prerequisites
- Git - [Download & Install Git](https://git-scm.com/downloads).
- Docker - [Download & Install Docker](https://docs.docker.com/desktop/install/mac-install/)  depends on your OS

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Environment configuring
* Change *.env.example* filename to *.env*
* Set necessary variables correspondingly


## Running application


```
npm start
```

## Running in docker:

### Development mode:
* Go to *root* directory of the project
* ```docker-compose up```
* Enjoy the app

### Production mode:
* Open *docker-compose.yml* in *root* dir
* Delete line 8
* Change line 13 to command: *npm run start:prod* 
* ```docker-compose up```
* Enjoy the app

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
