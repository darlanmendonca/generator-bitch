'use strict';

let generators = require('yeoman-generator');
let path = require('path');
let mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor,
  appNameParam,
  scriptTypeParam,
  viewEngineParam,
  preprocessorParam,
  appFrameworkParam,
  frameworkModulesParam,
  angularRouteParam,
  angularTest,
  common,
  gulp,
  bower,
  client,
  views,
  templates,
  styles,
  angular,
  scripts,
  publicDir,
  install,
});

function constructor() {
  generators.Base.apply(this, arguments);
  this.slugify = require('underscore.string/slugify');
}

function appNameParam() {
  let done = this.async();
  let prompt = {
    type: 'input',
    name: 'appName',
    message: 'application name',
    default: path.basename(process.cwd()),
  };

  this.prompt(prompt, data => {
    this.appName = data.appName;
    done();
  });
}

function scriptTypeParam() {
  let done = this.async();
  let prompt = {
    type: 'list',
    name: 'scriptType',
    message: 'javascript is write in',
    default: 'es6',
    choices: ['es6', 'es5'],
  };

  this.prompt(prompt, data => {
    this.scriptType = data.scriptType;
    this.extScript = 'js';

    if (this.scriptType === 'es5') {
      let babel = require('gulp-babel');
      let gulpif = require('gulp-if');
      let condition = file => path.extname(file.path) === '.js';
      this.registerTransformStream(gulpif(condition, babel()));
    }

    done();
  });
}

function viewEngineParam() {
  let done = this.async();
  let prompt = {
    type: 'list',
    name: 'viewEngine',
    message: 'select template view you would like to use',
    default: 'jade',
    choices: ['jade', 'ejs'],
  };

  this
    .prompt(prompt, data => {
      this.viewEngine = data.viewEngine;
      done();
    });
}

function preprocessorParam() {
  let done = this.async();
  let prompt = {
    type: 'list',
    name: 'preprocessor',
    message: 'select css preprocessor you would like to use',
    default: 'sass',
    choices: ['sass', 'less', 'stylus'],
  };

  this.prompt(prompt, data => {
    this.preprocessor = data.preprocessor;
    let extname = {
      sass: 'scss',
      less: 'less',
      stylus: 'styl',
    };

    this.extPreprocessor = extname[data.preprocessor];
    done();
  });
}

function appFrameworkParam() {
  let done = this.async();
  let prompt = {
    type: 'list',
    name: 'appFramework',
    message: 'select the javascript framework you would like to use',
    default: 'angular',
    choices: ['angular', 'none'],
  };

  this.prompt(prompt, data => {
    this.appFramework = data.appFramework;
    done();
  });
}

function frameworkModulesParam() {
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
          checked: true,
        },
        {
          value: 'ngCookies',
          name: 'ngCookies',
          checked: true,
        },
        {
          value: 'ngResource',
          name: 'ngResource',
          checked: true,
        },
        {
          value: 'ngSanitize',
          name: 'ngSanitize',
          checked: true,
        },
        {
          value: 'ngTouch',
          name: 'ngTouch',
          checked: true,
        },
      ],
    };

    this.prompt(prompt, data => {
      this.frameworkModules = data.frameworkModules;
      for (let key in this.frameworkModules) {
        this[this.frameworkModules[key]] = true;
      }
      done();
    });
  }
}

function angularRouteParam() {
  if (this.appFramework === 'angular') {
    let done = this.async();
    let prompt = {
      type: 'list',
      name: 'angularRoute',
      message: 'select how you want route angular',
      default: 'uiRouter',
      choices: ['uiRouter', 'ngRoute', 'none'],
    };

    this.prompt(prompt, data => {
      this.angularRoute = data.angularRoute;
      this.angularRouteDirective = data.angularRoute === 'uiRouter' ?
        'ui-view' : 'ng-view';
      done();
    });
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
    mkdirp(`client/${this.appFramework}`);
  }
}

function views() {
  this.sourceRoot(path.join(__dirname,  `templates/views/${this.viewEngine}`), this);
  this.directory('.', 'client/views');
}

function templates() {
  if (this.appFramework !== 'angular') {
    this.fs.delete('./tasks/templates.js');
  }
}

function styles() {
  this.sourceRoot(path.join(__dirname,  `templates/styles/${this.preprocessor}`), this);
  this.directory('.', 'client/styles');
}

function angular() {
  if (this.appFramework === 'angular') {
    this.sourceRoot(path.join(__dirname,  'templates/angular'), this);
    this.directory('.', 'client/angular');

    this.sourceRoot(path.join(__dirname,  `templates/angular-templates/${this.viewEngine}`), this);
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
    skipInstall: true,
  });
}
