'use strict';

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var generator = process.env.PWD + '/app';

describe('client application', function() {
	describe('scriptType:es6', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				scriptType: 'es6',
				viewEngine: 'jade',
				preprocessor: 'sass',
				appFramework: 'none'
			};

      helpers
        .run(generator)
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
				'client',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test'
				'client/scripts'
			]);
		});
	});

	describe('scriptType:es6:angular:uiRouter', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				scriptType: 'es6',
				viewEngine: 'jade',
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

      helpers
        .run(generator)
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
				'client',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test',
				'client/angular',
				'karma.js'
			]);
		});
	});

	describe('scriptType:es6:angular:ngRoute', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				scriptType: 'es6',
				viewEngine: 'jade',
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

      helpers
        .run(generator)
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
				'client',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test',
				'client/angular',
				'karma.js'
			]);
		});
	});

	describe('scriptType:es5', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				scriptType: 'es5',
				viewEngine: 'jade',
				preprocessor: 'sass',
				appFramework: 'none'
			};

      helpers
        .run(generator)
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
				'client',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test'
				'client/scripts'
			]);

			assert.noFile([
				'karma.js',
				'client/angular'
			]);
		});
	});

	describe('scriptType:es5:angular:uiRouter', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				scriptType: 'es5',
				viewEngine: 'jade',
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

      helpers
        .run(generator)
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
				'client',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test'
				'client/angular',
				'karma.js'
			]);
		});
	});

	describe('scriptType:es5:angular:ngRoute', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				scriptType: 'es5',
				viewEngine: 'jade',
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

      helpers
        .run(generator)
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
				'client',
				'bower.json',
				'gulpfile.js',
				'package.json',
				'public',
				// 'test'
				'client/angular',
				'karma.js'
			]);
		});
	});
});
