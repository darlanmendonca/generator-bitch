'use strict';

let express = require('express');
let http = require('http');<% if (appType === 'both') { %>
let path = require('path');<% } %>
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let compress = require('compression');
let methodOverride = require('method-override');
let multer = require('multer')();
let config = require('../config');
let routes = require('./routers.js');
let shell = require('shell-arguments');<% if (appType === 'both') { %>
let favicon = require('serve-favicon');<% } %>

let app = express();
let server = http.createServer(app);

app.set('env', shell.env || process.env.NODE_ENV || 'production');
app.set('port', config.server.port);<% if (appType === 'both') { %>
app.set('views', path.join(__dirname, '..', 'client', 'views'));
app.set('view engine', '<%= viewEngine %>');<% } %>

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app
  .use(compress())<% if (appType === 'both') { %>
  .use(favicon('./public/imgs/favicons/icon.ico'))<% } %>
  .use(methodOverride())
  .use(multer.array())
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())<% if (appType === 'both') { %>
  .use(express.static('public'))<% } %><% if (appType === 'server' || appType === 'both') { %>
  .use('/api', routes.api)<% } %><% if (appType === 'client' || appType === 'both') { %>
  .use('/', routes.pages)<% } %>;

mongoose.connect(config.database.url, function() {
  server.listen(app.get('port'), function () {
  	if (app.get('env') !== 'test') {
	    console.log('> localhost:' + app.get('port'));
  	}<% if (appType === 'both') { %>

    if (app.get('env') === 'development' && process.env.open === 'true') {
      var open = require('open');
      open('http://localhost:'+config.server.proxy, 'google chrome');
    }<% } %>
  });
});

mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});

module.exports = app;
