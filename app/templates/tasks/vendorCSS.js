import gulp from 'gulp'
import packageFiles from 'package-files'
import minifyCss from 'gulp-clean-css'
import concat from 'gulp-concat'

gulp.task('vendorCSS', vendorCSSTask)

function vendorCSSTask() {
  const dependencies = packageFiles()
    .filter(file => file.endsWith('.css'))

  return gulp
    .src(dependencies)
    .pipe(concat('vendor.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/styles'))
}
