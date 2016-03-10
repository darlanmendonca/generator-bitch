'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var slugify = require('underscore.string/slugify');
var mkdirp = require('mkdirp');

var babel = require('gulp-babel');
var gulpif = require('gulp-if');

module.exports = generators.Base.extend({
  constructor: constructor,
  appname: appname,
  scriptType: scriptType,
  viewEngine: viewEngine,
  preprocessor: preprocessor,
  appFramework: appFramework,
  frameworkModules: frameworkModules,
  angularRoute: angularRoute,
  angularTest: angularTest,
  common: common,
  gulp: gulp,
  bower: bower,
  client: client,
  views: views,
  styles: styles,
  angular: angular,
  scripts: scripts,
  publicDir: publicDir,
  install: install
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
  var done = this.async();
  var prompt = {
    type: 'input',
    name: 'appname',
    message: 'application name',
    default: this.appname
  };
  this.prompt(prompt, function (data) {
    this.appname = data.appname;
    done();
  }.bind(this));
}

function scriptType() {
  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'scriptType',
    message: 'javascript is write in',
    default: 'es6',
    choices: ['es6', 'es5']
  };
  this.prompt(prompt, function (data) {
    this.scriptType = data.scriptType;
    this.extScript = 'js';
    var condition = void 0;

    if (this.scriptType === 'es5') {
      condition = function condition(file) {
        return path.extname(file.path) === '.js';
      };
      this.registerTransformStream(gulpif(condition, babel()));
    }

    done();
  }.bind(this));
}

function viewEngine() {
  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'viewEngine',
    message: 'select template view you would like to use',
    default: 'jade',
    choices: ['jade', 'ejs']
  };
  this.prompt(prompt, function (data) {
    this.viewEngine = data.viewEngine;
    done();
  }.bind(this));
}

function preprocessor() {
  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'preprocessor',
    message: 'select css preprocessor you would like to use',
    default: 'sass',
    choices: ['sass', 'less', 'stylus']
  };

  this.prompt(prompt, function (data) {
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

function appFramework() {
  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'appFramework',
    message: 'select the javascript framework you would like to use',
    default: 'angular',
    choices: ['angular', 'none']
  };

  this.prompt(prompt, function (data) {
    this.appFramework = data.appFramework;
    done();
  }.bind(this));
}

function frameworkModules() {
  var _this = this;

  if (this.appFramework === 'angular') {
    (function () {
      var done = _this.async();
      _this.ngAnimate = false;
      _this.ngCookies = false;
      _this.ngResource = false;
      _this.ngSanitize = false;
      _this.ngTouch = false;

      var prompt = {
        type: 'checkbox',
        name: 'frameworkModules',
        message: 'chich modules would you like to include',
        choices: [{
          value: 'ngAnimate',
          name: 'ngAnimate',
          checked: true
        }, {
          value: 'ngCookies',
          name: 'ngCookies',
          checked: true
        }, {
          value: 'ngResource',
          name: 'ngResource',
          checked: true
        }, {
          value: 'ngSanitize',
          name: 'ngSanitize',
          checked: true
        }, {
          value: 'ngTouch',
          name: 'ngTouch',
          checked: true
        }]
      };

      _this.prompt(prompt, function (data) {
        this.frameworkModules = data.frameworkModules;
        for (var key in this.frameworkModules) {
          this[this.frameworkModules[key]] = true;
        }
        done();
      }.bind(_this));
    })();
  }
}

function angularRoute() {
  var _this2 = this;

  if (this.appFramework === 'angular') {
    (function () {
      var done = _this2.async();
      var prompt = {
        type: 'list',
        name: 'angularRoute',
        message: 'select how you want route angular',
        default: 'uiRouter',
        choices: ['uiRouter', 'ngRoute', 'none']
      };

      _this2.prompt(prompt, function (data) {
        this.angularRoute = data.angularRoute;
        this.angularRouteDirective = data.angularRoute === 'uiRouter' ? 'ui-view' : 'ng-view';
        done();
      }.bind(_this2));
    })();
  }
}

function angularTest() {
  if (this.appFramework === 'angular') {
    this.sourceRoot(path.join(__dirname, 'templates/karma'), this);
    this.directory('.', '.');
  }
}

function common() {
  this.sourceRoot(path.join(__dirname, 'templates/common'), this);
  this.directory('.', '.');
}

function gulp() {
  this.sourceRoot(path.join(__dirname, 'templates/gulp'), this);
  this.directory('.', '.');

  this.sourceRoot(path.join(__dirname, 'templates/tasks'), this);
  var config = void 0;

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
}

function bower() {
  this.sourceRoot(path.join(__dirname, 'templates/bower'), this);
  this.directory('.', '.');
}

function client() {
  mkdirp('client/imgs');
  mkdirp('client/styles/components');
  mkdirp('client/sprites');
  if (this.appFramework !== 'none') {
    mkdirp('client/' + this.appFramework);
  }
}

function views() {
  this.sourceRoot(path.join(__dirname, 'templates/views/' + this.viewEngine), this);
  this.directory('.', 'client/views');
}

function styles() {
  this.sourceRoot(path.join(__dirname, 'templates/styles/' + this.preprocessor), this);
  this.directory('.', 'client/styles');
}

function angular() {
  if (this.appFramework === 'angular') {
    this.sourceRoot(path.join(__dirname, 'templates/angular'), this);
    this.directory('.', 'client/angular');

    this.sourceRoot(path.join(__dirname, 'templates/angular-templates/' + this.viewEngine), this);
    this.directory('.', 'client/angular');
  }
}

function scripts() {
  if (this.appFramework === 'none') {
    this.sourceRoot(path.join(__dirname, 'templates/scripts'), this);
    this.directory('.', 'client/scripts');
  }
}

function publicDir() {
  this.sourceRoot(path.join(__dirname, 'templates/public'), this);
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
