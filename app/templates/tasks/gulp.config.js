'use strict';

module.exports = {
	lint: [
		'./gulpfile.<%= extScript %>',
		'./test/**/*.js',<% if (appFramework !== 'none') { %>
		'./client/<%= appFramework %>/**/*.<%= extScript %>'<% } %><% if (appFramework === 'none') { %>
		'./client/scripts/**/*.<%= extScript %>'<% } %>
	],
	views: {
		src: './client/views/*.<%= viewEngine %>',
		dest: './public/'
	},<% if (appFramework === 'angular') { %>
	templates: {
		src: './client/<%= appFramework %>/**/*.<%= viewEngine %>',
		dest: './public/templates/'
	},<% } %>
	styles: {
		src: './client/styles/*.<%= extPreprocessor %>',
		dest: './public/styles/'
	},
	scripts: {
		src: <% if (appFramework === 'angular') { %>[
			'./client/angular/**/*.<%= extScript %>',
			'!./client/angular/**/*.spec.<%= extScript %>'
		]<% } %><% if (appFramework === 'none') { %>'./client/scripts/**/*.<%= extScript %>'<% } %>,
		dest: './public/scripts/'
	},
	sprites: {
		src: './client/sprites/*.png',
		dest: './public/imgs/sprites/'
	},
	browserSync: require('browser-sync').create()
};
