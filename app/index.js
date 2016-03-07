'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var util = require('util');
var slugify = require('underscore.string/slugify');
var mkdirp = require('mkdirp');

var babel = require('gulp-babel');
var gulpif = require('gulp-if');

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);
		this.slugify = slugify;

		this.argument('appname', {
			desc: 'create an app with name [appname]',
			type: Boolean,
			required: false,
			defaults: path.basename(process.cwd())
		});
	},
	appname: function() {
		var done = this.async();
		var prompt = {
			type: 'input',
			name: 'appname',
			message: 'application name',
			default: this.appname
		};
		this.prompt(prompt, function(data) {
			this.appname = data.appname;
			done();
		}.bind(this));
	},
  scriptType: function() {
		var done = this.async();
		var prompt = {
			type: 'list',
			name: 'scriptType',
			message: 'javascript is write in',
			default: 'es6',
			choices: ['es6', 'es5']
		};
		this.prompt(prompt, function(data) {
			this.scriptType = data.scriptType;
			this.extScript = 'js';
			var condition;

			if (this.scriptType === 'es5') {
				condition = function (file) {
					return path.extname(file.path) === '.js';
				};
				this.registerTransformStream(gulpif(condition, babel()));
			}

			done();
		}.bind(this));
	},
	viewEngine: function() {
		var done = this.async();
		var prompt = {
			type: 'list',
			name: 'viewEngine',
			message: 'select template view you would like to use',
			default: 'jade',
			choices: ['jade', 'ejs']
		};
		this
      .prompt(prompt, function(data) {
        this.viewEngine = data.viewEngine;
        done();
      }.bind(this));
	},
	preprocessor: function() {
		var done = this.async();
		var prompt = {
			type: 'list',
			name: 'preprocessor',
			message: 'select css preprocessor you would like to use',
			default: 'sass',
			choices: ['sass', 'less', 'stylus']
		};

		this.prompt(prompt, function(data) {
			this.preprocessor = data.preprocessor;
			var extname = {
				sass: 'scss',
				less: 'less',
				stylus: 'styl'
			};
			this.extPreprocessor = extname[data.preprocessor];
			done();
		}.bind(this));
	},
	appFramework: function() {
		var done = this.async();
		var prompt = {
			type: 'list',
			name: 'appFramework',
			message: 'select the javascript framework you would like to use',
			default: 'angular',
			choices: ['angular', 'none']
		};

		this.prompt(prompt, function(data) {
			this.appFramework = data.appFramework;
			done();
		}.bind(this));
	},
	frameworkModules: function() {
		var done = this.async();
		this.ngAnimate = false;
		this.ngCookies = false;
		this.ngResource = false;
		this.ngSanitize = false;
		this.ngTouch = false;

		var prompt = {
			type: 'checkbox',
			name: 'frameworkModules',
			message: 'chich modules would you like to include',
			choices: [
				{
					value: 'ngAnimate',
					name: 'ngAnimate',
					checked: true
				},
				{
					value: 'ngCookies',
					name: 'ngCookies',
					checked: true
				},
				{
					value: 'ngResource',
					name: 'ngResource',
					checked: true
				},
				{
					value: 'ngSanitize',
					name: 'ngSanitize',
					checked: true
				},
				{
					value: 'ngTouch',
					name: 'ngTouch',
					checked: true
				}
			]
		};

		this.prompt(prompt, function(data) {
			this.frameworkModules = data.frameworkModules;
			for (var key in this.frameworkModules) {
				this[this.frameworkModules[key]] = true;
			}
			done();
		}.bind(this));
	},
	angularRoute: function() {
		var done = this.async();
    var prompt = {
      type: 'list',
      name: 'angularRoute',
      message: 'select how you want route angular',
      default: 'uiRouter',
      choices: ['uiRouter', 'ngRoute', 'none']
    };

    this.prompt(prompt, function(data) {
      this.angularRoute = data.angularRoute;
      this.angularRouteDirective = data.angularRoute === 'uiRouter' ?
        'ui-view' : 'ng-view';
      done();
    }.bind(this));
  },
  angularTest: function() {
  	if (this.appFramework === 'angular') {
    	this.sourceRoot(path.join(__dirname,  'templates/karma'), this);
		    this.directory('.', '.');
    }
  },
  common: function() {
    this.sourceRoot(path.join(__dirname,  'templates/common'), this);
    this.directory('.', '.');
  },
  gulp: function() {
    this.sourceRoot(path.join(__dirname,  'templates/gulp'), this);
    this.directory('.', '.');

  	this.sourceRoot(path.join(__dirname,  'templates/tasks'), this);
  	var config;

  	config = {
  		template: this.templatePath('gulp.config.js'),
  		dest: this.destinationPath('tasks/gulp.config.js')
  	};
  	this.fs.copyTpl(config.template, config.dest, this);

  	config = {
  		template: this.templatePath('watch.js'),
  		dest: this.destinationPath('tasks/watch.js')
  	};
  	this.fs.copyTpl(config.template, config.dest, this);

  	config = {
  		template: this.templatePath('default.js'),
  		dest: this.destinationPath('tasks/default.js')
  	};
  	this.fs.copyTpl(config.template, config.dest, this);

  	config = {
  		template: this.templatePath('lint.js'),
  		dest: this.destinationPath('tasks/lint.js')
  	};
  	this.fs.copyTpl(config.template, config.dest, this);

		config = {
  		template: this.templatePath('livereload.js'),
  		dest: this.destinationPath('tasks/livereload.js')
  	};
  	this.fs.copyTpl(config.template, config.dest, this);

  	config = {
  		template: this.templatePath('sprite-images.js'),
  		dest: this.destinationPath('tasks/sprite-images.js')
  	};
  	this.fs.copyTpl(config.template, config.dest, this);

  	config = {
  		template: this.templatePath('styles.js'),
  		dest: this.destinationPath('tasks/styles.js')
  	};
  	this.fs.copyTpl(config.template, config.dest, this);

  	config = {
  		template: this.templatePath('scripts.js'),
  		dest: this.destinationPath('tasks/scripts.js')
  	};
  	this.fs.copyTpl(config.template, config.dest, this);

  	config = {
  		template: this.templatePath('views.js'),
  		dest: this.destinationPath('tasks/views.js')
  	};
  	this.fs.copyTpl(config.template, config.dest, this);

  	config = {
  		template: this.templatePath('dependencies.js'),
  		dest: this.destinationPath('tasks/dependencies.js')
  	};
  	this.fs.copyTpl(config.template, config.dest, this);
  },
  bower: function() {
    this.sourceRoot(path.join(__dirname,  'templates/bower'), this);
    this.directory('.', '.');
  },
  client: function() {
    mkdirp('client/imgs');
    mkdirp('client/styles/components');
    mkdirp('client/sprites');
    if (this.appFramework !== 'none') {
      mkdirp('client/'+this.appFramework);
    }
  },
  views: function() {
    this.sourceRoot(path.join(__dirname,  'templates/views/'+this.viewEngine), this);
    this.directory('.', 'client/views');
  },
  styles: function() {
    this.sourceRoot(path.join(__dirname,  'templates/styles/'+this.preprocessor), this);
    this.directory('.', 'client/styles');
  },
  angular: function() {
    if (this.appFramework === 'angular') {
      this.sourceRoot(path.join(__dirname,  'templates/angular'), this);
      this.directory('.', 'client/angular');

			this.sourceRoot(path.join(__dirname,  'templates/angular-templates/'+this.viewEngine), this);
			this.directory('.', 'client/angular');
		}
	},
	scripts: function() {
		if (this.appFramework === 'none') {
			this.sourceRoot(path.join(__dirname,  'templates/scripts'), this);
      this.directory('.', 'client/scripts');
    }
	},
	public: function() {
		this.sourceRoot(path.join(__dirname,  'templates/public'), this);
		this.directory('.', 'public');
		mkdirp('public/imgs/sprites');
		mkdirp('public/scripts');
	},
	install: function() {
		this.installDependencies({
			bower: true,
			npm: true,
			skipInstall: true
		});
	}
});
