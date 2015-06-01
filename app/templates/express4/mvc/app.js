/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
<% if (viewEngine === 'hbs') { %>var hbs = require('express-hbs');<% } %>
var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var favicon = require('static-favicon');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var config = require('./config');
var routes = require('./routes');


mongoose.connect(config.database.url);
mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});

var app = express();

<% if (viewEngine === 'hbs') { %>/**
 * A simple if condtional helper for handlebars
 *
 * Usage:
 *   {{#ifvalue env value='development'}}
 *     do something marvellous
 *   {{/ifvalue}}
 * For more information, check out this gist: https://gist.github.com/pheuter/3515945
 */
hbs.registerHelper('ifvalue', function (conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});<% } %>

/**
 * Express configuration.
 */
app.set('port', config.server.port);
<% if (viewEngine === 'hbs') { %>app.engine('hbs', hbs.express3());<% } %>
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '<%= viewEngine %>');

app
  .use(compress())
  .use(favicon())
  .use(logger('dev'))
  .use(bodyParser())
  .use(methodOverride())
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes.indexRouter)
  .use(function (req, res) {
    res.status(404).render('404', {title: 'Not Found :('});
  });

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
