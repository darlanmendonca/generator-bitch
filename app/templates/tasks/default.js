'use strict';

let gulp = require('gulp');<% if (appType === 'client')  { %>
let gutil = require('gulp-util');<% } %>

let tasks = [<% if (appType === 'client')  { %>
	'dependencies',
	'views',
	'browser-sync',
	'sprites',
	'styles',
	'scripts',<% } %><% if (appType === 'server')  { %>
	'apiDocs',
	'nodemon',<% } %><% if (scriptType !== 'coffeescript') { %>
	'lint',<% } %>
	'watch'
];

gulp.task('default', tasks);
