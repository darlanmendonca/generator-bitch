'use strict';

let gulp = require('gulp');

gulp.task('nodemon', function(<% if (appType === 'server') { %>cb<% } %>) {
	let nodemon = require('gulp-nodemon');

	let options = {
		script: 'server/app.<%= extScript %>',
		quiet: true,
		ext: '<%= extScript %>',
		ignore: [
			'server/docs'
		],
		env: {
			ENV: 'development'<% if (appType === 'client') { %>,
			open: argv.open<% } %>
		}
	};<% if (appType === 'server') { %>

	let started = false;<% } %>

	nodemon(options)<% if (appType === 'server') { %>
	.on('start', function() {
		if (!started){
			cb();
			started = true;
		}
	})<% } %>;
});
