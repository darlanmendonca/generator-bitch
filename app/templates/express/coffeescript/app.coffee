express = require 'express'
http = require 'http'
path = require 'path'
mongoose = require 'mongoose'
bodyParser = require 'body-parser'
compress = require 'compression'
methodOverride = require 'method-override'
config = require './config'
routes = require './routes'
shell = require 'shell-arguments'<% if (appType === 'both') { %>
favicon = require 'serve-favicon'<% } %>


app = express()
server = http.createServer app

app.set 'env', shell.env or process.env.ENV or 'production'
app.set 'port', config.server.port<% if (appType === 'both') { %>
app.set 'views', path.join(__dirname, 'assets', 'views')
app.set 'view engine', '<%= viewEngine %>'<% } %>

app
  .use compress()<% if (appType === 'both') { %>
  .use favicon(__dirname + '/public/imgs/favicon.ico')<% } %>
  .use methodOverride()
  .use bodyParser.urlencoded({extended: true})
  .use bodyParser.json()<% if (appType === 'both') { %>
  .use express.static(path.join(__dirname, 'public'))
  .use '/', routes.pages<% } else { %>
  .use '/api', routes.api<% } %>


mongoose.connect config.database.url, ->
  server.listen app.get('port'), ->
    console.log '> localhost:' + app.get('port') <% if (appType === 'both') { %>

    if app.get('env') is 'development' and process.env.open is 'true'
      open = require 'open'
      open "http://localhost:#{config.server.proxy}", 'google chrome'<% } %>

mongoose.connection.on 'error', ->
  console.log 'mongodb connection error'
