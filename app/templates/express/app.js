'use strict';

let express = require('express');
let http = require('http');
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let compress = require('compression');
let methodOverride = require('method-override');
let multer = require('multer')();
let config = require('../config');
let routes = require('./routers.js');
let shell = require('shell-arguments');

let app = express();
let server = http.createServer(app);

app.set('env', shell.env || process.env.NODE_ENV || 'production');
app.set('port', config.server.port);

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app
  .use(compress())
  .use(methodOverride())
  .use(multer.array())
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use('/api', routes.api);

mongoose.Promise = require('bluebird');
mongoose.connect(config.database.url, function() {
  server.listen(app.get('port'), function () {
  	if (app.get('env') !== 'test') {
	    console.log('> localhost:' + app.get('port'));
  	}
  });
});

mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});

module.exports = app;
