'use strict';

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var generator = process.env.PWD + '/app';

describe('server application', function() {
	describe('scriptType:es6', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'server',
				appSecret: 'lorem',
				scriptType: 'es6'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'server',
				'config.js',
				'server/controllers.js',
				'server/docs',
				'gulpfile.js',
				'server/middlewares.js',
				'package.json',
				'server/routes',
				'test'
			]);

			assert.noFile([
				'bower.json',
				'assets',
				'public',
				'karma.js'
			]);
		});
	});

	describe('scriptType:es5', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'server',
				appSecret: 'lorem',
				scriptType: 'es5'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'server',
				'config.js',
				'server/controllers.js',
				'server/docs',
				'gulpfile.js',
				'server/middlewares.js',
				'package.json',
				'server/routes',
				'test'
			]);

			assert.noFile([
				'bower.json',
				'assets',
				'public',
				'karma.js'
			]);
		});
	});

	describe('scriptType:coffeescript', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'server',
				appSecret: 'lorem',
				scriptType: 'coffeescript'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'server/app.coffee',
				'config.coffee',
				'server/controllers.coffee',
				'server/docs',
				'gulpfile.coffee',
				'server/middlewares.coffee',
				'package.json',
				'server/routes',
				'test'
			]);

			assert.noFile([
				'bower.json',
				'assets',
				'public',
				'karma.coffee'
			]);
		});
	});
});

describe('client application', function() {
	describe('scriptType:es6', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'client',
				scriptType: 'es6',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'none'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test'
				'assets/scripts'
			]);

			assert.noFile([
				'server',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes',
				'assets/angular',
				'karma.js'
			]);
		});
	});

	describe('scriptType:es6:angular:uiRouter', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'client',
				scriptType: 'es6',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'angular',
				frameworkModules: [
					'ngAnimate',
					'ngCookies',
					'ngResource',
					'ngSanitize',
					'ngTouch'
				],
				angularRoute: 'uiRouter'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test',
				'assets/angular',
				'karma.js'
			]);

			assert.noFile([
				'server',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes'
			]);
		});
	});

	describe('scriptType:es6:angular:ngRoute', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'client',
				scriptType: 'es6',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'angular',
				frameworkModules: [
					'ngAnimate',
					'ngCookies',
					'ngResource',
					'ngSanitize',
					'ngTouch'
				],
				angularRoute: 'ngRoute'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test',
				'assets/angular',
				'karma.js'
			]);

			assert.noFile([
				'server',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes'
			]);
		});
	});

	describe('scriptType:es5', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'client',
				scriptType: 'es5',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'none'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test'
				'assets/scripts'
			]);

			assert.noFile([
				'server',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes',
				'karma.js',
				'assets/angular'
			]);
		});
	});

	describe('scriptType:es5:angular:uiRouter', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'client',
				scriptType: 'es5',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'angular',
				frameworkModules: [
					'ngAnimate',
					'ngCookies',
					'ngResource',
					'ngSanitize',
					'ngTouch'
				],
				angularRoute: 'uiRouter'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test'
				'assets/angular',
				'karma.js'
			]);

			assert.noFile([
				'server',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes'
			]);
		});
	});

	describe('scriptType:es5:angular:ngRoute', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'client',
				scriptType: 'es5',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'angular',
				frameworkModules: [
					'ngAnimate',
					'ngCookies',
					'ngResource',
					'ngSanitize',
					'ngTouch'
				],
				angularRoute: 'ngRoute'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test'
				'assets/angular',
				'karma.js'
			]);

			assert.noFile([
				'server',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes'
			]);
		});
	});

	describe('scriptType:coffeescript', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'client',
				scriptType: 'coffeescript',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'none'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'config.coffee',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.coffee',
				'package.json',
				'public',
				// 'test'
				'assets/scripts'
			]);

			assert.noFile([
				'app.coffee',
				'config.js',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes',
				'karma.coffee',
				'assets/angular'
			]);
		});
	});

	describe('scriptType:coffeescript:angular:uiRouter', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'client',
				scriptType: 'coffeescript',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'angular',
				frameworkModules: [
					'ngAnimate',
					'ngCookies',
					'ngResource',
					'ngSanitize',
					'ngTouch'
				],
				angularRoute: 'uiRouter'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'config.coffee',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.coffee',
				'package.json',
				'public',
				// 'test',
				'assets/angular',
				'karma.coffee'
			]);

			assert.noFile([
				'app.coffee',
				'config.js',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes',
			]);
		});
	});

	describe('scriptType:coffeescript:angular:ngRoute', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'client',
				scriptType: 'coffeescript',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'angular',
				frameworkModules: [
					'ngAnimate',
					'ngCookies',
					'ngResource',
					'ngSanitize',
					'ngTouch'
				],
				angularRoute: 'ngRoute'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'config.coffee',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.coffee',
				'package.json',
				'public',
				// 'test',
				'assets/angular',
				'karma.coffee'
			]);

			assert.noFile([
				'app.coffee',
				'config.js',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes',
			]);
		});
	});
});

describe('fullstack application', function() {
	describe('scriptType:es6', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'both',
				scriptType: 'es6',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'none'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				'test',
				'server',
				'config.js',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes',
			]);

			assert.noFile([
				'karma.js'
			]);
		});
	});

	describe('scriptType:es5', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'both',
				scriptType: 'es5',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'none'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				'test',
				'server',
				'config.js',
				'server/controllers.js',
				'server/docs',
				'server/middlewares.js',
				'server/routes',
			]);

			assert.noFile([
				'karma.js'
			]);
		});
	});

	describe('scriptType:coffeescript', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'both',
				scriptType: 'coffeescript',
				viewEngine:'jade',
				preprocessor: 'sass',
				appFramework: 'none'
			};
		  helpers.run(generator)
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'README.md',
				'.bowerrc',
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'assets',
				'bower.json',
				'gulpfile.coffee',
				'package.json',
				'public',
				'test',
				'server/app.coffee',
				'config.coffee',
				'server/controllers.coffee',
				'server/docs',
				'server/middlewares.coffee',
				'server/routes',
			]);

			assert.noFile([
				'karma.coffee'
			]);
		});
	});
});
