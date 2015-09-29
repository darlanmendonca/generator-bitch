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
var password;
var invalidPassword;
let emailsToDeleteAfter = [];

before(function(done){
  password = faker.internet.password();
  invalidPassword = password.replace(/^.{2}/, 'dd');
  User = new Users({
    email: faker.internet.email(),
    password: password
  });
  User
    .save()
    .then(function(user) {
      User = user;
      emailsToDeleteAfter.push(User.email);
      Token = jwt.sign(user, config.secret, config.token);
      done();
    });
});

describe('api/auth', function() {
  describe('400 (Not authorized) authentication failed', function() {
    it('POST /api/auth', function(done) {
      request(API)
        .post('/auth')
        .set('token', Token)
        .field('email', User.email)
        .field('password', invalidPassword)
        .end(function(err, res) {
          res.statusCode.should.equal(400);
          res.body.should.have.property('message', 'authentication failed');
          done();
        });
    });
  });
  describe('200 (Success) user id, token', function() {
    it('POST /auth', function(done) {
      request(API)
        .post('/auth')
        .set('token', Token)
        .field('email', User.email)
        .field('password', password)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          res.body.should.have.property('id', User._id.toString());
          res.body.should.have.property('token');
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

