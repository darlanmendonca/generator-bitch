import gulp from 'gulp';
import config from './gulp.config.js';

gulp.task('browser-sync', browserSyncTask);

function browserSyncTask() {
  config.browserSync.init(config.browserSyncOptions);
}
