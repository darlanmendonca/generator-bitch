'use strict';

var config = {
  development: {
    server: {
      port: 3000,
      proxy: 5000
    },
    database: {
      url: 'mongodb://localhost/<%= slugify(appname) %>'
    }
  },
  production: {
    server: {
      port: 3000,
      proxy: 5000
    },
    database: {
      url: 'mongodb://localhost/<%= slugify(appname) %>'
    }
  }
};

var shell = require('shell-arguments');
var env = shell.env || process.env.ENV || 'production';

module.exports = config[env];
