'use strict';

var _yeomanGenerator = require('yeoman-generator');

var generator = require(process.env.PWD + '/' + process.env.npm_package_main);

describe('generate a scaffolding', scaffolding);

function scaffolding() {
  it('no framework, jade, sass', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'ejs',
      preprocessor: 'sass',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'client/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'client/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('no framework, jade, less', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'less',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'client/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'client/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('no framework, jade, stylus', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'stylus',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'client/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'client/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('no framework, ejs, sass', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'ejs',
      preprocessor: 'sass',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'client/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'client/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('no framework, ejs, less', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'ejs',
      preprocessor: 'less',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'client/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'client/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('no framework, ejs, stylus', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'ejs',
      preprocessor: 'stylus',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'client/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'client/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('angular and uiRouter', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'angular',
      frameworkModules: ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch'],
      angularRoute: 'uiRouter'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/templates.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test',
      'client/angular', 'karma.js']);
      done();
    }
  });

  it('angular and ngRoute', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'angular',
      frameworkModules: ['ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch'],
      angularRoute: 'ngRoute'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/templates.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test',
      'client/angular', 'karma.js']);
      done();
    }
  });

  it('react', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'react'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'client', 'bower.json', 'gulpfile.js', 'tasks/default.js', 'tasks/gulp.config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test',
      'client/react']);

      _yeomanGenerator.assert.noFile(['karma.js', 'client/angular', 'tasks/templates.js']);
      done();
    }
  });
}
