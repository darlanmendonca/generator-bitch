import browserSync from 'browser-sync';
import historyFallback from 'connect-history-api-fallback';
import yargs from 'yargs';

module.exports = {
  lint: [
    './gulpfile.js',
    './test/**/*.js',<% if (appFramework !== 'none') { %>
    './sources/<%= appFramework %>/**/*.js'<% } %><% if (appFramework === 'none') { %>
    './sources/scripts/**/*.js'<% } %>
  ],
  views: {
    src: './sources/views/*.<%= viewEngine %>',
    watch: './sources/views/**/*.<%= viewEngine %>',
    dest: './public/'
  },<% if (appFramework === 'angular') { %>
  templates: {
    src: './sources/<%= appFramework %>/**/*.template.<%= viewEngine %>',
    dest: './public/templates/'
  },<% } %>
  styles: {
    src: './sources/styles/*.<%= extPreprocessor %>',
    watch: './sources/styles/**/*.<%= extPreprocessor %>',
    dest: './public/styles/'
  },
  scripts: {
    src: <% if (appFramework === 'angular') { %>[
      './sources/angular/**/*.js',
      '!./sources/angular/**/*.spec.js'
    ]<% } %><% if (appFramework === 'none') { %>'./sources/scripts/**/*.js'<% } %>,
    dest: './public/scripts/'
  },
  sprites: {
    src: './sources/sprites/*.png',
    dest: './public/imgs/sprites/'
  },
  browserSync: browserSync.create(),
  browserSyncOptions: {
    server: {
      baseDir: './public'
    },
    notify: false,<% if (appFramework === 'angular') { %>
    middleware: [ historyFallback() ],<% } %>
    reloadDelay: 100,
    open: yargs.argv.open
  }
};
