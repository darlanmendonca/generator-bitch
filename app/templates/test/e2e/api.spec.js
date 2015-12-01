/* globals describe, it */
'use strict';

let request = require('supertest');
let expect = require('chai').expect;
let helper = require('../helper.js');
let app = require('../../server/app');

describe('API', function() {
	describe('not found - GET /api/chiforimfola', function() {
		it('no token provided', function(done) {
      request(app)
        .get('/api/chiforimfola')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message', 'no token provided');
          done();
        });
    });

    it('invalid token', function(done) {
      request(app)
        .get('/api/chiforimfola')
        .set('token', helper.user.invalidToken)
        .expect(401, {message: 'invalid token'}, done);
    });

    it('404 not found', function(done) {
      request(app)
        .get('/api/chiforimfola')
        .set('token', helper.user.token)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('message', 'resource not found :(');
          done();
        });
    });
	});
});

