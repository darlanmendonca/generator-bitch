import gulp from 'gulp';
import gutil from 'gulp-util';
<<<<<<< HEAD
import babel from 'gulp-babel';
=======
import babel from 'gulp-babel';<% if (appFramework === 'angular') { %>
import ngAnnotate from 'gulp-ng-annotate';<% } %>
>>>>>>> 7bc1c27f482a357793c872b25f99939cf71f40c0
import sourcemaps from 'gulp-sourcemaps';
import config from './gulp.config.js';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
<<<<<<< HEAD
import uglify from 'gulp-uglify';<% if (appFramework === 'angular') { %>
import ngAnnotate from 'gulp-ng-annotate';<% } %>
=======
import uglify from 'gulp-uglify';
>>>>>>> 7bc1c27f482a357793c872b25f99939cf71f40c0

gulp.task('scripts', scriptsTask);

function scriptsTask() {
  return gulp
    .src(config.scripts.src)
    .pipe(plumber({errorHandler}))
    .pipe(sourcemaps.init())<% if (appFramework === 'angular') { %>
    .pipe(ngAnnotate())<% } %>
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write({sourceRoot: '/sources/angular'}))
    .pipe(gulp.dest(config.scripts.dest));
}

function errorHandler(err) {
  let message = new gutil.PluginError(err.plugin, err.message).toString();
  process.stderr.write(message + '\n');
  gutil.beep();
}
