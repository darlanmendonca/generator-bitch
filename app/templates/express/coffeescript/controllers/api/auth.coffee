AuthController = {}
Users = require('../../models').users
config = require '../../config'
jwt = require 'jsonwebtoken'
encode = require '../../helpers/encode.coffee'
publicFields = '-__v -password'

AuthController.local = (req, res)->
  Users
    .findOne {email: req.body.email, password: encode req.body.password}, publicFields
    .then (user)->
      unless user
        res.status(400).json
          message: 'authentication failed.'
        return

      res.json
        id: user._id
        token: jwt.sign user, config.secret, config.token

module.exports = AuthController
