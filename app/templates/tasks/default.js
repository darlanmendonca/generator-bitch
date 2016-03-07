'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');

let tasks = [
	'dependencies',
	'views',
	'browser-sync',
	'sprites',
	'styles',
	'scripts',
	'lint',
	'watch'
];

gulp.task('default', tasks);
