'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var scripts = [
	'./test/*.js',
	'./gulpfile.js'
];

gulp.task('jshint', function() {
  gulp
    .src(scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
  gulp.watch(scripts, ['jshint']);
});

gulp.task('default', [
	'jshint',
	'watch'
]);
