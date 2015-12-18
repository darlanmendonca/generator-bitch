/* globals describe, it */
'use strict';

let helper = require('../../test/helper.js');
let app = require('../app.js');

let chai = require('chai');
chai.use(require('chai-http'));
let request = chai.request;
let expect = chai.expect;

describe('API', function() {
	describe('not found - GET /api/chiforimfola', function() {
		it('no token provided', function(done) {
			request(app)
				.get('/api/chiforimfola')
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'no token provided');
					done();
				});
		});

		it('invalid token', function(done) {
			request(app)
				.get('/api/chiforimfola')
				.set('token', helper.user.invalidToken)
				.then(function(res) {
					expect(res.statusCode).to.be.equal(401);
					expect(res.body).to.have.property('message', 'invalid token');
					done();
				});
		});

		it('404 not found', function(done) {
			request(app)
				.get('/api/chiforimfola')
				.set('token', helper.user.token)
				.then(function(res) {
					expect(res.statusCode).to.equal(404);
					expect(res.body).to.have.property('message', 'resource not found :(');
					done();
				});
		});
	});
});

