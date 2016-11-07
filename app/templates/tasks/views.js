import gulp from 'gulp';
import gutil from 'gulp-util';<% if (viewEngine !== 'html') { %>
import <%= viewEngine %> from 'gulp-<%= viewEngine %>';<% } else { %>
import html from 'gulp-html-lint';<% } %><% if (appFramework === 'angular') { %>
import flatten from 'gulp-flatten';<% } %>
import {views} from './config.js';
import plumber from 'gulp-plumber';

gulp.task('views', viewsTask);

function viewsTask() {
  return gulp
    .src(views.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(<%= viewEngine %>())<% if (viewEngine === 'html') { %>
    .pipe(html.format())<% } %>
    .pipe(gulp.dest(views.dest));
}

function onError(err) {
	let message = new gutil.PluginError(err.plugin, err.message).toString();
  process.stderr.write(message + '\n');
	gutil.beep();
}
