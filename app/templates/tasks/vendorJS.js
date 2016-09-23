import gulp from 'gulp';
import bowerFiles from 'bower-files';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';

gulp.task('vendorJS', vendorJSTask);

function vendorJSTask() {
  let dependencies = bowerFiles()
    .ext('js')
    .files;

  return gulp
    .src(dependencies)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts'));
}
