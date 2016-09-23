import shell from 'shell-arguments';

let config = {
  development: {
    server: {
      port: 3000,
      proxy: 5000
    }
  },
  production: {
    server: {
      port: 3000,
      proxy: 5000
    }
  },
  test: {
    server: {
      port: 3005,
      proxy: 5005
    }
  }
};


let env = shell.env
  || process.env.NODE_ENV
  || 'production';

module.exports = config[env];
