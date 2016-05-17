'use strict';

let bower = require('bower-files')();

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: [
      'browserify',
      'mocha',
      'chai-as-promised',
      'chai',
    ],

    plugins: [
      'karma-browserify',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai-as-promised',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-coverage',
    ],

    files: bower.dev().relative(__dirname).ext('js').files.concat([
      'client/angular/app.js',
      'client/angular/**/*.js',
    ]),

    exclude: [],

    client: {
      chai: {
        includeStack: true
      },
      mocha: {
        grep: require('shell-arguments').grep || '',
      },
    },

    preprocessors: {
      'client/**/*.js': [
        'browserify',
        'coverage',
      ],
    },

    browserify: {
      debug: false,
      transform: [
        ['babelify', { presets: ['es2015'] }],
      ],
    },

    reporters: [
      'mocha',
      'coverage',
    ],

    mochaReporter: {
      output: 'autowatch',
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    phantomjsLauncher: {
      exitOnResourceError: true
    },

    singleRun: true,
  });
}
