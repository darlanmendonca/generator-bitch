'use strict';

let gulp = require('gulp');
let <%= viewEngine %> = require('gulp-<%= viewEngine %>');
let flatten = require('gulp-flatten');
let config = require('./config.js');
let plumber = require('gulp-plumber');

gulp.task('views', function() {
	gulp
		.src(config.views.src)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(<%= viewEngine %>())<% if (appType === 'client') { %>
		.pipe(gulp.dest(config.views.dest))<% } %>;<% if ((appType === 'client' || appType === 'both') && appFramework === 'angular') { %>

	gulp
		.src(config.templates.src)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(<%= viewEngine %>())
		.pipe(flatten())
		.pipe(gulp.dest(config.templates.dest));<% } %>
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
