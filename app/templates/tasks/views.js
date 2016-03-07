'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');
let <%= viewEngine %> = require('gulp-<%= viewEngine %>');
let flatten = require('gulp-flatten');
let gulpConfig = require('./gulp.config.js');
let plumber = require('gulp-plumber');

gulp.task('views', function() {
	gulp
		.src(gulpConfig.views.src)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(<%= viewEngine %>())<% if (appType === 'client') { %>
		.pipe(gulp.dest(gulpConfig.views.dest))<% } %>;<% if ((appType === 'client') && appFramework === 'angular') { %>

	gulp
		.src(gulpConfig.templates.src)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(<%= viewEngine %>())
		.pipe(flatten())
		.pipe(gulp.dest(gulpConfig.templates.dest));<% } %>
});

function onError(err) {
	var message;
	switch (err.plugin) {
		case '<%= viewEngine %>':
			message = new gutil.PluginError('<%= viewEngine %>', err.message).toString();
			process.stderr.write(message + '\n');
			break;
		default:
			message = new gutil.PluginError(err.plugin, err.message).toString();
			process.stderr.write(message + '\n');
	}
	gutil.beep();
}
