/* globals describe, it */
'use strict';

let request = require('supertest');
let expect = require('chai').expect;
let app = require('../app.js');

describe('Pages', function() {
	describe('.home - GET /', function() {
		it('view page', function(done) {
			request(app)
				.get('/')
				.end(function(err, res) {
					expect(res.statusCode).to.equal(200);
					expect(res.header).to.have.property('content-type', 'text/html; charset=utf-8');
					done();
				});
		});

		it('serve home always', function(done) {
			request(app)
				.get('/lero')
				.end(function(err, res) {
					expect(res.statusCode).to.equal(200);
					expect(res.header).to.have.property('content-type', 'text/html; charset=utf-8');
					done();
				});
		});
	});
});
