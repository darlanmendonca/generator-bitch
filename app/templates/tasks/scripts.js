'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');<% if (scriptType === 'es6') { %>
let babel = require('gulp-babel');<% } %><% if (appFramework === 'angular') { %>
let ngAnnotate = require('gulp-ng-annotate');<% } %><% if (scriptType === 'coffeescript') { %>
let coffee = require('gulp-coffee');<% } %>
let sourcemaps = require('gulp-sourcemaps');
let config = require('./config.js');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

gulp.task('scripts', function() {
	gulp
		.src(config.scripts.src)
		.pipe(plumber(<% if (scriptType !== 'coffeescript') { %>{ errorHandler: onError }<% } %>))
		.pipe(sourcemaps.init())<% if (scriptType === 'coffeescript') { %>
		.pipe(coffee({bare: true}).on('error', onError))<% } %><% if (appFramework === 'angular') { %>
		.pipe(ngAnnotate())<% } %><% if (scriptType === 'es6') { %>
		.pipe(babel())<% } %>
		.pipe(concat('app.js'))
		.pipe(uglify({mangle: false}))
		.pipe(sourcemaps.write({sourceRoot: '/client/angular'}))
		.pipe(gulp.dest(config.scripts.dest));
});

function onError(err) {
	var message;
	switch (err.plugin) {
		default:
			message = new gutil.PluginError(err.plugin, err.message).toString();
			process.stderr.write(message + '\n');
	}
	gutil.beep();
}
