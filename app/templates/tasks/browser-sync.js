import gulp from 'gulp';
import historyApi from 'connect-history-api-fallback';
import {browserSync, browserSyncOptions} from './gulp.config.js';
import gzip from 'compression';

gulp.task('browser-sync', browserSyncTask);

function browserSyncTask() {
  browserSyncOptions.middleware = [<% if (appFramework === 'angular') { %>
    historyApi(),<% } %>
    gzip();
  ];
  browserSync.init(browserSyncOptions);
}
