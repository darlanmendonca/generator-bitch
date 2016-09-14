'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');
let bower = require('bower-files')();
let path = require('path');
let dependencies = bower.relative(path.join(__dirname, '..')).ext('scss').files;
let inject = require('gulp-inject');
let util = require('util');
let <%= preprocessor %> = require('gulp-<%= preprocessor %>');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let config = require('./gulp.config.js');
let plumber = require('gulp-plumber');

let injectTransform = {
  starttag: '/* inject:imports */',
  endtag: '/* endinject */',
  transform: filepath => `@import '../..${filepath}';`,
};

let injectConfig = {
  read: false,
  relative: false
};<% if (preprocessor === 'sass') { %>

let outputStyle = 'compressed';<% } %><% if (preprocessor === 'less' || preprocessor === 'stylus') { %>
let compress = true<% } %>

gulp.task('styles', stylesTask);

function stylesTask() {
  gulp
    .src(config.styles.src)
    .pipe(plumber({errorHandler}))
    .pipe(inject(gulp.src(dependencies, injectConfig), injectTransform))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(config.browserSync.stream({match: '**/*.css'}));
}

function errorHandler(err) {
  let message = new gutil.PluginError(err.plugin, err.message).toString();
  process.stderr.write(message + '\n');
  gutil.beep();
}
