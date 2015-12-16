'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');
let jshint = require('gulp-jshint');
let stylish = require('jshint-stylish');
let beep = ()=>	gutil.beep();
let config = require('./config.js');

gulp.task('lint', function() {
	gulp
		.src(config.lint)
		.pipe(jshint())
		.pipe(jshint.reporter(beep))
		.pipe(jshint.reporter(stylish));
});
