# ASSIGNMENT

It is a test project for job interview.

## Building and running on localhost

First install dependencies:

```sh
yarn install
```

To create a production build:

```sh
yarn build-prod
```

To create a development build:

```sh
yarn build-dev
```

## Running

For Debug and Development mode

```sh
yarn serve
```

For Production mode, firstly build on production mode. After:

```sh
cd dist && npx http-server
```

## Project Description

src folder of project contains application's main codes.

When build project, webpack copies `index.html`, `main.css` and `assets` folders to /dist.  

`scorplib` folder contains libraries provided by company.

`transferobjects` folder contains `types` of added by developer. There is just `Queue` type in this folder.

`handlers` folder contains `APIEventHandler` class and `DisplayHandler`. 
-   `APIEventHandler` class is handling data provided by `api.js``
-   The task of the `DisplayHandling` function is to handle the data to be displayed on the screen.