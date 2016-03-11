'use strict';

let gulp = require('gulp');
let bower = require('bower-files')();
let minifyCss = require('gulp-minify-css');
let concat = require('gulp-concat');

gulp.task('vendorCSS', vendorCSSTask);

function vendorCSSTask() {
  return gulp
    .src(bower.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(minifyCss({keepSpecialComments: 0}))
    .pipe(gulp.dest('./public/styles'));
}
