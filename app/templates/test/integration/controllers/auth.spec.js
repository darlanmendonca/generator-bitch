'use strict';

let request = require('supertest');
let should = require('should'); /* jshint ignore:line */
let helper = require('../../helper.js');

describe('api/auth', function() {
  describe('401 (Not authorized) authentication failed', function() {
    it('POST /api/auth', function(done) {
      request(helper.API)
        .post('/auth')
        .set('token', helper.user.token)
        .field('email', helper.user.email)
        .field('password', helper.user.invalidPassword)
        .end(function(err, res) {
          res.statusCode.should.equal(401);
          res.body.should.have.property('message', 'authentication failed');
          done();
        });
    });
  });
  describe('200 (Success) user id, token', function() {
    it('POST /auth', function(done) {
      request(helper.API)
        .post('/auth')
        .set('token', helper.user.token)
        .field('email', helper.user.email)
        .field('password', helper.user.password)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          res.body.should.have.property('id', helper.user._id.toString());
          res.body.should.have.property('token');
          done();
        });
    });
  });
});

