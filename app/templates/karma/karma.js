import bowerFiles from 'bower-files';
import shellArugments from 'shell-arguments';

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

    files: bowerFiles().dev().relative(__dirname).ext('js').files.concat([
      'sources/angular/app.js',
      'sources/angular/**/*.js',
    ]),

    exclude: [],

    client: {
      chai: {
        includeStack: true
      },
      mocha: {
        grep: shellArguments.grep || '',
      },
    },

    preprocessors: {
      'sources/**/*.js': [
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
