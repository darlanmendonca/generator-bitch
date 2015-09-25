UsersController = {}
Users = require('../../models').users
ObjectId = require('mongoose').Types.ObjectId;
publicFields = '-__v -password'

UsersController.list = (req, res)->
  Users
    .find({}, publicFields)
    .then (users)-> res.json(users)

UsersController.get = (req, res)->
  Users
    .findOne({_id: new ObjectId(req.params.id)}, publicFields)
    .then (user)-> res.json(user)

UsersController.create = (req, res)->
  User = new Users(req.body)
  User
    .save()
    .then (user)->
      res.status(201).json
        id: user._id
    , (err)->
      res.json(err)

module.exports = UsersController
