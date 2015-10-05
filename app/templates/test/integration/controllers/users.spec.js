'use strict';

let request = require('supertest');
let should = require('should'); /* jshint ignore:line */
let helper = require('../../helper.js');
let faker = require('faker');

describe('api/users', function() {
  describe('401 (Unauthorized) no token provided', function() {
    let expectMessage = 'no token provided';
    it('GET /api/users', function(done) {
      request(helper.API)
        .get('/users')
        .end(function(err, res) {
          res.statusCode.should.equal(401);
          res.body.should.have.property('message', expectMessage);
          done();
        });
    });
    it('GET /api/users/:id', function(done) {
      request(helper.API)
        .get('/users/'+helper.user._id)
        .end(function(err, res) {
          res.statusCode.should.equal(401);
          res.body.should.have.property('message', expectMessage);
          done();
        });
    });
    it('POST /api/users', function(done) {
      request(helper.API)
        .post('/users')
        .end(function(err, res) {
          res.statusCode.should.equal(401);
          res.body.should.have.property('message', expectMessage);
          done();
        });
    });
  });

  describe('401 (Unauthorized) invalid token', function() {
    let expectMessage = 'invalid token';
    it('GET /api/users', function(done) {
      request(helper.API)
        .get('/users')
        .set('token', helper.user.invalidToken)
        .expect(401, {message: expectMessage}, done);
    });
    it('GET /api/users/:id', function(done) {
      request(helper.API)
        .get('/users/'+helper.user._id+'?token='+helper.user.invalidToken)
        .expect(401, {message: expectMessage}, done);
    });
    it('POST /api/users', function(done) {
      request(helper.API)
        .post('/users')
        .field('token', helper.user.invalidToken)
        .expect(401, {message: expectMessage}, done);
    });
  });

  describe('201 (Created) user id', function() {
    it('POST /api/users', function(done) {
      request(helper.API)
        .post('/users')
        .set('token', helper.user.token)
        .field('test', 'true')
        .field('email', faker.internet.email())
        .field('password', faker.internet.password())
        .end(function(err, res) {
          res.statusCode.should.equal(201);
          res.body.should.have.property('id');
          done();
        });
    });
  });

  describe('200 (Success) users array', function() {
    it('GET /api/users', function(done) {
      request(helper.API)
        .get('/users')
        .set('token', helper.user.token)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
  });

  describe('200 (Success) user data', function() {
    it('GET /api/user/:id', function(done) {
      request(helper.API)
        .get('/users/'+helper.user._id.toString())
        .set('token', helper.user.token)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          res.body.should.have.property('_id', helper.user._id.toString());
          res.body.should.have.property('email', helper.user.email);
          res.body.should.have.property('createdAt');
          res.body.should.not.have.property('password');
          res.body.should.not.have.property('__v');
          done();
        });
    });
  });

  describe('200 (Success) user not found', function() {
    it('GET /api/user/:id', function(done) {
      request(helper.API)
        .get('/users/'+helper.user._id.toString().replace(/^.{2}/, 'dd'))
        .set('token', helper.user.token)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          should.equal(res.body, null);
          done();
        });
    });
  });
});

