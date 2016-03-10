'use strict';

let gulp = require('gulp');
let config = require('./config.js');
let eslint = require('gulp-eslint');

gulp.task('lint', lintTask);

function lintTask() {
  return gulp
    .src(config.lint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', beep);
}

function beep() {
  let gutil = require('gulp-util');
  gutil.beep();
}
