config =
  development:
    server:
      port: 3000
      proxy: 5000
    database:
      url: 'mongodb://localhost/<%= slugify(appname) %>'
    secret: '<%= appSecret %>'
    token:
      expiresInMinutes: 1440 # 24 hours

  production:
    server:
      port: 3000
      proxy: 5000
    database:
      url: 'mongodb://localhost/<%= slugify(appname) %>'
    secret: '<%= appSecret %>'
    token:
      expiresInMinutes: 1440 # 24 hours

shell = require 'shell-arguments'
env = shell.env or process.env.ENV or 'production'

module.exports = config[env]
