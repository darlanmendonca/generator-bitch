import {test, assert} from 'yeoman-generator';
const generator = require(`${process.env.PWD}/${process.env.npm_package_main}`);

describe('generate a scaffolding', scaffolding);

function scaffolding() {
  it('no framework, jade, sass', done => {
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
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'README.md',
        'client',
        'bower.json',
        'gulpfile.js',
        'tasks/default.js',
        'tasks/gulp.config.js',
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
        'client/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'client/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('no framework, jade, less', done => {
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
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'README.md',
        'client',
        'bower.json',
        'gulpfile.js',
        'tasks/default.js',
        'tasks/gulp.config.js',
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
        'client/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'client/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('no framework, jade, stylus', done => {
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
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'README.md',
        'client',
        'bower.json',
        'gulpfile.js',
        'tasks/default.js',
        'tasks/gulp.config.js',
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
        'client/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'client/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('no framework, ejs, sass', done => {
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
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'README.md',
        'client',
        'bower.json',
        'gulpfile.js',
        'tasks/default.js',
        'tasks/gulp.config.js',
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
        'client/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'client/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('no framework, ejs, less', done => {
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
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'README.md',
        'client',
        'bower.json',
        'gulpfile.js',
        'tasks/default.js',
        'tasks/gulp.config.js',
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
        'client/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'client/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('no framework, ejs, stylus', done => {
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
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'README.md',
        'client',
        'bower.json',
        'gulpfile.js',
        'tasks/default.js',
        'tasks/gulp.config.js',
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
        'client/scripts',
      ]);

      assert.noFile([
        'karma.js',
        'client/angular',
        'tasks/templates.js',
      ]);

      done();
    }
  });

  it('angular and uiRouter', done => {
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
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'README.md',
        'client',
        'bower.json',
        'gulpfile.js',
        'tasks/default.js',
        'tasks/gulp.config.js',
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
        'client/angular',
        'karma.js',
      ]);
      done();
    }
  });

  it('angular and ngRoute', done => {
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
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'README.md',
        'client',
        'bower.json',
        'gulpfile.js',
        'tasks/default.js',
        'tasks/gulp.config.js',
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
        'client/angular',
        'karma.js',
      ]);
      done();
    }
  });

  it('react', done => {
    const prompts = {
      appName: 'lorem',
      viewEngine: 'jade',
      preprocessor: 'sass',
      appFramework: 'react',
    };

    test
      .run(generator)
      .withPrompts(prompts)
      .on('end', assertion);

    function assertion() {
      assert.file([
        'README.md',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.eslintrc.js',
        'README.md',
        'client',
        'bower.json',
        'gulpfile.js',
        'tasks/default.js',
        'tasks/gulp.config.js',
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
        // 'test',
        'client/react',
      ]);

      assert.noFile([
        'karma.js',
        'client/angular',
        'tasks/templates.js',
      ]);
      done();
    }
  });
}
