'use strict';

let gulp = require('gulp');
let gutil = require('gulp-util');<% if (appType === 'client' || appType === 'both') { %>
let argv = require('yargs').argv;<% } %><% if (appType === 'client' || appType === 'both') { %>
let plumber = require('gulp-plumber');
let browserSync = require('browser-sync').create();<% if (appType === 'client' || appType === 'both') { %>
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');<% } %><% } %>
<% if (scriptType !== 'coffeescript') { %>
let lintScripts = [
	'./gulpfile.<%= extScript %>',<% if (appType === 'server' || appType === 'both') { %>
	'./controllers/**/*.js',
	'./helpers/**/*.js',
	'./middlewares/**/*.js',
	'./models/**/*.js',
	'./routes/**/*.js',
	'./test/*.js',<% } %><% if ((appType === 'client' || appType === 'both') && appFramework !== 'none') { %>
	'./assets/<%= appFramework %>/**/*.<%= extScript %>'<% } %><% if ((appType === 'client' || appType === 'both') && appFramework === 'none') { %>
	'./assets/scripts/**/*.<%= extScript %>'<% } %>
];<% } %>
<% if (appType === 'client' || appType === 'both') { %>
let files = {
	views: {
		src: './assets/views/*.<%= viewEngine %>',
		dest: './public/'
	},<% if ((appType === 'client' || appType === 'both') && appFramework === 'angular') { %>
	templates: {
		src: './assets/<%= appFramework %>/**/*.<%= viewEngine %>',
		dest: './public/templates/'
	},<% } %>
	styles: {
		src: './assets/styles/*.<%= extPreprocessor %>',
		dest: './public/styles/'
	},
	scripts: {
		src: <% if (appFramework === 'angular') { %>[
			'./assets/angular/**/*.<%= extScript %>',
			'!./assets/angular/**/*.spec.<%= extScript %>'
		]<% } %><% if (appFramework === 'none') { %>'./assets/scripts/**/*.<%= extScript %>'<% } %>,
		dest: './public/scripts/'
	},
	sprites: {
		src: './assets/sprites/*.png',
		dest: './public/imgs/sprites/'
	}
};

let onError = function (err) {
	var message;
	switch (err.plugin) {<% if (preprocessor === 'sass') { %>
		case 'gulp-sass':
			let messageFormatted = err.messageFormatted;
			message = new gutil.PluginError('gulp-sass', messageFormatted).toString();
			process.stderr.write(message + '\n');
			break;<% } %><% if (preprocessor === 'less') { %>
		case 'gulp-less':
			message = new gutil.PluginError('gulp-less', err.message).toString();
			process.stderr.write(message + '\n');
			break;<% } %><% if (preprocessor === 'stylus') { %>
		case 'gulp-stylus':
			message = new gutil.PluginError('gulp-stylus', err.message).toString();
			process.stderr.write(message + '\n');
			break;<% } %><% if (viewEngine === 'jade') { %>
		case 'gulp-jade':
			message = new gutil.PluginError('gulp-jade', err.message).toString();
			process.stderr.write(message + '\n');
			break;<% } %><% if (scriptType === 'coffeescript') { %>
		case 'gulp-coffee':
			message = new gutil.PluginError('gulp-coffee', err).toString();
			process.stderr.write(message + '\n');<% } %>
		default:
			message = new gutil.PluginError(err.plugin, err.message).toString();
			process.stderr.write(message + '\n');

	}
	gutil.beep();
};<% } %>
<% if (appType === 'server' || appType === 'both') { %>
gulp.task('nodemon', function(<% if (appType === 'server') { %>cb<% } %>) {
	let nodemon = require('gulp-nodemon');

	let options = {
		script: 'app.<%= extScript %>',
		quiet: true,
		ext: '<%= extScript %>',<% if (appType === 'both') { %>
		ignore: [
			'gulpfile.<%= extScript %>',
			'test/**/*.<%= extScript %>',<% if (appFramework !== 'none') { %>
			'assets/<%= appFramework %>/**/*.<%= extScript %>',<% } %>
			'public/scripts/**/*.<%= extScript %>',
		],<% } %>
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
});<% } %>
<% if (appType === 'client' || appType === 'both') { %>
gulp.task('browser-sync', <% if (appType === 'both') { %>['nodemon'], <% } %>function() {<% if (appType === 'client' && appFramework === 'angular') { %>
	let historyApiFallback = require('connect-history-api-fallback');<% } %><% if (appType === 'server' || appType === 'both') { %>
	let config = require('./config');<% } %>

	browserSync.init({<% if (appType === 'client') { %>
		server: {
			baseDir: './public'
		},<% } %><% if (appType === 'server' || appType === 'both') { %>
		proxy: 'localhost:'+config.server.port,
		port: config.server.proxy,
		ignored: [
			'public/**/*.<%= extScript %>',
			'assets/**/*.<%= extScript %>'
		],<% } %>
		notify: false,<% if (appType === 'client' && appFramework === 'angular') { %>
		middleware: [ historyApiFallback() ],<% } %>
		reloadDelay: 100,
		open: <% if (appType === 'client') { %>argv.open<% } %><% if (appType !== 'client') { %>false<% } %>
	});
});

gulp.task('sprites', function() {
	let spritesmith = require('gulp.spritesmith');

	let options = {
		imgName: 'sprites.png',
		cssName: 'sprite-vars.<%= extPreprocessor %>',
		imgPath: '../imgs/sprites/sprites.png',
		algorithm: 'binary-tree',
		engine: 'pngsmith',
		cssVarMap: function (sprite) {
			sprite.name = 'sprite-'+sprite.name;
		}
	};

	let sprite = gulp.src(files.sprites.src)
		.pipe(plumber())
		.pipe(spritesmith(options));

	sprite.img.pipe(gulp.dest(files.sprites.dest));
	sprite.css.pipe(gulp.dest('./assets/styles/components/'));
});

gulp.task('styles', function() {
	let bower = require('bower-files')();
	let dependencies = bower.relative(__dirname).ext('<%= extPreprocessor %>').files;
	let inject = require('gulp-inject');
	let util = require('util');
	let <%= preprocessor %> = require('gulp-<%= preprocessor %>');
	let autoprefixer = require('gulp-autoprefixer');

	let injectTransform = {
		starttag: '/* inject:imports */',
		endtag: '/* endinject */',
		transform: function (filepath) {
			return util.format('@import \'../..%s\';', filepath);
		}
	};

	let injectConfig = {
		read: false,
		relative: false
	};
	<% if (preprocessor === 'sass') { %>
	let configPreprocessor = {
		outputStyle: 'compressed'
	};<% } %><% if (preprocessor === 'less' || preprocessor === 'stylus') { %>
	let configPreprocessor = {
		compress: true
	};<% } %>

	gulp
		.src(files.styles.src)
		.pipe(inject(gulp.src(dependencies, injectConfig), injectTransform))<% if (preprocessor === 'stylus') { %>
		.pipe(plumber({ errorHandler: onError }))<% } %>
		.pipe(sourcemaps.init())<% if (preprocessor === 'sass') { %>
		.pipe(sass(configPreprocessor).on('error', onError))<% } %><% if (preprocessor === 'less') { %>
		.pipe(less(configPreprocessor).on('error', onError))<% } %><% if (preprocessor === 'stylus') { %>
		.pipe(stylus(configPreprocessor))<% } %>
		.pipe(autoprefixer())
		.pipe(sourcemaps.write({sourceRoot: '/assets/styles'}))
		.pipe(gulp.dest(files.styles.dest))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('scripts', function() {
	let babel = require('gulp-babel');<% if (appFramework === 'angular') { %>
	let ngAnnotate = require('gulp-ng-annotate');<% } %><% if (scriptType === 'coffeescript') { %>
	let coffee = require('gulp-coffee');<% } %>

	gulp
		.src(files.scripts.src)
		.pipe(plumber(<% if (scriptType !== 'coffeescript') { %>{ errorHandler: onError }<% } %>))
		.pipe(sourcemaps.init())<% if (scriptType === 'coffeescript') { %>
		.pipe(coffee({bare: true}).on('error', onError))<% } %><% if (appFramework === 'angular') { %>
		.pipe(ngAnnotate())<% } %>
		.pipe(babel())
		.pipe(concat('app.js'))
		.pipe(uglify({mangle: false}))
		.pipe(sourcemaps.write({sourceRoot: '/assets/angular'}))
		.pipe(gulp.dest(files.scripts.dest));
});

gulp.task('views', function() {
	let <%= viewEngine %> = require('gulp-<%= viewEngine %>');

	gulp
		.src(files.views.src)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(<%= viewEngine %>())<% if (appType === 'client') { %>
		.pipe(gulp.dest(files.views.dest))<% } %>;<% if ((appType === 'client' || appType === 'both') && appFramework === 'angular') { %>

	let flatten = require('gulp-flatten');
	gulp
		.src(files.templates.src)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(<%= viewEngine %>())
		.pipe(flatten())
		.pipe(gulp.dest(files.templates.dest));<% } %>
});

gulp.task('dependencies', function() {
	let bower = require('bower-files')();
	let minifyCss = require('gulp-minify-css');

	gulp
		.src(bower.ext('css').files)
		.pipe(concat('vendor.css'))
		.pipe(minifyCss({keepSpecialComments: 0}))
		.pipe(gulp.dest('./public/styles'));

	gulp
		.src(bower.ext('js').files)
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/scripts'));
});<% } %>

gulp.task('watch-gulpfile', function() {
	let spawn = require('child_process').spawn;
	let process;

	gulp
		.watch('gulpfile.<%= extScript %>', function() {
			if (process) {
				process.kill();
			}
			// let task = argv.task ? argv.task : 'default';
			process = spawn('gulp', [], {stdio: 'inherit'});
		});
});<% if (scriptType !== 'coffeescript') { %>

gulp.task('lint', function() {
	let jshint = require('gulp-jshint');
	let stylish = require('jshint-stylish');

	let beep = function() {
		gutil.beep();
	};

	gulp
		.src(lintScripts)
		.pipe(jshint())
		.pipe(jshint.reporter(beep))
		.pipe(jshint.reporter(stylish));
});<% } %>

<% if (appType === 'server' || appType === 'both') { %>
gulp.task('apiDocs', function(done) {
	var apiDoc = require('gulp-apidoc');

	apiDoc({
		src: 'controllers/api',
		dest: 'docs',
		debug: true,
		// parse: true,
		silent: true,
		includeFilters: ['\\.<%= extScript %>$']
	}, done);
});
<% } %>

gulp.task('watch', function() {<% if (appType === 'client' || appType === 'both')  { %>
	gulp.watch(<% if (appFramework === 'angular') { %>files.templates.src<% } else {%>files.views.src<% } %>, [
		'views',
		browserSync.reload
	]);

	gulp.watch('./assets/styles/**/*.<%= extPreprocessor %>', ['styles']);

	gulp.watch(files.scripts.src, [
		'scripts',
		browserSync.reload
	]);<% } %><% if (scriptType !== 'coffeescript') { %>
	gulp.watch(lintScripts, ['lint']);<% } %><% if (appType === 'client' || appType === 'both')  { %>

	gulp.watch('./bower.json', [
		'dependencies',
		'styles'
	]);<% } %>
});

gulp.task('default', [<% if (appType === 'client' || appType === 'both')  { %>
	'dependencies',
	'views',
	'browser-sync',
	'sprites',
	'styles',
	'scripts',<% } %><% if (appType === 'server')  { %>
	'nodemon',<% } %><% if (scriptType !== 'coffeescript') { %>
	'lint',<% } %>
	'watch'
]);
