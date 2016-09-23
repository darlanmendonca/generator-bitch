import gulp from 'gulp';
import bowerFiles from 'bower-files';
import minifyCss from 'gulp-minify-css';
import concat from 'gulp-concat';

gulp.task('vendorCSS', vendorCSSTask);

function vendorCSSTask() {
  let dependencies = bowerFiles()
    .ext('css')
    .files;

  return gulp
    .src(dependencies)
    .pipe(concat('vendor.css'))
    .pipe(minifyCss({keepSpecialComments: 0}))
    .pipe(gulp.dest('./public/styles'));
}
