express = require 'express'
api = require('../controllers').api
jwt = require 'jsonwebtoken'
config = require '../config'

router = express.Router()

router.param 'id', (req, res, next, value)->
  reg = /^[0-9a-fA-F]{24}$/
  unless reg.test value
    res.status(400).json
      message: 'invalid id'
    return
  next()

router
  .route '/auth'
  .post api.auth.local

router.use (req, res, next) ->
  token = req.body.token or req.query.token or req.headers.token
  if !token
    return res.status(403).json(message: 'no token provided')
  jwt.verify token, config.secret, (err, decoded) ->
    if err
      return res.status(403).json(message: 'invalid token')
    req.decoded = decoded
    next()
    return
  return

router
  .route '/users'
  .get api.users.list
  .post api.users.create

router
  .route '/users/:id'
  .get api.users.get

router
  .use (req, res)->
    res.status(404).json
      message: 'resource not found :('

module.exports = router
