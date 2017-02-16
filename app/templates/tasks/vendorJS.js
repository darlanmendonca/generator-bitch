import gulp from 'gulp'
import packageFiles from 'package-files'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import webpack from 'webpack-stream'
import webpack2 from 'webpack'

gulp.task('vendorJS', vendorJSTask)

function vendorJSTask() {
  const dependencies = packageFiles()
    .filter(file => file.endsWith('.js'))

  return gulp
    .src(dependencies)
    .pipe(webpack({}, webpack2))
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts'))
}
