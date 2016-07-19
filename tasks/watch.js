const gulp = require('gulp');
const config = require('./config.js');

gulp.task('watch', watchTask);

function watchTask() {
  gulp.watch(config.lint, ['lint']);
}
