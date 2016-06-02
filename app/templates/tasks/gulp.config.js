'use strict';

module.exports = {
	lint: [
		'./gulpfile.js',
		'./test/**/*.js',<% if (appFramework !== 'none') { %>
		'./client/<%= appFramework %>/**/*.js'<% } %><% if (appFramework === 'none') { %>
		'./client/scripts/**/*.js'<% } %>
	],
	views: {
		src: './client/views/*.<%= viewEngine %>',
    watch: './client/views/**/*.<%= viewEngine %>',
		dest: './public/'
	},<% if (appFramework === 'angular') { %>
	templates: {
		src: './client/<%= appFramework %>/**/*.template.<%= viewEngine %>',
		dest: './public/templates/'
	},<% } %>
	styles: {
		src: './client/styles/*.<%= extPreprocessor %>',
    watch: './client/styles/**/*.<%= extPreprocessor %>',
		dest: './public/styles/'
	},
	scripts: {
		src: <% if (appFramework === 'angular') { %>[
			'./client/angular/**/*.js',
			'!./client/angular/**/*.spec.js'
		]<% } %><% if (appFramework === 'none') { %>'./client/scripts/**/*.js'<% } %>,
		dest: './public/scripts/'
	},
	sprites: {
		src: './client/sprites/*.png',
		dest: './public/imgs/sprites/'
	},
	browserSync: require('browser-sync').create(),
  browserSyncOptions: {
    server: {
      baseDir: './public'
    },
    notify: false,<% if (appFramework === 'angular') { %>
    middleware: [ require('connect-history-api-fallback')() ],<% } %>
    reloadDelay: 100,
    open: require('yargs').argv.open
  }
};
