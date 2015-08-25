'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var argv = require('yargs').argv;<% if (appType === 'server' || appType === 'both') { %>
var config = require('./config');
var nodemon = require('gulp-nodemon');<% } %><% if (appType === 'client' || appType === 'both') { %>
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();<% if (viewEngine === 'jade') { %>
var jade = require('gulp-jade');<% } %><% if (viewEngine === 'ejs') { %>
var ejs = require('gulp-ejs');<% } %><% if (preprocessor === 'sass') { %>
var sass = require('gulp-sass');<% } %><% if (preprocessor === 'less') { %>
var less = require('gulp-less');<% } %><% if (preprocessor === 'stylus') { %>
var stylus = require('gulp-stylus');<% } %><% if ((appType === 'client' || appType === 'both') && appFramework === 'angular') { %>
var ngAnnotate = require('gulp-ng-annotate');<% } %>
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bower = require('bower-files')();<% } %>

<% if (appType === 'client' || appType === 'both') { %>
var files = {
  views: {
    src: './assets/views/*.<%= viewEngine %>',
    dest: './public/'
  },<% if ((appType === 'client' || appType === 'both') && appFramework === 'angular') { %>
  partials: {
    src: './assets/views/partials/*.<%= viewEngine %>',
    dest: './public/partials/'
  },<% } %>
  styles: {
    src: './assets/styles/*.<%= extPreprocessor %>',
    dest: './public/styles/'
  },
  scripts: {
    src: './assets/scripts/**/*.js',
    dest: './public/scripts/'
  },
  sprites: {
    src: './assets/sprites/*.png',
    dest: './public/imgs/sprites/'
  }
};<% if (scriptType === 'javascript') { %>

var lintScripts = [
  './gulpfile.js',<% if (appType === 'server' || appType === 'both') { %>
  './app.js',
  './models/**/*.js',
  './controllers/**/*.js',
  './routes/**/*.js',<% } %><% if (appType === 'client' || appType === 'both') { %>
  './assets/scripts/**/*.js'<% } %>
];<% } %>


var onError = function (err) {
  var message;
  switch (err.plugin) {<% if (preprocessor === 'sass') { %>
    case 'gulp-sass':
      var messageFormatted = err.messageFormatted;
      message = new gutil.PluginError('gulp-sass', messageFormatted).toString();
      process.stderr.write(message + '\n');
      break;<% } %><% if (preprocessor === 'less') { %>
    case 'gulp-less':
      message = new gutil.PluginError('gulp-less', err.message).toString();
      process.stderr.write(message + '\n');
      break;<% } %><% if (preprocessor === 'stylus') { %>
    case 'gulp-stylus':
      message = new gutil.PluginError('gulp-stylus', err.message).toString();
      process.stderr.write(message + '\n');
      break;<% } %><% if (viewEngine === 'jade') { %>
    case 'gulp-jade':
      message = new gutil.PluginError('gulp-jade', err.message).toString();
      process.stderr.write(message + '\n');
      break;<% } %>
    default:
      message = new gutil.PluginError(err.plugin, err.message).toString();
      process.stderr.write(message + '\n');

  }
  gutil.beep();
};<% } %>

<% if (appType === 'server' || appType === 'both') { %>
gulp.task('nodemon', function(<% if (appType === 'server') { %>cb<% } %>) {
  var options = {
    script: 'app.js',
    quiet: true,
    ext: 'js',<% if (appType === 'both') { %>
    ignore: [
      'gulpfile.js',
      'assets/scripts/**/*.js',
      'public/scripts/**/*.js'
    ],<% } %>
    env: {
      ENV: 'development'<% if (appType === 'client' || appType === 'both') { %>,
      open: argv.open<% } %>
    }
  };<% if (appType === 'server') { %>

  var started = false;<% } %>


  nodemon(options);<% if (appType === 'server') { %>
  .on('start', function() {
    if (!started){
      cb();
      started = true;
    }
  });<% } %>
});<% } %>

<% if (appType === 'client' || appType === 'both') { %>
gulp.task('browser-sync', <% if (appType === 'both') { %>['nodemon'], <% } %>function() {
  browserSync.init({<% if (appType === 'client') { %>
    server: {
      baseDir: './public'
    },<% } %><% if (appType === 'server' || appType === 'both') { %>
    proxy: 'localhost:'+config.server.port,
    port: config.server.proxy,
    ignored: [
      'public/**/*.js',
      'assets/**/*.js'
    ],<% } %>
    notify: false,
    reloadDelay: 100,
    open: <% if (appType === 'client') { %>argv.open<% } %><% if (appType !== 'client') { %>false<% } %>
  });
});

gulp.task('sprites', function() {
  var options = {
    imgName: 'sprites.png',
    cssName: 'sprite-vars.<%= extPreprocessor %>',
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

gulp.task('styles', function() {<% if (preprocessor === 'sass') { %>
  var options = {
    outputStyle: 'compressed'
  };<% } %><% if (preprocessor === 'less') { %>
  var options = {
    compress: true
  };<% } %><% if (preprocessor === 'stylus') { %>
  var options = {
    compress: true
  };<% } %>

  gulp
    .src(files.styles.src)<% if (preprocessor === 'stylus') { %>
    .pipe(plumber({ errorHandler: onError }))<% } %>
    .pipe(sourcemaps.init())<% if (preprocessor === 'sass') { %>
    .pipe(sass(options).on('error', onError))<% } %><% if (preprocessor === 'less') { %>
    .pipe(less(options).on('error', onError))<% } %><% if (preprocessor === 'stylus') { %>
    .pipe(stylus(options))<% } %>
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(files.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp
    .src(files.scripts.src)
    .pipe(sourcemaps.init())<% if ((appType === 'client' || appType === 'both') && appFramework === 'angular') { %>
    .pipe(ngAnnotate())<% } %>
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(files.scripts.dest));
});

gulp.task('views', function() {
  gulp
    .src(files.views.src)
    .pipe(plumber({ errorHandler: onError }))<% if (viewEngine === 'jade') { %>
    .pipe(jade())<% } %><% if (viewEngine === 'ejs') { %>
    .pipe(ejs())<% } %><% if (appType === 'client') { %>
    .pipe(gulp.dest(files.views.dest))<% } %>;<% if ((appType === 'client' || appType === 'both') && appFramework === 'angular') { %>

  gulp
    .src(files.partials.src)
    .pipe(plumber({ errorHandler: onError }))<% if (viewEngine === 'jade') { %>
    .pipe(jade())<% } %><% if (viewEngine === 'ejs') { %>
    .pipe(ejs())<% } %>
    .pipe(gulp.dest(files.partials.dest));<% } %>
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
});<% } %>

gulp.task('watch-gulpfile', function() {
  var process;
  gulp
    .watch('gulpfile.js', function() {
      if (process) {
        process.kill();
      }
      // var task = argv.task ? argv.task : 'default';
      process = spawn('gulp', [], {stdio: 'inherit'});
    });
});<% if (scriptType === 'javascript')  { %>

gulp.task('lint', function() {
  gulp
    .src(lintScripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});<% } %>

gulp.task('watch', function() {<% if (appType === 'client' || appType === 'both')  { %>
  gulp
    .watch('./assets/views/**/*.<%= viewEngine %>', [
      'views',
      browserSync.reload
    ]);


  gulp
    .watch(files.scripts.src, ['scripts', browserSync.reload]);<% } %><% if (scriptType === 'javascript')  { %>

  gulp
    .watch(lintScripts, ['lint']);<% } %>

});

gulp.task('default', [<% if (appType === 'client' || appType === 'both')  { %>
  'dependencies',
  'views',
  'browser-sync',
  'sprites',
  'styles',
  'scripts',<% } %><% if (appType === 'server')  { %>
  'nodemon',<% } %>
  'lint',
  'watch'
]);
