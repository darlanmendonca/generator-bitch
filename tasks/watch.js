import gulp from 'gulp'
import config from './config.js'

gulp.task('watch', watchTask)

function watchTask() {
  gulp.watch(config.lint, ['lint'])
}
