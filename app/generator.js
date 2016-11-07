import {Base} from 'yeoman-generator';
import path from 'path';
import mkdirp from 'mkdirp';

module.exports = Base.extend({
  constructor,
  applicationNameParam,
  viewEngineParam,
  preprocessorParam,
  appFrameworkParam,
  frameworkModulesParam,
  angularRouteParam,
  saveParams,
  angularTest,
  common,
  gulp,
  bower,
  sources,
  views,
  templates,
  styles,
  angular,
  scripts,
  publicDir,
  install,
});

function constructor() {
  Base.apply(this, arguments);
}

function applicationNameParam() {
  let done = this.async();
  let prompt = {
    type: 'input',
    name: 'applicationName',
    message: 'application name',
    default: path.basename(process.cwd()),
  };

  this.prompt(prompt, data => {
    this.applicationName = data.applicationName;
    this.applicationSlug = require('underscore.string/slugify')(this.applicationName);
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
    choices: [
      'jade',
      'ejs',
      'html',
    ],
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
    choices: [
      'sass',
      'less',
      'stylus',
    ],
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
    choices: [
      'angular',
      'none',
    ],
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
    let checked = false;

    let prompt = {
      type: 'checkbox',
      name: 'frameworkModules',
      message: 'chich modules would you like to include',
      choices: [
        {
          value: 'ngAnimate',
          name: 'ngAnimate',
          checked,
        },
        {
          value: 'ngCookies',
          name: 'ngCookies',
          checked,
        },
        {
          value: 'ngResource',
          name: 'ngResource',
          checked,
        },
        {
          value: 'ngSanitize',
          name: 'ngSanitize',
          checked,
        },
        {
          value: 'ngTouch',
          name: 'ngTouch',
          checked,
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
      choices: [
        'uiRouter',
        'ngRoute',
        'none',
      ],
    };

    this.prompt(prompt, data => {
      this.angularRoute = data.angularRoute;
      this.angularRouteDirective = data.angularRoute === 'uiRouter'
        ? 'ui-view'
        : 'ng-view';

      done();
    });
  }
}

function saveParams() {
  const applicationName = this.applicationName;
  const viewEngine = this.viewEngine;
  const preprocessor = this.preprocessor;
  const appFramework = this.appFramework;
  const frameworkModules = this.frameworkModules;
  const angularRoute = this.angularRoute;

  this.config.set({
    applicationName,
    viewEngine,
    preprocessor,
    appFramework,
    frameworkModules,
    angularRoute,
  });
}

function angularTest() {
  if (this.appFramework === 'angular') {
    this.sourceRoot(`${__dirname}/templates/karma`, this);
    this.directory('.', '.');
  }
}

function common() {
  this.sourceRoot(`${__dirname}/templates/common`, this);
  this.directory('.', '.');
}

function gulp() {
  this.sourceRoot(`${__dirname}/templates/gulp`, this);
  this.directory('.', '.');

  this.sourceRoot(`${__dirname}/templates/tasks`, this);
  this.directory('.', './tasks');
}

function bower() {
  this.sourceRoot(`${__dirname}/templates/bower`, this);
  this.directory('.', '.');
}

function sources() {
  mkdirp('sources/imgs');
  mkdirp('sources/styles/components');
  mkdirp('sources/sprites');
  if (this.appFramework !== 'none') {
    mkdirp(`sources/${this.appFramework}`);
  }
}

function views() {
  this.sourceRoot(`${__dirname}/templates/views/${this.viewEngine}`, this);
  this.directory('.', 'sources/views');
}

function templates() {
  if (this.appFramework !== 'angular') {
    this.fs.delete('./tasks/templates.js');
  }
}

function styles() {
  this.sourceRoot(`${__dirname}/templates/styles/${this.preprocessor}`, this);
  this.directory('.', 'sources/styles');
}

function angular() {
  if (this.appFramework === 'angular') {
    this.sourceRoot(`${__dirname}/templates/angular`, this);
    this.directory('.', 'sources/angular');

    this.sourceRoot(`${__dirname}/templates/templates/${this.viewEngine}`, this);
    this.directory('.', 'sources/angular');
  }
}

function scripts() {
  if (this.appFramework === 'none') {
    this.sourceRoot(`${__dirname}/templates/scripts`, this);
    this.directory('.', 'sources/scripts');
  }
}

function publicDir() {
  this.sourceRoot(`${__dirname}/templates/public`, this);
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
