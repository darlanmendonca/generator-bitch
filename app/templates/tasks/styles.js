import gulp from 'gulp'
import <%= preprocessor %> from 'gulp-<%= preprocessor %>'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import plumber from 'gulp-plumber'
import gutil from 'gulp-util'
import {browserSync, styles} from './config.js'<% if (preprocessor === 'sass') { %>

const outputStyle = 'compressed'<% } %><% if (preprocessor === 'less' || preprocessor === 'stylus') { %>
const compress = true<% } %>

gulp.task('styles', stylesTask)

function stylesTask() {
  gulp
    .src(styles.src)
    .pipe(plumber({errorHandler}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(styles.dest))
    .pipe(browserSync.stream({match: '**/*.css'}))
}

function errorHandler(err) {
  const message = new gutil.PluginError(err.plugin, err.message).toString()
  process.stderr.write(message + '\n')
  gutil.beep()
}
