'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var slugify = require('underscore.string/slugify');

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

    this.cssPreprocessors = {
      less: '~1.2.3',
      sass: '~0.7.1'
    }
  },
  prompts: function () {
    var cb = this.async();
    var prompts = [
      {
        type: 'input',
        name: 'appname',
        message: 'Application name',
        default: this.appname
      },
      {
        type: 'list',
        name: 'appType',
        message: 'Select type of your app',
        default: 'backend and client',
        choices: ['backend and client', 'backend', 'client']
      },
      {
        type: 'list',
        name: 'viewEngine',
        message: 'Select view engine you would like to use',
        default: 'jade',
        choices: ['jade', 'handlebars', 'ejs', 'html']
      },
      {
        type: 'list',
        name: 'buildTool',
        message: 'Select the build tool you want to use for this project',
        default: 'gulp',
        choices: ['gulp', 'grunt']
      },
      {
        type: 'list',
        name: 'cssPreprocessor',
        message: 'Select the css preprocessor you would like to use',
        default: 'less',
        choices: ['less', 'sass', 'stylus'],
      },
    ];

    var answersCallback = (function (answers) {
      this.appname = answers.appname;
      this.appType = answers.appType;
      this.viewEngine = answers.viewEngine;
      this.buildTool = answers.buildTool;
      this.cssPreprocessor = answers.cssPreprocessor;
      cb();
    }).bind(this);

    this.prompt(prompts, answersCallback);
  },
  expressSetup: function() {
    var isBackend = this.appType === 'backend' || 'backend and client';
    if (isBackend) {
      this.sourceRoot(path.join(__dirname,  'templates/express4/mvc'), this);
      this.directory('.', '.');
    }
  },
  writePackageJSONFile: function () {
    this.sourceRoot(path.join(__dirname, 'templates/common'));
    this.template('.package.json', 'package.json');
  },
  install: function() {
    this.installDependencies({
      bower: true,
      npm: true,
      skipInstall: false
    });
  }
});
