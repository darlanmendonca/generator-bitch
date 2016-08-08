'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');
let <%= viewEngine %> = require('gulp-<%= viewEngine %>');<% if (appFramework === 'angular') { %>
let flatten = require('gulp-flatten');<% } %>
let config = require('./gulp.config.js');
let plumber = require('gulp-plumber');

gulp.task('views', viewsTask);

function viewsTask() {
  return gulp
    .src(config.views.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(<%= viewEngine %>())
    .pipe(gulp.dest(config.views.dest));
}

function onError(err) {
	let message = new gutil.PluginError(err.plugin, err.message).toString();
  process.stderr.write(message + '\n');
	gutil.beep();
}
