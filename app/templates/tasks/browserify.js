'use strict';

let gulp = require('gulp');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let glob = require('glob-array');
let config = require('./gulp.config.js');
let ngAnnotate = require('gulp-ng-annotate');
let sourcemaps = require('gulp-sourcemaps');
let babel = require('gulp-babel');
// let uglify = require('gulp-uglify');

let options = {
  entries: glob.sync(config.scripts.src),
  debug: true,
};

gulp.task('browserify', browserifyTask);

function browserifyTask() {
  return browserify(options)
    .bundle()
    .on('error', error)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ngAnnotate())
    .pipe(babel())
    // .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.scripts.dest));
}

function error(err) {
  let gutil = require('gulp-util');
  gutil.log(err);
}
