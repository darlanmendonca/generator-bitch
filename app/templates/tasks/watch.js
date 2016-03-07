'use strict';

let gulp = require('gulp');
let gulpConfig = require('./gulp.config.js');

gulp.task('watch', function() {<% if (appType === 'client')  { %><% if (appFramework === 'angular') { %>
	let views = [];
	views = views.concat(gulpConfig.templates.src);
	views = views.concat(gulpConfig.views.src);

	gulp.watch(views, [<% } else { %>
	gulp.watch(gulpConfig.views.src, [<% } %>
		'views',
		gulpConfig.browserSync.reload
	]);

	gulp.watch('./client/styles/**/*.<%= extPreprocessor %>', ['styles']);

	gulp.watch(gulpConfig.scripts.src, [
		'scripts',
		gulpConfig.browserSync.reload
	]);<% } %><% if (scriptType !== 'coffeescript') { %>
	gulp.watch(gulpConfig.lint, ['lint']);<% } %><% if (appType === 'client')  { %>

	gulp.watch('./bower.json', [
		'dependencies',
		'styles'
	]);<% } %><% if (appType === 'server')  { %>

	gulp.watch('./server/**/*.controller.js', ['apiDocs']);<% } %>
});
