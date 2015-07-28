var config = {
  development: {
    server: {
      port: 3000,
    },
    database: {
      url: 'mongodb://localhost/<%= slugify(appname) %>'
    }
  },
  production: {
    server: {
      port: 3000
    },
    database: {
      url: 'mongodb://localhost/<%= slugify(appname) %>'
    }
  }
};

var shell = require('shell-arguments');
module.exports = config[shell.env] || config.production;
