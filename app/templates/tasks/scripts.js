'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');
let babel = require('gulp-babel');<% if (appFramework === 'angular') { %>
let ngAnnotate = require('gulp-ng-annotate');<% } %>
let sourcemaps = require('gulp-sourcemaps');
let config = require('./gulp.config.js');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

gulp.task('scripts', scriptsTask);

function scriptsTask() {
  return gulp
    .src(config.scripts.src)
    .pipe(plumber({errorHandler}))
    .pipe(sourcemaps.init())<% if (appFramework === 'angular') { %>
    .pipe(ngAnnotate())<% } %>
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write({sourceRoot: '/sources/angular'}))
    .pipe(gulp.dest(config.scripts.dest));
}

function errorHandler(err) {
  let message = new gutil.PluginError(err.plugin, err.message).toString();
  process.stderr.write(message + '\n');
  gutil.beep();
}
