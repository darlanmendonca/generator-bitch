gulp = require 'gulp'
gutil = require 'gulp-util'
spawn = require('child_process').spawn;
jshint = require 'gulp-jshint'
argv = require('yargs').argv;<% if (appType === 'server' || appType === 'both') { %>
config = require './config'
nodemon = require 'gulp-nodemon'<% } %><% if (appType === 'client' || appType === 'both') { %>
plumber = require 'gulp-plumber'
browserSync = require('browser-sync').create();
jade = require 'gulp-jade'<% if (preprocessor === 'sass') { %>
sass = require 'gulp-sass'<% } %><% if (preprocessor === 'less') { %>
less = require 'gulp-less'<% } %>
sourcemaps = require 'gulp-sourcemaps'
autoprefixer = require 'gulp-autoprefixer'
spritesmith = require 'gulp.spritesmith'
wiredep = require('wiredep').stream;
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
bower = require('bower-files')()<% } %>
coffee = require 'gulp-coffee'

<% if (appType === 'client' || appType === 'both') { %>
files =
  views:
    src: './assets/views/*.jade',
    dest: './public/'
  styles:
    src: './assets/styles/*.<%= extPreprocessor %>',
    dest: './public/styles/'
  scripts:
    src: './assets/scripts/**/*.coffee',
    dest: './public/scripts/'
  sprites:
    src: './assets/sprites/*.png'
    dest: './public/imgs/sprites/'

<% if (scriptType === 'javascript') { %>
lintScripts = [
  './gulpfile.js'<% if (appType === 'server' || appType === 'both') { %>
  './app.js'
  './models/**/*.js'
  './controllers/**/*.js'
  './routes/**/*.js'<% } %><% if (appType === 'client' || appType === 'both') { %>
  './assets/scripts/*.js'<% } %>
]<% } %>

onError = (err)->
  message = null
  switch (err.plugin) <% if (preprocessor === 'sass') { %>
    when 'gulp-sass'
      messageFormatted = err.messageFormatted
      message = new gutil.PluginError('gulp-sass', messageFormatted).toString()
      process.stderr.write(message + '\n');<% } %><% if (preprocessor === 'less') { %>
    when 'gulp-less'
      message = new gutil.PluginError('gulp-less', err.message).toString();
      process.stderr.write(message + '\n');<% } %>
    when 'gulp-jade'
      message = new gutil.PluginError('gulp-jade', err.message).toString();
      process.stderr.write(message + '\n');
    when 'gulp-coffee'
      message = new gutil.PluginError('gulp-coffee', err).toString();
      process.stderr.write(message + '\n');


  gutil.beep()<% } %>

<% if (appType === 'server' || appType === 'both') { %>
gulp.task 'nodemon', <% if (appType === 'server') { %>(cb)<% } %>->
  options =
    script: 'app.coffee'
    quiet: true
    ext: 'coffee'<% if (appType === 'both') { %>
    ignore: [
      'gulpfile.coffee'
      'assets/scripts/**/*.coffee'
      'public/scripts/**/*.js'
    ]<% } %>
    env:
      ENV: 'development'<% if (appType === 'client' || appType === 'both') { %>
      open: argv.open<% } %>

  started = false


  nodemon options<% if (appType === 'server') { %>
  .on 'start', ->
    unless started
      cb()
      started = true<% } %><% } %>

<% if (appType === 'client' || appType === 'both') { %>
gulp.task 'browser-sync', <% if (appType === 'both') { %>['nodemon'], <% } %>->
  browserSync.init<% if (appType === 'client') { %>
    server:
      baseDir: './public'<% } %><% if (appType === 'server' || appType === 'both') { %>
    proxy: 'localhost:'+config.server.port
    port: config.server.proxy
    ignored: [
      'public/**/*.js'
      'assets/**/*.js'
    ],<% } %>
    notify: false
    reloadDelay: 100
    open: <% if (appType === 'client') { %>argv.open<% } %><% if (appType !== 'client') { %>false<% } %>

gulp.task 'sprites', ->
  options =
    imgName: 'sprites.png'
    cssName: 'sprite-vars.<%= extPreprocessor %>'
    imgPath: '../imgs/sprites/sprites.png'
    algorithm: 'binary-tree'
    engine: 'pngsmith'
    cssVarMap: (sprite)->
      sprite.name = 'sprite-'+sprite.name

  sprite = gulp.src files.sprites.src
    .pipe plumber()
    .pipe spritesmith options

  sprite.img.pipe gulp.dest files.sprites.dest
  sprite.css.pipe gulp.dest './assets/styles/components/'

gulp.task 'styles', -><% if (preprocessor === 'sass') { %>
  options =
    outputStyle: 'compressed'
  <% } %><% if (preprocessor === 'less') { %>
  options =
    compress: true<% } %>

  gulp
    .src files.styles.src
    .pipe sourcemaps.init()<% if (preprocessor === 'sass') { %>
    .pipe sass(options).on('error', onError)<% } %><% if (preprocessor === 'less') { %>
    .pipe less(options).on('error', onError)<% } %>
    .pipe autoprefixer()
    .pipe sourcemaps.write('./')
    .pipe gulp.dest(files.styles.dest)
    .pipe browserSync.stream()

gulp.task 'scripts', ->
  gulp
    .src files.scripts.src
    .pipe plumber()
    .pipe sourcemaps.init()
    .pipe coffee({bare: true}).on('error', onError)
    .pipe sourcemaps.write()
    .pipe concat('app.js')
    .pipe uglify()
    .pipe gulp.dest(files.scripts.dest)

gulp.task 'views', ->
  gulp
    .src files.views.src
    .pipe plumber({ errorHandler: onError })
    .pipe jade()<% if (appType === 'client') { %>
    .pipe gulp.dest(files.views.dest)<% } %>

gulp.task 'dependencies', ->
  gulp
    .src(bower.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/styles'));

  gulp
    .src bower.ext('js').files
    .pipe concat('vendor.js')
    .pipe uglify()
    .pipe gulp.dest('./public/scripts') <% } %>

gulp.task 'watch-gulpfile', ->
  process = null
  gulp
    .watch 'gulpfile.js', ->
      if process
        process.kill()

      task = if argv.task then argv.task else 'default'
      process = spawn('gulp', [], {stdio: 'inherit'})

<% if (scriptType === 'javascript') { %>
gulp.task 'lint', ->
  gulp
    .src lintScripts
    .pipe jshint()
    .pipe jshint.reporter('default')<% } %>

gulp.task 'watch', -><% if (appType === 'client' || appType === 'both')  { %>
  gulp
    .watch './assets/views/**/*.jade', [
      'dependencies'
      'views'
      browserSync.reload
    ]

  gulp
    .watch './assets/styles/**/*.<%= extPreprocessor %>', ['styles']

  gulp
    .watch files.scripts.src, ['scripts', browserSync.reload]<% } %><% if (appType === 'server' || appType === 'both')  { %><% if (scriptType === 'javascript') { %>

  gulp
    .watch lintScripts, ['lint']<% } %><% } %>


gulp.task 'default', [<% if (appType === 'client' || appType === 'both')  { %>
  'dependencies'
  'views'
  'browser-sync'
  'sprites'
  'styles'
  'scripts'<% } %><% if (appType === 'server')  { %>
  'nodemon'<% } %><% if (scriptType === 'javascript') { %>
  'lint'<% } %>
  'watch'
]
