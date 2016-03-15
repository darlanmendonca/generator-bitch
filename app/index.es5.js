'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: constructor,
  appNameParam: appNameParam,
  scriptTypeParam: scriptTypeParam,
  viewEngineParam: viewEngineParam,
  preprocessorParam: preprocessorParam,
  appFrameworkParam: appFrameworkParam,
  frameworkModulesParam: frameworkModulesParam,
  angularRouteParam: angularRouteParam,
  angularTest: angularTest,
  common: common,
  gulp: gulp,
  bower: bower,
  client: client,
  views: views,
  templates: templates,
  styles: styles,
  angular: angular,
  scripts: scripts,
  publicDir: publicDir,
  install: install
});

function constructor() {
  generators.Base.apply(this, arguments);
  this.slugify = require('underscore.string/slugify');
}

function appNameParam() {
  var _this = this;

  var done = this.async();
  var prompt = {
    type: 'input',
    name: 'appName',
    message: 'application name',
    default: path.basename(process.cwd())
  };

  this.prompt(prompt, function (data) {
    _this.appName = data.appName;
    done();
  });
}

function scriptTypeParam() {
  var _this2 = this;

  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'scriptType',
    message: 'javascript is write in',
    default: 'es6',
    choices: ['es6', 'es5']
  };

  this.prompt(prompt, function (data) {
    _this2.scriptType = data.scriptType;
    _this2.extScript = 'js';

    if (_this2.scriptType === 'es5') {
      var babel = require('gulp-babel');
      var gulpif = require('gulp-if');
      var condition = function condition(file) {
        return path.extname(file.path) === '.js';
      };
      _this2.registerTransformStream(gulpif(condition, babel()));
    }

    done();
  });
}

function viewEngineParam() {
  var _this3 = this;

  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'viewEngine',
    message: 'select template view you would like to use',
    default: 'jade',
    choices: ['jade', 'ejs']
  };

  this.prompt(prompt, function (data) {
    _this3.viewEngine = data.viewEngine;
    done();
  });
}

function preprocessorParam() {
  var _this4 = this;

  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'preprocessor',
    message: 'select css preprocessor you would like to use',
    default: 'sass',
    choices: ['sass', 'less', 'stylus']
  };

  this.prompt(prompt, function (data) {
    _this4.preprocessor = data.preprocessor;
    var extname = {
      sass: 'scss',
      less: 'less',
      stylus: 'styl'
    };

    _this4.extPreprocessor = extname[data.preprocessor];
    done();
  });
}

function appFrameworkParam() {
  var _this5 = this;

  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'appFramework',
    message: 'select the javascript framework you would like to use',
    default: 'angular',
    choices: ['angular', 'none']
  };

  this.prompt(prompt, function (data) {
    _this5.appFramework = data.appFramework;
    done();
  });
}

function frameworkModulesParam() {
  var _this6 = this;

  if (this.appFramework === 'angular') {
    (function () {
      var done = _this6.async();
      _this6.ngAnimate = false;
      _this6.ngCookies = false;
      _this6.ngResource = false;
      _this6.ngSanitize = false;
      _this6.ngTouch = false;

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

      _this6.prompt(prompt, function (data) {
        _this6.frameworkModules = data.frameworkModules;
        for (var key in _this6.frameworkModules) {
          _this6[_this6.frameworkModules[key]] = true;
        }
        done();
      });
    })();
  }
}

function angularRouteParam() {
  var _this7 = this;

  if (this.appFramework === 'angular') {
    (function () {
      var done = _this7.async();
      var prompt = {
        type: 'list',
        name: 'angularRoute',
        message: 'select how you want route angular',
        default: 'uiRouter',
        choices: ['uiRouter', 'ngRoute', 'none']
      };

      _this7.prompt(prompt, function (data) {
        _this7.angularRoute = data.angularRoute;
        _this7.angularRouteDirective = data.angularRoute === 'uiRouter' ? 'ui-view' : 'ng-view';
        done();
      });
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
  this.directory('.', './tasks');
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

function templates() {
  if (this.appFramework !== 'angular') {
    this.fs.delete('./tasks/templates.js');
  }
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
