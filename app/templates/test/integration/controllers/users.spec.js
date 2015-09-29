'use strict';

let request = require('supertest');
let should = require('should'); /* jshint ignore:line */
let faker = require('faker');
let config = require('../../../config');
let jwt = require('jsonwebtoken');

let Users = require('../../../models').users;
let API = require('util').format('http://localhost:%s/api', config.server.port);
var User;
var Token;
var invalidToken;
let emailsToDeleteAfter = [];

before(function(done){
  User = new Users({
    email: faker.internet.email(),
    password: faker.internet.password()
  });
  User
    .save()
    .then(function(user) {
      User = user;
      emailsToDeleteAfter.push(User.email);
      Token = jwt.sign(user, config.secret, config.token);
      invalidToken = Token.replace(/^.{2}/, 'dd');
      done();
    });
});

describe('api/users', function() {
  describe('403 (Forbidden) no token provided', function() {
    let expectMessage = 'no token provided';
    it('GET /api/users', function(done) {
      request(API)
        .get('/users')
        .end(function(err, res) {
          res.statusCode.should.equal(403);
          res.body.should.have.property('message', expectMessage);
          done();
        });
    });
    it('GET /api/users/:id', function(done) {
      request(API)
        .get('/users/'+User._id)
        .end(function(err, res) {
          res.statusCode.should.equal(403);
          res.body.should.have.property('message', expectMessage);
          done();
        });
    });
    it('POST /api/users', function(done) {
      request(API)
        .post('/users')
        .end(function(err, res) {
          res.statusCode.should.equal(403);
          res.body.should.have.property('message', expectMessage);
          done();
        });
    });
  });

  describe('403 (Forbidden) invalid token', function() {
    let expectMessage = 'invalid token';
    it('GET /api/users', function(done) {
      request(API)
        .get('/users')
        .set('token', invalidToken)
        .expect(403, {message: expectMessage}, done);
    });
    it('GET /api/users/:id', function(done) {
      request(API)
        .get('/users/'+User._id+'?token='+invalidToken)
        .expect(403, {message: expectMessage}, done);
    });
    it('POST /api/users', function(done) {
      request(API)
        .post('/users')
        .field('token', invalidToken)
        .expect(403, {message: expectMessage}, done);
    });
  });

  describe('201 (Created) user id', function() {
    it('POST /api/users', function(done) {
      let email = faker.internet.email();
      request(API)
        .post('/users')
        .set('token', Token)
        .field('email', email)
        .field('password', faker.internet.password())
        .end(function(err, res) {
          res.statusCode.should.equal(201);
          res.body.should.have.property('id');
          if (res.statusCode === 201) {
            emailsToDeleteAfter.push(email);
          }
          done();
        });
    });
  });

  describe('200 (Success) users array', function() {
    it('GET /api/users', function(done) {
      request(API)
        .get('/users')
        .set('token', Token)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
  });

  describe('200 (Success) user data', function() {
    it('GET /api/user/:id', function(done) {
      request(API)
        .get('/users/'+User._id.toString())
        .set('token', Token)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          res.body.should.have.property('_id', User._id.toString());
          res.body.should.have.property('email', User.email);
          res.body.should.have.property('createdAt');
          res.body.should.not.have.property('password');
          res.body.should.not.have.property('__v');
          done();
        });
    });
  });

  describe('200 (Success) user not found', function() {
    it('GET /api/user/:id', function(done) {
      request(API)
        .get('/users/'+User._id.toString().replace(/^.{2}/, 'dd'))
        .set('token', Token)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          should.equal(res.body, null);
          done();
        });
    });
  });
});

after(function(done) {
  Users
    .remove({email: {$in: emailsToDeleteAfter}})
    .then(function() {
      done();
    });
});

