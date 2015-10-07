'use strict';

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

describe('server application', function() {
	describe('scriptType:es6', function() {
		before(function (done) {
			var prompts = {
				appname: 'lorem',
				appType: 'server',
				appSecret: 'lorem',
				scriptType: 'es6'
			};
		  helpers.run(path.join( __dirname, '../app'))
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'app.js',
				'config',
				'controllers',
				'docs',
				'gulpfile.js',
				'helpers',
				'middlewares',
				'models',
				'package.json',
				'routes',
				'test'
			]);

			assert.noFile([
				'bower.json',
				'assets',
				'public',
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
		  helpers.run(path.join( __dirname, '../app'))
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'app.js',
				'config',
				'controllers',
				'docs',
				'gulpfile.js',
				'helpers',
				'middlewares',
				'models',
				'package.json',
				'routes',
				'test'
			]);

			assert.noFile([
				'bower.json',
				'assets',
				'public',
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
		  helpers.run(path.join( __dirname, '../app'))
		    .withPrompts(prompts)
		    .on('end', done);
		});

		it('generate scaffolding', function () {
			assert.file([
				'.editorconfig',
				'.gitignore',
				'.jshintrc',
				'README.md',
				'app.coffee',
				'config',
				'controllers',
				'docs',
				'gulpfile.coffee',
				'helpers',
				'middlewares',
				'models',
				'package.json',
				'routes',
				'test'
			]);

			assert.noFile([
				'bower.json',
				'assets',
				'public',
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
		  helpers.run(path.join( __dirname, '../app'))
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
			]);

			assert.noFile([
				'app.js',
				'config',
				'controllers',
				'docs',
				'helpers',
				'middlewares',
				'models',
				'routes',
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
		  helpers.run(path.join( __dirname, '../app'))
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
			]);

			assert.noFile([
				'app.js',
				'config',
				'controllers',
				'docs',
				'helpers',
				'middlewares',
				'models',
				'routes',
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
		  helpers.run(path.join( __dirname, '../app'))
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
				// 'test'
			]);

			assert.noFile([
				'app.coffee',
				'config',
				'controllers',
				'docs',
				'helpers',
				'middlewares',
				'models',
				'routes',
			]);
		});
	});
});
