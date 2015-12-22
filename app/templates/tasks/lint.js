'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');
let jshint = require('gulp-jshint');
let stylish = require('jshint-stylish');
let beep = ()=>	gutil.beep();
let gulpConfig = require('./gulp.config.js');

gulp.task('lint', function() {
	gulp
		.src(gulpConfig.lint)
		.pipe(jshint())
		.pipe(jshint.reporter(beep))
		.pipe(jshint.reporter(stylish));
});
