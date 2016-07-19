const gulp = require('gulp');
const config = require('./config.js');
const eslint = require('gulp-eslint');

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
  const gutil = require('gulp-util');
  gutil.beep();
}
