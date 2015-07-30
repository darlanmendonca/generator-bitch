'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var util = require('util');
var slugify = require('underscore.string/slugify');
var mkdirp = require('mkdirp');

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
      choices: ['sass', 'less']
    };
    if (this.appType === 'server') {
      done();
    } else {
      this.prompt(prompt, function(data) {
        this.preprocessor = data.preprocessor;
        var extname = {
          sass: 'scss',
          less: 'less'
        }
        this.extPreprocessor = extname[data.preprocessor];
        done();
      }.bind(this));
    }
  },
  common: function() {
    this.sourceRoot(path.join(__dirname,  'templates/common'), this);
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
      this.sourceRoot(path.join(__dirname,  'templates/express'), this);
      this.directory('.', '.');
    }
  },
  assets: function() {
    if (this.isAppType('client')) {
      mkdirp('assets/imgs');
      mkdirp('assets/styles/components');
      mkdirp('assets/sprites');
      mkdirp('assets/scripts');
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
