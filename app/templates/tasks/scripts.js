'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');<% if (scriptType === 'es6') { %>
let babel = require('gulp-babel');<% } %><% if (appFramework === 'angular') { %>
let ngAnnotate = require('gulp-ng-annotate');<% } %>
let sourcemaps = require('gulp-sourcemaps');
let gulpConfig = require('./gulp.config.js');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

gulp.task('scripts', function() {
	gulp
		.src(gulpConfig.scripts.src)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sourcemaps.init())<% if (appFramework === 'angular') { %>
		.pipe(ngAnnotate())<% } %><% if (scriptType === 'es6') { %>
		.pipe(babel())<% } %>
		.pipe(concat('app.js'))
		.pipe(uglify({mangle: false}))
		.pipe(sourcemaps.write({sourceRoot: '/client/angular'}))
		.pipe(gulp.dest(gulpConfig.scripts.dest));
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
