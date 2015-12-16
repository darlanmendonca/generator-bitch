'use strict';

let gulp = require('gulp');<% if (appType === 'client' || appType === 'both')  { %>
let gutil = require('gulp-util');<% } %>

let tasks = [<% if (appType === 'client' || appType === 'both')  { %>
	'dependencies',
	'views',
	'browser-sync',
	'sprites',
	'styles',
	'scripts',<% } %><% if (appType === 'server')  { %>
	'nodemon',<% } %><% if (scriptType !== 'coffeescript') { %>
	'lint',<% } %>
	'watch'
];

gulp.task('default', tasks);
