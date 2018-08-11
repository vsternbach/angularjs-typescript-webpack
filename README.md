# angularjs-typescript-webpack starter

[![Greenkeeper badge](https://badges.greenkeeper.io/vsternbach/angularjs-typescript-webpack.svg)](https://greenkeeper.io/)

This project is an application skeleton for [AngularJS](http://angularjs.org/) 1.7, typescript 2.9 and webpack 4.5

Project uses [angular-ts-decorators](https://github.com/vsternbach/angular-ts-decorators) to mimic angular 2+ style development in angularjs environment with typescript and webpack.

## Getting Started

To get you started you can simply clone the angularjs-typescript-webpack repository.

Some of the project dependencies are used just for example and can be removed if not needed. 

### Clone angularjs-typescript-webpack

Clone the angularjs-typescript-webpack repository using git:

### Install Dependencies

We have two kinds of dependencies in this project: development tools and application specific packages. They are both managed with npm in package.json as devDependencies and dependencies respectively.

```
npm install
```

## Directory Layout

```
src/                    --> all of the source files for the application
  assets/           --> static app assets
  components/           --> all app specific modules
  services/                --> all app common services
  main.ts                --> main application module
  index.html            --> app layout file (the main html template file of the app)
```

### Running the App during Development

The angularjs-typescript-webpack project comes preconfigured with a local development webserver. It is a webpack-dev-server, that supports hot reload.  You can start this webserver with `npm start`.

Now browse to the app at `http://localhost:3000/`.

### Building and running the App in Production

To build the application for production just run `npm build`, it creates dist directory that have the production optimized build.
