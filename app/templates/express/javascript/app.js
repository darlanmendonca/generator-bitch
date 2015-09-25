'use strict';

var express = require('express');
var http = require('http');<% if (appType === 'both') { %>
var path = require('path');<% } %>
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var multer = require('multer')();
var config = require('./config');
var routes = require('./routes');
var shell = require('shell-arguments');<% if (appType === 'both') { %>
var favicon = require('serve-favicon');<% } %>

var app = express();
var server = http.createServer(app);

app.set('env', shell.env || process.env.ENV || 'production');
app.set('port', config.server.port);<% if (appType === 'both') { %>
app.set('views', path.join(__dirname, 'assets', 'views'));
app.set('view engine', '<%= viewEngine %>');<% } %>

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app
  .use(compress())<% if (appType === 'both') { %>
  .use(favicon(__dirname + '/public/imgs/favicons/icon.ico'))<% } %>
  .use(methodOverride())
  .use(multer.array())
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())<% if (appType === 'both') { %>
  .use(express.static(path.join(__dirname, 'public')))<% } %><% if (appType === 'server' || appType === 'both') { %>
  .use('/api', routes.api)<% } %><% if (appType === 'client' || appType === 'both') { %>
  .use('/', routes.pages)<% } %>;

mongoose.connect(config.database.url, function() {
  server.listen(app.get('port'), function () {
    console.log('> localhost:' + app.get('port'));<% if (appType === 'both') { %>

    if (app.get('env') === 'development' && process.env.open === 'true') {
      var open = require('open');
      open('http://localhost:'+config.server.proxy, 'google chrome');
    }<% } %>
  });
});

mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});
