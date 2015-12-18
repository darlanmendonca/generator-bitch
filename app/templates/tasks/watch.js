'use strict';

let gulp = require('gulp');
let config = require('./config.js');

gulp.task('watch', function() {<% if (appType === 'client' || appType === 'both')  { %><% if (appFramework === 'angular') { %>
	let views = [];
	views = views.concat(config.templates.src);
	views = views.concat(config.views.src);

	gulp.watch(views, [<% } else { %>
	gulp.watch(config.views.src, [<% } %>
		'views',
		config.browserSync.reload
	]);

	gulp.watch('./client/styles/**/*.<%= extPreprocessor %>', ['styles']);

	gulp.watch(config.scripts.src, [
		'scripts',
		config.browserSync.reload
	]);<% } %><% if (scriptType !== 'coffeescript') { %>
	gulp.watch(config.lint, ['lint']);<% } %><% if (appType === 'client' || appType === 'both')  { %>

	gulp.watch('./bower.json', [
		'dependencies',
		'styles'
	]);<% } %><% if (appType === 'server' || appType === 'both')  { %>

	gulp.watch('./server/**/*.controller.js', ['apiDocs']);<% } %>
});
