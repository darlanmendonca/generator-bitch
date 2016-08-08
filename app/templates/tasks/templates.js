'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');
let <%= viewEngine %> = require('gulp-<%= viewEngine %>');<% if (appFramework === 'angular') { %>
let flatten = require('gulp-flatten');<% } %>
let config = require('./gulp.config.js');
let plumber = require('gulp-plumber');

gulp.task('templates', templatesTask);

function templatesTask() {
  return gulp
    .src(config.templates.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(<%= viewEngine %>())
    .pipe(flatten())
    .pipe(gulp.dest(config.templates.dest));
}

function onError(err) {
  let message = new gutil.PluginError(err.plugin, err.message).toString();
  process.stderr.write(message + '\n');
  gutil.beep();
}
