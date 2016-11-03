'use strict';

var _yeomanGenerator = require('yeoman-generator');

var packageJSON = require(process.env.PWD + '/package.json');
var generator = process.env.PWD + '/' + packageJSON.main;

describe('generate a scaffolding', scaffolding);

function scaffolding() {
  describe('just javascript pure', noFrameworkJavascriptTests);
  describe('angular', angularTests);
}

function noFrameworkJavascriptTests() {
  it('with ejs, sass', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'ejs',
      preprocessor: 'sass',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.babelrc', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'sources', 'bower.json', 'gulpfile.babel.js', 'tasks/default.js', 'tasks/config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'sources/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'sources/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('with ejs, less', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'ejs',
      preprocessor: 'less',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.babelrc', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'sources', 'bower.json', 'gulpfile.babel.js', 'tasks/default.js', 'tasks/config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'sources/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'sources/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('with ejs, stylus', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'ejs',
      preprocessor: 'stylus',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.babelrc', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'sources', 'bower.json', 'gulpfile.babel.js', 'tasks/default.js', 'tasks/config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'sources/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'sources/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('with jade, sass', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.babelrc', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'sources', 'bower.json', 'gulpfile.babel.js', 'tasks/default.js', 'tasks/config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'sources/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'sources/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('with jade, less', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'less',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.babelrc', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'sources', 'bower.json', 'gulpfile.babel.js', 'tasks/default.js', 'tasks/config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'sources/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'sources/angular', 'tasks/templates.js']);

      done();
    }
  });

  it('with jade, stylus', function (done) {
    var prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'stylus',
      appFramework: 'none'
    };

    _yeomanGenerator.test.run(generator).withPrompts(prompts).on('end', assertion);

    function assertion() {
      _yeomanGenerator.assert.file(['README.md', '.babelrc', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'sources', 'bower.json', 'gulpfile.babel.js', 'tasks/default.js', 'tasks/config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test'
      'sources/scripts']);

      _yeomanGenerator.assert.noFile(['karma.js', 'sources/angular', 'tasks/templates.js']);

      done();
    }
  });
}

function angularTests() {
  it('with uiRouter', function (done) {
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
      _yeomanGenerator.assert.file(['README.md', '.babelrc', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'sources', 'bower.json', 'gulpfile.babel.js', 'tasks/default.js', 'tasks/config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/templates.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test',
      'sources/angular', 'karma.js']);
      done();
    }
  });

  it('with ngRoute', function (done) {
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
      _yeomanGenerator.assert.file(['README.md', '.babelrc', '.bowerrc', '.editorconfig', '.gitignore', '.eslintrc.js', 'README.md', 'sources', 'bower.json', 'gulpfile.babel.js', 'tasks/default.js', 'tasks/config.js', 'tasks/lint.js', 'tasks/browser-sync.js', 'tasks/scripts.js', 'tasks/sprite-images.js', 'tasks/styles.js', 'tasks/vendorCSS.js', 'tasks/vendorJS.js', 'tasks/views.js', 'tasks/templates.js', 'tasks/watch.js', 'package.json', 'public',
      // 'test',
      'sources/angular', 'karma.js']);
      done();
    }
  });
}
