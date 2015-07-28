var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var compress = require('compression');
var favicon = require('static-favicon');
var methodOverride = require('method-override');
var config = require('./config');
var routes = require('./routes');
var shell = require('shell-arguments');



var app = express();
var server = http.createServer(app);

app.set('env', shell.env || process.env.ENV || 'production');
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'assets', 'views'));
app.set('view engine', '<%= viewEngine %>');

app
  .use(compress())
  .use(favicon())
  .use(methodOverride())
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes.pages);

mongoose.connect(config.database.url, function() {
  server.listen(app.get('port'), function () {
    console.log('> localhost:' + app.get('port'));

    if (app.get('env') === 'development') {
      var open = require('open');
      open('http://localhost:'+config.server.proxy, 'google chrome');
    }
  });
});

mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});
