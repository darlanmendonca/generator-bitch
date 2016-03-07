'use strict';

let gulp = require('gulp');
let argv = require('yargs').argv;<% if (appFramework === 'angular') { %>
let historyApiFallback = require('connect-history-api-fallback');<% } %>
let gulpConfig = require('./gulp.config.js');

let options = {
	server: {
		baseDir: './public'
	},
	notify: false,<% if (appFramework === 'angular') { %>
	middleware: [ historyApiFallback() ],<% } %>
	reloadDelay: 100,
	open: argv.open
};

gulp.task('browser-sync', function() {
	gulpConfig.browserSync.init(options);
});
