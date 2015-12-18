'use strict';

let gulp = require('gulp');

gulp.task('nodemon', function(<% if (appType === 'server') { %>cb<% } %>) {
	let nodemon = require('gulp-nodemon');

	let options = {
		script: 'server/app.<%= extScript %>',
		quiet: true,
		ext: '<%= extScript %>',
		ignore: [
			'server/docs',<% if (appType === 'both') { %>
			'gulpfile.<%= extScript %>',
			'test/**/*.<%= extScript %>',<% if (appFramework !== 'none') { %>
			'client/**/*.<%= extScript %>',<% } %>
			'public/scripts/**/*.<%= extScript %>'<% } %>
		],
		env: {
			ENV: 'development'<% if (appType === 'client' || appType === 'both') { %>,
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
