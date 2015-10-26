'use strict';

let config = {
  development: {
    server: {
      port: 3000,
      proxy: 5000
    },
    database: {
      url: 'mongodb://localhost/<%= slugify(appname) %>'
    },
    secret: '<%= appSecret %>',
    token: {
      expiresIn: 1440 // 24 hours
    }
  },
  production: {
    server: {
      port: 3000,
      proxy: 5000
    },
    database: {
      url: 'mongodb://localhost/<%= slugify(appname) %>'
    },
    secret: '<%= appSecret %>',
    token: {
      expiresIn: 1440 // 24 hours
    }
  },
  test: {
    server: {
      port: 3005,
      proxy: 5005
    },
    database: {
      url: 'mongodb://localhost/<%= slugify(appname) %>_test'
    },
    secret: '<%= appSecret %>',
    token: {
      expiresIn: 1440 // 24 hours
    }
  }
};

let shell = require('shell-arguments');
let env = shell.env || process.env.NODE_ENV || 'production';

module.exports = config[env];
