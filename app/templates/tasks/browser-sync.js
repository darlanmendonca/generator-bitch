'use strict';

let gulp = require('gulp');
let config = require('./gulp.config.js');
let options = config.browserSyncOptions;

gulp.task('browser-sync', browserSyncTask);

function browserSyncTask() {
  config.browserSync.init(options);
}
