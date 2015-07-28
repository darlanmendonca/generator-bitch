'use strict';

var gulp = require('gulp');
var config = require('./config');
var jade = require('gulp-jade');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var wiredep = require('wiredep').stream;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bower = require('bower-files')();
var spawn = require('child_process').spawn;
var argv = require('yargs').argv;

var files = {
  views: {
    src: './assets/views/*.jade',
    dest: './public/'
  },
  styles: {
    src: './assets/styles/*.scss',
    dest: './public/styles/'
  },
  scripts: {
    src: './assets/scripts/*.js',
    dest: './public/scripts/'
  },
  sprites: {
    src: './assets/sprites/*.png',
    dest: './public/imgs/sprites/'
  }
};

var onError = function (err) {
  var message;
  switch (err.plugin) {
    case 'gulp-sass':
      var messageFormatted = err.messageFormatted;
      message = new gutil.PluginError('gulp-sass', messageFormatted).toString();
      process.stderr.write(message + '\n');
      break;
    case 'gulp-jade':
      message = new gutil.PluginError('gulp-jade', err.message).toString();
      process.stderr.write(message + '\n');
      break;
  }
  gutil.beep();
};


gulp.task('serve', function() {
  var options = {
    script: 'app.js',
    quiet: true,
    ext: 'js',
    env: {
      env: 'development',
      test: 'darlan'
    }
  };

  nodemon(options)
  .on('start', ['browser-sync']);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    // server: {
    //   baseDir: './public'
    // },
    proxy: 'localhost:'+config.server.port,
    port: 5000,
    notify: false,
    reloadDelay: 100,
    open: true,
    ignored: [
      'public/**/*.js',
      'assets/**/*.js'
    ]
  });
});

gulp.task('sprites', function() {
  var options = {
    imgName: 'sprites.png',
    cssName: 'sprite-vars.scss',
    imgPath: '../imgs/sprites/sprites.png',
    algorithm: 'binary-tree',
    engine: 'pngsmith',
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-'+sprite.name;
    }
  };
  var sprite = gulp.src(files.sprites.src)
    .pipe(plumber())
    .pipe(spritesmith(options));

  sprite.img.pipe(gulp.dest(files.sprites.dest));
  sprite.css.pipe(gulp.dest('./assets/styles/components/'));
});

gulp.task('styles', function() {
  var options = {
    outputStyle: 'compressed'
  };

  gulp
    .src(files.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass(options).on('error', onError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(files.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp
    .src(files.scripts.src)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(files.scripts.dest));
});

gulp.task('compile-views', function() {
  gulp
    .src(files.views.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(jade())
    .pipe(gulp.dest(files.views.dest));
});

gulp.task('dependencies', function() {
  gulp
    .src(bower.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/styles'));

  gulp
    .src(bower.ext('js').files)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('watch-gulpfile', function() {
  var process;
  gulp
    .watch('gulpfile.js', function() {
      if (process) {
        process.kill();
      }
      var task = argv.task ? argv.task : 'default';
      process = spawn('gulp', [], {stdio: 'inherit'});
    });
});

gulp.task('watch', function() {
  gulp
    .watch('./assets/views/**/*.jade', [
      'dependencies',
      'compile-views',
      browserSync.reload
    ]);

  gulp
    .watch('./assets/styles/**/*.scss', ['styles']);

  gulp
    .watch('./assets/scripts/**/*.js', ['scripts', browserSync.reload]);

});

gulp.task('default', [
  'dependencies',
  'compile-views',
  'serve',
  'sprites',
  'styles',
  'scripts',
  'watch-gulpfile',
  'watch'
]);
