express = require 'express'
controller = require('../controllers').api

router = express.Router()

router
  .route '/'
  .get controller.home

router
  .use (req, res)->
    res.status(404).json
      message: 'resource not found :('

module.exports = router
