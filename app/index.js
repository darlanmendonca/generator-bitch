'use strict';

let generators = require('yeoman-generator');
let path = require('path');
let slugify = require('underscore.string/slugify');
let mkdirp = require('mkdirp');

let babel = require('gulp-babel');
let gulpif = require('gulp-if');

module.exports = generators.Base.extend({
	constructor,
	appname,
  scriptType,
	viewEngine,
	preprocessor,
	appFramework,
	frameworkModules,
	angularRoute,
  angularTest,
  common,
  gulp,
  bower,
  client,
  views,
  styles,
  angular,
	scripts,
	publicDir,
	install,
});

function constructor() {
  generators.Base.apply(this, arguments);
  this.slugify = slugify;

  this.argument('appname', {
    desc: 'create an app with name [appname]',
    type: Boolean,
    required: false,
    defaults: path.basename(process.cwd())
  });
}

function appname() {
  let done = this.async();
  let prompt = {
    type: 'input',
    name: 'appname',
    message: 'application name',
    default: this.appname
  };
  this.prompt(prompt, function(data) {
    this.appname = data.appname;
    done();
  }.bind(this));
}

function scriptType() {
  let done = this.async();
  let prompt = {
    type: 'list',
    name: 'scriptType',
    message: 'javascript is write in',
    default: 'es6',
    choices: ['es6', 'es5']
  };
  this.prompt(prompt, function(data) {
    this.scriptType = data.scriptType;
    this.extScript = 'js';
    let condition;

    if (this.scriptType === 'es5') {
      condition = function (file) {
        return path.extname(file.path) === '.js';
      };
      this.registerTransformStream(gulpif(condition, babel()));
    }

    done();
  }.bind(this));
}

function viewEngine() {
  let done = this.async();
  let prompt = {
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
}

function preprocessor() {
  let done = this.async();
  let prompt = {
    type: 'list',
    name: 'preprocessor',
    message: 'select css preprocessor you would like to use',
    default: 'sass',
    choices: ['sass', 'less', 'stylus']
  };

  this.prompt(prompt, function(data) {
    this.preprocessor = data.preprocessor;
    let extname = {
      sass: 'scss',
      less: 'less',
      stylus: 'styl'
    };
    this.extPreprocessor = extname[data.preprocessor];
    done();
  }.bind(this));
}

function appFramework() {
  let done = this.async();
  let prompt = {
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
}

function frameworkModules() {
  if (this.appFramework === 'angular') {
    let done = this.async();
    this.ngAnimate = false;
    this.ngCookies = false;
    this.ngResource = false;
    this.ngSanitize = false;
    this.ngTouch = false;

    let prompt = {
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
      for (let key in this.frameworkModules) {
        this[this.frameworkModules[key]] = true;
      }
      done();
    }.bind(this));
  }
}

function angularRoute() {
  if (this.appFramework === 'angular') {
    let done = this.async();
    let prompt = {
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
  }
}

function angularTest() {
  if (this.appFramework === 'angular') {
    this.sourceRoot(path.join(__dirname,  'templates/karma'), this);
      this.directory('.', '.');
  }
}

function common() {
  this.sourceRoot(path.join(__dirname,  'templates/common'), this);
  this.directory('.', '.');
}

function gulp() {
  this.sourceRoot(path.join(__dirname,  'templates/gulp'), this);
  this.directory('.', '.');

  this.sourceRoot(path.join(__dirname,  'templates/tasks'), this);
  this.directory('.', './tasks');
}

function bower() {
  this.sourceRoot(path.join(__dirname,  'templates/bower'), this);
  this.directory('.', '.');
}

function client() {
  mkdirp('client/imgs');
  mkdirp('client/styles/components');
  mkdirp('client/sprites');
  if (this.appFramework !== 'none') {
    mkdirp('client/'+this.appFramework);
  }
}

function views() {
  this.sourceRoot(path.join(__dirname,  'templates/views/'+this.viewEngine), this);
  this.directory('.', 'client/views');
}

function styles() {
  this.sourceRoot(path.join(__dirname,  'templates/styles/'+this.preprocessor), this);
  this.directory('.', 'client/styles');
}

function angular() {
  if (this.appFramework === 'angular') {
    this.sourceRoot(path.join(__dirname,  'templates/angular'), this);
    this.directory('.', 'client/angular');

    this.sourceRoot(path.join(__dirname,  'templates/angular-templates/'+this.viewEngine), this);
    this.directory('.', 'client/angular');
  }
}

function scripts() {
  if (this.appFramework === 'none') {
    this.sourceRoot(path.join(__dirname,  'templates/scripts'), this);
    this.directory('.', 'client/scripts');
  }
}

function publicDir() {
  this.sourceRoot(path.join(__dirname,  'templates/public'), this);
  this.directory('.', 'public');
  mkdirp('public/imgs/sprites');
  mkdirp('public/scripts');
}

function install() {
  this.installDependencies({
    bower: true,
    npm: true,
    skipInstall: true
  });
}
