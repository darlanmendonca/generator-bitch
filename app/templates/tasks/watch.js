import gulp from 'gulp'
import {
  templates,
  browserSync,
  views,
  styles,
  scripts,
  lint,
} from './config.js'

gulp.task('watch', watchTask)

function watchTask() {<% if (appFramework === 'angular') { %>
  gulp.watch(templates.src, [
    'templates',
    browserSync.reload
  ])
  <% } %>
  gulp.watch(views.watch, [
    'views',
    browserSync.reload
  ])

  gulp.watch(styles.watch, ['styles'])

  gulp.watch(scripts.src, [
    'scripts',
    browserSync.reload
  ])
  gulp.watch(lint, ['lint'])

  gulp.watch('./bower.json', [
    'vendorCSS',
    'vendorJS',
    'styles'
  ])
}
