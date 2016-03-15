'use strict';

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var generator = process.env.PWD + '/app/index.es5.js';

describe('generate a scaffolding', function () {
  describe('in ecma 6', ecma6Test);
  describe('in ecma 5', ecma5Test);
});

function ecma6Test() {
  it('without frameworks', function (done) {
    var prompts = {
      appName: 'lorem',
      scriptType: 'es6',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'none'
    };

    helpers.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'client/scripts']);

      assert.noFile(['karma.js', 'client/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('angular and uiRouter', function (done) {
    var prompts = {
      appName: 'lorem',
      scriptType: 'es6',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'angular',
      frameworkModules: ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch'],
      angularRoute: 'uiRouter'
    };

    helpers.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/templates.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test',
      'client/angular', 'karma.js']);
      done();
    }
  });

  it('angular and ngRoute', function (done) {
    var prompts = {
      appName: 'lorem',
      scriptType: 'es6',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'angular',
      frameworkModules: ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch'],
      angularRoute: 'ngRoute'
    };

    helpers.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/templates.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test',
      'client/angular', 'karma.js']);
      done();
    }
  });
}

function ecma5Test() {
  it('without frameworks', function (done) {
    var prompts = {
      appName: 'lorem',
      scriptType: 'es5',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'none'
    };

    helpers.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'client/scripts']);

      assert.noFile(['karma.js', 'client/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('angular and uiRouter', function (done) {
    var prompts = {
      appName: 'lorem',
      scriptType: 'es5',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'angular',
      frameworkModules: ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch'],
      angularRoute: 'uiRouter'
    };

    helpers.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/templates.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'client/angular', 'karma.js']);
      done();
    }
  });

  it('angular and ngRoute', function (done) {
    var prompts = {
      appName: 'lorem',
      scriptType: 'es5',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'angular',
      frameworkModules: ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch'],
      angularRoute: 'ngRoute'
    };

    helpers.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/templates.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'client/angular', 'karma.js']);
      done();
    }
  });
}
