var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var ejs = require('gulp-ejs');

var templates = './app/templates/**/*.js';
gulp.task('jshint', function() {
  gulp
    .src(templates)
    .pipe(ejs().on('error', gutil.log))
    .pipe(jshint())
    .pipe(jshint.reporter(gutil.beep()))
    .pipe(jshint.reporter(stylish));
});

gulp.task('lint', ['jshint'], function() {
  gulp.watch(templates, ['jshint']);
});
