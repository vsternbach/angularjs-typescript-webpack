System.config({
  baseURL: "/",
  defaultJSExtensions: false,
  transpiler: "typescript",
  paths: {
    "npm:*": "node_modules/*"
  },
  map: {
    "angular": "npm:angular/angular.js",
    "angular-ui-router": "npm:angular-ui-router/release/angular-ui-router.js",
    "angular-sanitize": "npm:angular-sanitize/angular-sanitize.js",
    "typescript": "npm:typescript/lib/typescript.js"
  },
  sassPluginOptions: {
    "autoprefixer": true
  },
  meta: {
    'angular': {
      format: 'global',
      exports: 'angular'
    },
    'angular-sanitize': {
      format: 'global'
    },
    'angular-ui-router': {
      format: 'global'
    }
  },
  packages: {
    "app": {
      "defaultExtension": "ts"
    }
  }
});