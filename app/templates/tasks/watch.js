'use strict';

let gulp = require('gulp');
let gulpConfig = require('./gulp.config.js');

gulp.task('watch', watchTask);

function watchTask() {<% if (appFramework === 'angular') { %>
  gulp.watch(gulpConfig.templates.watch, [
    'templates',
    gulpConfig.browserSync.reload
  ]);
  <% } %>
  gulp.watch(gulpConfig.views.watch, [
    'views',
    gulpConfig.browserSync.reload
  ]);

  gulp.watch('./client/styles/**/*.<%= extPreprocessor %>', ['styles']);

  gulp.watch(gulpConfig.scripts.src, [
    'scripts',
    gulpConfig.browserSync.reload
  ]);
  gulp.watch(gulpConfig.lint, ['lint']);

  gulp.watch('./bower.json', [
    'vendorCSS',
    'vendorJS',
    'styles'
  ]);
}
