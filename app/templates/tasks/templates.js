import gulp from 'gulp';
import gutil from 'gulp-util';
import <%= viewEngine %> from 'gulp-<%= viewEngine %>';<% if (appFramework === 'angular') { %>
import flatten from 'gulp-flatten';<% } %>
import {templates} from './config.js';
import plumber from 'gulp-plumber';

gulp.task('templates', templatesTask);

function templatesTask() {
  return gulp
    .src(templates.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(<%= viewEngine %>())
    .pipe(flatten())
    .pipe(gulp.dest(templates.dest));
}

function onError(err) {
  let message = new gutil.PluginError(err.plugin, err.message).toString();
  process.stderr.write(message + '\n');
  gutil.beep();
}
