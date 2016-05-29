# angularjs-typescript-webpack starter

This project is an application skeleton for [AngularJS](http://angularjs.org/) 1.5 web app using new component syntax and typescript.

It uses two different bunling systems webpack and systemjs, use the appropriate branch.

Webpack branch has support for importing sass styles inline in the modules, for system js external stylesheets should be used, it has support for inline imports only with jspm.

## Getting Started

To get you started you can simply clone the angularjs-typescript-webpack repository and install the dependencies:

### Prerequisites

You need git to clone the angularjs-typescript-webpack repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

Install these globally:

```
npm install -g webpack webpack-dev-server typings
```

### Clone angularjs-typescript-webpack

Clone the angularjs-typescript-webpack repository using git:

### Install Dependencies

We have two kinds of dependencies in this project: development tools and application specific packages. They are both managed with npm in package.json as devDependencies and dependencies respectively.

```
npm install
```

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8080/`.



## Directory Layout

```
src/                    --> all of the source files for the application
  components/           --> all app specific modules
  services/                --> all app common services
  assets/                --> all of the app static assets
  main.ts                --> main application module
  index.html            --> app layout file (the main html template file of the app)
```

### Running the App during Development

Typescript development is dependant on typings project, that need to be installed globally prior to development.

```
sudo npm install -g typings
```

The angularjs-typescript-webpack project comes preconfigured with a local development webserver. It is a webpack-dev-server, that supports hot reload.  You can start this webserver with `npm start`.

### Building and running the App in Production

To build the application for production just run `npm bundle`, it creates dist directory that have the production optimized build.
