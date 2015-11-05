'use strict';

let request = require('supertest');
let expect = require('chai').expect;
let helper = require('../../helper.js');
let app = require('../../../server/app');

describe('Auth', function() {
	describe('.local - POST /api/auth', function() {
		it('authentication failed', function(done) {
      request(app)
        .post('/api/auth')
        .set('token', helper.user.token)
        .field('email', helper.user.email)
        .field('password', helper.user.invalidPassword)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'authentication failed');
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
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('id', helper.user._id.toString());
          expect(res.body).to.have.property('token');
          done();
        });
    });
	});
});

