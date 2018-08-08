// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const webpack = require('./webpack.test');
// webpackConfig.mode = 'test';
// webpackConfig.entry = 'test/test.ts';
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    browsers: ['headlessChrome'],
    customLaunchers: {
      headlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack')
      // require('karma-jasmine-html-reporter'),
      // require('karma-coverage-istanbul-reporter'),
      // require('@angular/cli/plugins/karma')
      // require('@angular-devkit/build-angular')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    files: [
      'node_modules/jquery/dist/jquery.js',
      'src/test.ts'
      // 'src/**/*.spec.ts'
    ],
    preprocessors: {
      // 'web/**/*.ts': ['webpack'],
      'src/test.ts': ['webpack'],
      // 'test/test.js': ['webpack'],
      // 'web/ui-framework/**/*.js': ['webpack'],
      // 'test/testing-utils/*.ts': ['karma-typescript'],
    },
    webpack,
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
  });
};
