import generators from 'yeoman-generator';
import path from 'path';
import mkdirp from 'mkdirp';
console.log(__filename);

const generator = {
  constructor,
  applicationNameParam,
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
  react,
  scripts,
  publicDir,
  install,
};

module.exports = generators.Base.extend(generator);

function constructor() {
  generators.Base.apply(this, arguments);
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
    choices: ['jade', 'ejs'],
  };

  this.prompt(prompt, data => {
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
    choices: [
      'angular',
      'react',
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

function react() {
  if (this.appFramework === 'react') {
    this.sourceRoot(path.join(__dirname,  'templates/react'), this);
    this.directory('.', 'client/react');
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
