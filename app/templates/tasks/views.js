import gulp from 'gulp';
import gutil from 'gulp-util';<% if (viewEngine !== 'html') { %>
import <%= viewEngine %> from 'gulp-<%= viewEngine %>';<% } else { %>
import html from 'gulp-html-lint';<% } %><% if (appFramework === 'angular') { %>
import flatten from 'gulp-flatten';<% } %>
import {views} from './config.js';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';

gulp.task('views', viewsTask);

function viewsTask() {
  return gulp
    .src(views.src)
    .pipe(changed(views.dest))
    .pipe(plumber({ errorHandler: onError }))<% if (viewEngine !== 'html') { %>
    .pipe(<%= viewEngine %>())<% } else { %>
    .pipe(<%= viewEngine %>({
      rules: {
        'indent-style': 'spaces',
        'indent-width': 2,
        'attr-name-style': false,
        'attr-req-value': false,
      },
    }))
    .pipe(html.format())<% } %>
    .pipe(gulp.dest(views.dest));
}

function onError(err) {
	let message = new gutil.PluginError(err.plugin, err.message).toString();
  process.stderr.write(message + '\n');
	gutil.beep();
}
