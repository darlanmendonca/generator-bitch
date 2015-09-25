request = require('supertest')
should = require('should')

faker = require 'faker'
config = require '../../../config'
jwt = require 'jsonwebtoken'
Users = require('../../../models').users
API = require('util').format 'http://localhost:%s/api', config.server.port
User = undefined
Token = undefined
password = undefined
invalidPassword = undefined
emailsToDeleteAfter = []

before (done) ->
  password = faker.internet.password()
  invalidPassword = password.replace(/^.{2}/, 'dd')
  User = new Users(
    email: faker.internet.email()
    password: password)

  User
    .save()
    .then (user) ->
      User = user
      emailsToDeleteAfter.push User.email
      Token = jwt.sign(user, config.secret, config.token)
      done()

describe 'api/auth', ->
  describe '400 (Not authorized) authentication failed', ->
    it 'POST /api/auth', (done) ->
      request(API)
        .post('/auth')
        .set('token', Token)
        .field('email', User.email)
        .field('password', invalidPassword).end (err, res) ->
          res.statusCode.should.equal 400
          res.body.should.have.property 'message', 'authentication failed'
          done()

  describe '200 (Success) user id, token', ->
    it 'POST /auth', (done) ->
      request(API)
        .post('/auth')
        .set('token', Token)
        .field('email', User.email)
        .field('password', password).end (err, res) ->
          res.statusCode.should.equal 200
          res.body.should.have.property 'id', User._id.toString()
          res.body.should.have.property 'token'
          done()

after (done) ->
  Users
    .remove(email: $in: emailsToDeleteAfter)
    .then ->
      done()
