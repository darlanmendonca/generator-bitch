'use strict';

let gulp = require('gulp');<% if (appType === 'client') { %>
let argv = require('yargs').argv;<% } %><% if (appType === 'client' && appFramework === 'angular') { %>
let historyApiFallback = require('connect-history-api-fallback');<% } %><% if (appType === 'server') { %>
let config = require('../config.js');<% } %>
let gulpConfig = require('./gulp.config.js');

let options = {<% if (appType === 'client') { %>
	server: {
		baseDir: './public'
	},<% } %><% if (appType === 'server') { %>
	proxy: 'localhost:'+config.server.port,
	port: config.server.proxy,
	ignored: [
		'public/**/*.<%= extScript %>',
		'client/**/*.<%= extScript %>'
	],<% } %>
	notify: false,<% if (appType === 'client' && appFramework === 'angular') { %>
	middleware: [ historyApiFallback() ],<% } %>
	reloadDelay: 100,
	open: <% if (appType === 'client') { %>argv.open<% } %><% if (appType !== 'client') { %>false<% } %>
};

gulp.task('browser-sync', function() {
	gulpConfig.browserSync.init(options);
});
