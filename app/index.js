'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _yeomanGenerator.Base.extend({
  constructor: constructor,
  applicationNameParam: applicationNameParam,
  viewEngineParam: viewEngineParam,
  preprocessorParam: preprocessorParam,
  appFrameworkParam: appFrameworkParam,
  frameworkModulesParam: frameworkModulesParam,
  angularRouteParam: angularRouteParam,
  saveParams: saveParams,
  angularTest: angularTest,
  common: common,
  gulp: gulp,
  bower: bower,
  sources: sources,
  views: views,
  templates: templates,
  styles: styles,
  angular: angular,
  scripts: scripts,
  publicDir: publicDir,
  install: install
});

function constructor() {
  _yeomanGenerator.Base.apply(this, arguments);
}

function applicationNameParam() {
  var _this = this;

  var done = this.async();
  var prompt = {
    type: 'input',
    name: 'applicationName',
    message: 'application name',
    default: _path2.default.basename(process.cwd())
  };

  this.prompt(prompt, function (data) {
    _this.applicationName = data.applicationName;
    _this.applicationSlug = require('underscore.string/slugify')(_this.applicationName);
    done();
  });
}

function viewEngineParam() {
  var _this2 = this;

  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'viewEngine',
    message: 'select template view you would like to use',
    default: 'pug',
    choices: ['pug', 'ejs', 'html']
  };

  this.prompt(prompt, function (data) {
    _this2.viewEngine = data.viewEngine;
    done();
  });
}

function preprocessorParam() {
  var _this3 = this;

  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'preprocessor',
    message: 'select css preprocessor you would like to use',
    default: 'sass',
    choices: ['sass', 'less', 'stylus']
  };

  this.prompt(prompt, function (data) {
    _this3.preprocessor = data.preprocessor;
    var extname = {
      sass: 'scss',
      less: 'less',
      stylus: 'styl'
    };

    _this3.extPreprocessor = extname[data.preprocessor];
    done();
  });
}

function appFrameworkParam() {
  var _this4 = this;

  var done = this.async();
  var prompt = {
    type: 'list',
    name: 'appFramework',
    message: 'select the javascript framework you would like to use',
    default: 'angular',
    choices: ['angular', 'none']
  };

  this.prompt(prompt, function (data) {
    _this4.appFramework = data.appFramework;
    done();
  });
}

function frameworkModulesParam() {
  var _this5 = this;

  if (this.appFramework === 'angular') {
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
      choices: [{
        value: 'ngAnimate',
        name: 'ngAnimate'
      }, {
        value: 'ngCookies',
        name: 'ngCookies'
      }, {
        value: 'ngResource',
        name: 'ngResource'
      }, {
        value: 'ngSanitize',
        name: 'ngSanitize'
      }, {
        value: 'ngTouch',
        name: 'ngTouch'
      }]
    };

    this.prompt(prompt, function (data) {
      _this5.frameworkModules = data.frameworkModules;
      for (var key in _this5.frameworkModules) {
        _this5[_this5.frameworkModules[key]] = true;
      }
      done();
    });
  }
}

function angularRouteParam() {
  var _this6 = this;

  if (this.appFramework === 'angular') {
    var done = this.async();
    var prompt = {
      type: 'list',
      name: 'angularRoute',
      message: 'select how you want route angular',
      default: 'uiRouter',
      choices: ['uiRouter', 'ngRoute', 'none']
    };

    this.prompt(prompt, function (data) {
      _this6.angularRoute = data.angularRoute;
      _this6.angularRouteDirective = data.angularRoute === 'uiRouter' ? 'ui-view' : 'ng-view';

      done();
    });
  }
}

function saveParams() {
  var applicationName = this.applicationName;
  var viewEngine = this.viewEngine;
  var preprocessor = this.preprocessor;
  var appFramework = this.appFramework;
  var frameworkModules = this.frameworkModules;
  var angularRoute = this.angularRoute;

  this.config.set({
    applicationName: applicationName,
    viewEngine: viewEngine,
    preprocessor: preprocessor,
    appFramework: appFramework,
    frameworkModules: frameworkModules,
    angularRoute: angularRoute
  });
}

function angularTest() {
  if (this.appFramework === 'angular') {
    this.sourceRoot(__dirname + '/templates/karma', this);
    this.directory('.', '.');
  }
}

function common() {
  this.sourceRoot(__dirname + '/templates/common', this);
  this.directory('.', '.');
}

function gulp() {
  this.sourceRoot(__dirname + '/templates/gulp', this);
  this.directory('.', '.');

  this.sourceRoot(__dirname + '/templates/tasks', this);
  this.directory('.', './tasks');
}

function bower() {
  this.sourceRoot(__dirname + '/templates/bower', this);
  this.directory('.', '.');
}

function sources() {
  (0, _mkdirp2.default)('sources/imgs');
  (0, _mkdirp2.default)('sources/styles/components');
  (0, _mkdirp2.default)('sources/sprites');
  if (this.appFramework !== 'none') {
    (0, _mkdirp2.default)('sources/' + this.appFramework);
  }
}

function views() {
  this.sourceRoot(__dirname + '/templates/views/' + this.viewEngine, this);
  this.directory('.', 'sources/views');
}

function templates() {
  if (this.appFramework !== 'angular') {
    this.fs.delete('./tasks/templates.js');
  }
}

function styles() {
  this.sourceRoot(__dirname + '/templates/styles/' + this.preprocessor, this);
  this.directory('.', 'sources/styles');
}

function angular() {
  if (this.appFramework === 'angular') {
    this.sourceRoot(__dirname + '/templates/angular', this);
    this.directory('.', 'sources/angular');

    this.sourceRoot(__dirname + '/templates/templates/' + this.viewEngine, this);
    this.directory('.', 'sources/angular');
  }
}

function scripts() {
  if (this.appFramework === 'none') {
    this.sourceRoot(__dirname + '/templates/scripts', this);
    this.directory('.', 'sources/scripts');
  }
}

function publicDir() {
  this.sourceRoot(__dirname + '/templates/public', this);
  this.directory('.', 'public');
  (0, _mkdirp2.default)('public/imgs/sprites');
  (0, _mkdirp2.default)('public/scripts');
}

function install() {
  this.installDependencies({
    bower: false,
    npm: true,
    skipInstall: true
  });
}
