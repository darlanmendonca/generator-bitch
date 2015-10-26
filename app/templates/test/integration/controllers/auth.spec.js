'use strict';

let request = require('supertest');
let should = require('should'); /* jshint ignore:line */
let helper = require('../../helper.js');
let app = require('../../../app');

describe('Auth', function() {
	describe('.local - POST /api/auth', function() {
		it('authentication failed', function(done) {
      request(app)
        .post('/api/auth')
        .set('token', helper.user.token)
        .field('email', helper.user.email)
        .field('password', helper.user.invalidPassword)
        .end(function(err, res) {
          res.statusCode.should.equal(401);
          res.body.should.have.property('message', 'authentication failed');
          done();
        });
    });

    it('authentication success', function(done) {
      request(app)
        .post('/api/auth')
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

