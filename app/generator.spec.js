import {test, assert} from 'yeoman-generator';

const packageJSON = require(`${process.env.PWD}/package.json`);
const generator = `${process.env.PWD}/${packageJSON.main}`;

describe('generate a scaffolding', scaffolding);

function scaffolding() {
  describe('pure javascript', noFrameworkJavascriptTests);
  describe('angular', angularTests);
}

function noFrameworkJavascriptTests() {
  it('jade, sass', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'none',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test'
        'sources/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'sources/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('jade, less', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'less',
      appFramework: 'none',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test'
        'sources/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'sources/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('jade, stylus', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'stylus',
      appFramework: 'none',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test'
        'sources/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'sources/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('ejs, sass', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'ejs',
      preprocessor: 'sass',
      appFramework: 'none',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test'
        'sources/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'sources/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('ejs, less', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'ejs',
      preprocessor: 'less',
      appFramework: 'none',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test'
        'sources/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'sources/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('ejs, stylus', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'ejs',
      preprocessor: 'stylus',
      appFramework: 'none',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test'
        'sources/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'sources/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('html, sass', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'html',
      preprocessor: 'sass',
      appFramework: 'none',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test'
        'sources/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'sources/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('html, less', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'html',
      preprocessor: 'less',
      appFramework: 'none',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test'
        'sources/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'sources/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('html, stylus', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'html',
      preprocessor: 'stylus',
      appFramework: 'none',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test'
        'sources/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'sources/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });
}

function angularTests() {
  it('uiRouter', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'angular',
      frameworkModules: [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
      ],
      angularRoute: 'uiRouter',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/templates.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test',
        'sources/angular',
        'karma.js',
      ]);
      done();
    }
  });

  it('ngRoute', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'angular',
      frameworkModules: [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
      ],
      angularRoute: 'ngRoute',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.yo-rc.json',
        '.babelrc',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'sources',
        'bower.json',
        'gulpfile.babel.js',
        'tasks/default.js',
        'tasks/config.js',
        'tasks/lint.js',
        'tasks/browser-sync.js',
        'tasks/scripts.js',
        'tasks/sprite-images.js',
        'tasks/styles.js',
        'tasks/vendorCSS.js',
        'tasks/vendorJS.js',
        'tasks/views.js',
        'tasks/templates.js',
        'tasks/watch.js',
        'package.json',
        'public',
        // 'test',
        'sources/angular',
        'karma.js',
      ]);
      done();
    }
  });
}
