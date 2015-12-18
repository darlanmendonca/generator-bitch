/* globals describe, it */
'use strict';

let helper = require('../../test/helper.js');
let app = require('../app.js');

let chai = require('chai');
chai.use(require('chai-http'));
let request = chai.request;
let expect = chai.expect;

describe('Auth', function() {
	describe('.local - POST /api/auth', function() {
		it('authentication failed', function(done) {
			request(app)
				.post('/api/auth')
				.set('token', helper.user.token)
				.field('email', helper.user.email)
				.field('password', helper.user.invalidPassword)
				.then(function(res) {
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
				.then(function(res) {
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.have.property('id', helper.user._id.toString());
					expect(res.body).to.have.property('token');
					done();
				});
		});
	});
});
