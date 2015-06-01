var config = {
  development: {
    server: {
      port: 3000,
    },
    database: {
      url: 'mongodb://localhost/<%= slugify(appname) %>'
    }
  },
  testing: {
    server: {
      port: 3000
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

module.exports = config[process.env.NODE_ENV] || config.development;
