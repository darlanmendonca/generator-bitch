'use strict';

let gulp = require('gulp');
let bower = require('bower-files')();
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

gulp.task('vendorJS', vendorJSTask);

function vendorJSTask() {
  let dependencies = bower.ext('js').files;

  return gulp
    .src(dependencies)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts'));
}
