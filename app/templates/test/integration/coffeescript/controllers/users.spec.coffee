'use strict'
request = require('supertest')
should = require('should')

### jshint ignore:line ###

faker = require('faker')
config = require('../../../config')
jwt = require('jsonwebtoken')
Users = require('../../../models').users
API = require('util').format('http://localhost:%s/api', config.server.port)
User = undefined
Token = undefined
invalidToken = undefined
emailsToDeleteAfter = []

before (done) ->
  User = new Users(
    email: faker.internet.email()
    password: faker.internet.password())

  User.save().then (user) ->
    User = user
    emailsToDeleteAfter.push User.email
    Token = jwt.sign(user, config.secret, config.token)
    invalidToken = Token.replace(/^.{2}/, 'dd')
    done()

describe 'api/users', ->
  describe '403 (Forbidden) no token provided', ->
    expectMessage = 'no token provided'
    it 'GET /api/users', (done) ->
      request(API)
        .get('/users')
        .end (err, res) ->
          res.statusCode.should.equal 403
          res.body.should.have.property 'message', expectMessage
          done()

    it 'GET /api/users/:id', (done) ->
      request(API)
        .get('/users/' + User._id)
        .end (err, res) ->
          res.statusCode.should.equal 403
          res.body.should.have.property 'message', expectMessage
          done()

    it 'POST /api/users', (done) ->
      request(API)
        .post('/users')
        .end (err, res) ->
          res.statusCode.should.equal 403
          res.body.should.have.property 'message', expectMessage
          done()

  describe '403 (Forbidden) invalid token', ->
    expectMessage = 'invalid token'
    it 'GET /api/users', (done) ->
      request(API)
        .get('/users')
        .set('token', invalidToken)
        .expect 403, { message: expectMessage }, done

    it 'GET /api/users/:id', (done) ->
      request(API)
        .get('/users/' + User._id + '?token=' + invalidToken)
        .expect 403, { message: expectMessage }, done

    it 'POST /api/users', (done) ->
      request(API)
        .post('/users')
        .field('token', invalidToken)
        .expect 403, { message: expectMessage }, done

  describe '201 (Created) user id', ->
    it 'POST /api/users', (done) ->
      email = faker.internet.email()
      request(API)
        .post('/users')
        .set('token', Token)
        .field('email', email)
        .field('password', faker.internet.password())
        .end (err, res) ->
          res.statusCode.should.equal 201
          res.body.should.have.property 'id'
          if res.statusCode == 201
            emailsToDeleteAfter.push email
          done()

  describe '200 (Success) users array', ->
    it 'GET /api/users', (done) ->
      request(API)
        .get('/users')
        .set('token', Token)
        .end (err, res) ->
          res.statusCode.should.equal 200
          res.body.should.be.instanceOf Array
          done()

  describe '200 (Success) user data', ->
    it 'GET /api/user/:id', (done) ->
      request(API)
        .get('/users/' + User._id.toString())
        .set('token', Token)
        .end (err, res) ->
          res.statusCode.should.equal 200
          res.body.should.have.property '_id', User._id.toString()
          res.body.should.have.property 'email', User.email
          res.body.should.have.property 'createdAt'
          res.body.should.not.have.property 'password'
          res.body.should.not.have.property '__v'
          done()

  describe '200 (Success) user not found', ->
    it 'GET /api/user/:id', (done) ->
      request(API)
        .get('/users/' + User._id.toString().replace(/^.{2}/, 'dd'))
        .set('token', Token)
        .end (err, res) ->
          res.statusCode.should.equal 200
          should.equal res.body, null
          done()

after (done) ->
  Users.remove(email: $in: emailsToDeleteAfter).then ->
    done()
