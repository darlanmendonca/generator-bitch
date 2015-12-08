'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var util = require('util');
var slugify = require('underscore.string/slugify');
var mkdirp = require('mkdirp');

var babel = require('gulp-babel');
var gulpif = require('gulp-if');
var js2coffee = require('gulp-js2coffee');

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
	appType: function() {
		var done = this.async();
		var prompt = {
			type: 'list',
			name: 'appType',
			message: 'application type',
			default: 'both',
			choices: ['server', 'client', 'both']
		};
		this.prompt(prompt, function(data) {
			this.appType = data.appType;
			this.isAppType = function (type) {
				var is;
				switch(type) {
				case 'client':
						is =  this.appType === 'client' || this.appType === 'both';
						break;
					case 'server':
						is = this.appType === 'server' || this.appType === 'both';
						break;
				}
				return is;
			};
			done();
		}.bind(this));
	},
	appSecret: function() {
		var done = this.async();
		var prompt = {
			type: 'input',
			name: 'appSecret',
			message: 'type secret to use in json web token'
		};
		if (this.appType === 'client') {
			done();
		} else {
			this.prompt(prompt, function(data) {
				this.appSecret = data.appSecret ? data.appSecret : '';
				done();
			}.bind(this));
		}
	},
	scriptType: function() {
		var done = this.async();
		var prompt = {
			type: 'list',
			name: 'scriptType',
			message: 'javascript is write in',
			default: 'es6',
			choices: ['es6', 'es5', 'coffeescript']
		};
		this.prompt(prompt, function(data) {
			this.scriptType = data.scriptType;
			this.extScript = this.scriptType === 'coffeescript' ? 'coffee' : 'js';
			var condition;

			if (this.scriptType === 'es5') {
				condition = function (file) {
					return path.extname(file.path) === '.js';
				};
				this.registerTransformStream(gulpif(condition, babel()));
			} else if (this.scriptType === 'coffeescript') {
				condition = function (file) {
					return path.extname(file.path) === '.js';
				};
				this.registerTransformStream(gulpif(condition, babel()));
				this.registerTransformStream(gulpif(condition, js2coffee()));
			}

			done();
		}.bind(this));
	},
	viewEngine: function() {
		var done = this.async();
		var strView = this.isAppType('client') ? 'template view' : 'view engine';
		var prompt = {
			type: 'list',
			name: 'viewEngine',
			message: util.format('select %s you would like to use', strView),
			default: 'jade',
			choices: ['jade', 'ejs']
		};
		if (this.appType === 'server') {
			done();
		} else {
			this.prompt(prompt, function(data) {
				this.viewEngine = data.viewEngine;
				done();
			}.bind(this));
		}
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
		if (this.appType === 'server') {
			done();
		} else {
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
		}
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
		if (this.appType === 'server') {
			done();
		} else {
			this.prompt(prompt, function(data) {
				this.appFramework = data.appFramework;
				done();
			}.bind(this));
		}
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
		if (this.appType === 'server' || this.appFramework !== 'angular') {
			done();
		} else {
			this.prompt(prompt, function(data) {
				this.frameworkModules = data.frameworkModules;
				for (var key in this.frameworkModules) {
					this[this.frameworkModules[key]] = true;
				}
				done();
			}.bind(this));
		}
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
    if (this.appType === 'server' || this.appFramework !== 'angular') {
      done();
    } else {
      this.prompt(prompt, function(data) {
        this.angularRoute = data.angularRoute;
        this.angularRouteDirective = data.angularRoute === 'uiRouter' ?
          'ui-view' : 'ng-view';
        done();
      }.bind(this));
    }
  },
  angularTest: function() {
  	if ((this.appType === 'client' || this.appType === 'both') && this.appFramework === 'angular') {
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
  },
  bower: function() {
    if (this.appType === 'client' || this.appType === 'both') {
      this.sourceRoot(path.join(__dirname,  'templates/bower'), this);
      this.directory('.', '.');
    }
  },
  express: function() {
    if (this.isAppType('server')) {
    	mkdirp('server');
      this.sourceRoot(path.join(__dirname,  'templates/express'), this);
      this.directory('.', './server');

      if (this.appType === 'both') {
      	this.sourceRoot(path.join(__dirname,  'templates/express-pages'), this);
	      this.directory('.', './server/pages');
      }

    }
  },
  test: function() {
    if (this.isAppType('server') || this.isAppType('both')) {
      mkdirp('test');
      this.sourceRoot(path.join(__dirname,  'templates/test'), this);
      this.directory('.', './test');
    }
  },
  docs: function() {
    if (this.isAppType('server') || this.isAppType('both')) {
      mkdirp('server/docs');
    }
  },
  assets: function() {
    if (this.isAppType('client')) {
      mkdirp('assets/imgs');
      mkdirp('assets/styles/components');
      mkdirp('assets/sprites');
      if (this.appFramework !== 'none') {
        mkdirp('assets/'+this.appFramework);
      }
    }
  },
  views: function() {
    if (this.isAppType('client')) {
      this.sourceRoot(path.join(__dirname,  'templates/views/'+this.viewEngine), this);
      this.directory('.', 'assets/views');
    }
  },
  styles: function() {
    if (this.isAppType('client')) {
      this.sourceRoot(path.join(__dirname,  'templates/styles/'+this.preprocessor), this);
      this.directory('.', 'assets/styles');
    }
  },
  angular: function() {
    if ((this.isAppType('client') || this.isAppType('both')) && this.appFramework === 'angular') {
      this.sourceRoot(path.join(__dirname,  'templates/angular'), this);
      this.directory('.', 'assets/angular');

			this.sourceRoot(path.join(__dirname,  'templates/angular-templates/'+this.viewEngine), this);
			this.directory('.', 'assets/angular');
		}
	},
	scripts: function() {
		if ((this.isAppType('client') || this.isAppType('both')) && this.appFramework === 'none') {
			this.sourceRoot(path.join(__dirname,  'templates/scripts'), this);
      this.directory('.', 'assets/scripts');
    }
	},
	public: function() {
		if (this.isAppType('client')) {
			this.sourceRoot(path.join(__dirname,  'templates/public'), this);
			this.directory('.', 'public');
			mkdirp('public/imgs/sprites');
			mkdirp('public/scripts');
		}
	},
	install: function() {
		this.installDependencies({
			bower: this.isAppType('client'),
			npm: true,
			skipInstall: true
		});
	}
});
