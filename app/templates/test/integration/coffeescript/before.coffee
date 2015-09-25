mongoose = require('mongoose')
config = require('../../config')
before (done) ->
  mongoose.connect config.database.url, ->
    done()
    return
  return
