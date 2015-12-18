/* globals describe, it */
'use strict';

let helper = require('../../test/helper.js');
let app = require('../app.js');
let faker = require('faker');

let chai = require('chai');
chai.use(require('chai-http'));
let request = chai.request;
let expect = chai.expect;

describe('Users', function() {
	describe('.list - GET /api/users', function() {
		it('no token provided', function(done) {
			request(app)
				.get('/api/users')
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'no token provided');
					done();
				});
		});

		it('invalid token', function(done) {
			request(app)
				.get('/api/users')
				.set('token', helper.user.invalidToken)
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'invalid token');
					done();
				});
		});

		it('list users', function(done) {
			request(app)
				.get('/api/users')
				.set('token', helper.user.token)
				.then(function(res) {
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.be.instanceOf(Array);
					done();
				});
		});
	});

	describe('.create - POST /api/users', function() {
		it('no token provided', function(done) {
			request(app)
				.post('/api/users')
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'no token provided');
					done();
				});
		});

		it('invalid token', function(done) {
			request(app)
				.post('/api/users')
				.field('token', helper.user.invalidToken)
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'invalid token');
					done();
				});
		});

		it('invalid fields', function(done) {
			request(app)
				.post('/api/users')
				.set('token', helper.user.token)
				.field('test', 'true')
				.then(function(res) {
					expect(res.statusCode).to.equal(400);
					expect(res.body).to.have.property('password');
					expect(res.body).to.have.property('email');
					done();
				});
		});

		it('create an user', function(done) {
			request(app)
				.post('/api/users')
				.set('token', helper.user.token)
				.field('test', 'true')
				.field('email', faker.internet.email())
				.field('password', faker.internet.password())
				.then(function(res) {
					expect(res.statusCode).to.equal(201);
					expect(res.body).to.have.property('id');
					done();
				});
		});
	});

	describe('.get - GET /api/users/:id', function() {
		it('no token provided', function(done) {
			request(app)
				.get('/api/users/'+helper.user._id)
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'no token provided');
					done();
				});
		});

		it('invalid token', function(done) {
			request(app)
				.get('/api/users/'+helper.user._id+'?token='+helper.user.invalidToken)
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'invalid token');
					done();
				});
		});

		it('not found', function(done) {
			request(app)
				.get('/api/users/'+helper.user._id.toString().replace(/^.{2}/, 'dd'))
				.set('token', helper.user.token)
				.then(function(res) {
					expect(res.statusCode).to.equal(204);
					expect(res.body).to.deep.equal({});
					done();
				});
		});

		it('invalid id', function(done) {
			request(app)
				.get('/api/users/:id'.replace(':id', '123'))
				.set('token', helper.user.token)
				.then(function(res) {
					expect(res.statusCode).to.equal(400);
					expect(res.body).to.have.property('message', 'invalid id');
					done();
				});
		});

		it('get an user', function(done) {
			request(app)
				.get('/api/users/'+helper.user._id.toString())
				.set('token', helper.user.token)
				.then(function(res) {
					expect(res.statusCode).to.equal(200);
					expect(res.body).to.have.property('_id', helper.user._id.toString());
					expect(res.body).to.have.property('email', helper.user.email);
					expect(res.body).to.have.property('createdAt');
					expect(res.body).to.not.have.property('password');
					expect(res.body).to.not.have.property('__v');
					done();
				});
		});
	});

	describe('.update - PUT /api/users/:id', function() {
		it('no token provided', function(done) {
			request(app)
				.put('/api/users/'+helper.user._id)
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'no token provided');
					done();
				});
		});

		it('invalid token', function(done) {
			request(app)
				.put('/api/users/'+helper.user._id)
				.field('token', helper.user.invalidToken)
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'invalid token');
					done();
				});
		});

		it('update an user', function(done) {
			request(app)
				.put('/api/users/'+helper.user._id)
				.set('token', helper.user.token)
				.field('email', 'darlanmendonca@gmail.com')
				.then(function(res) {
					expect(res.statusCode).to.equal(204);
					expect(res.body).to.be.empty;
					done();
				});
		});
	});

	describe('.delete - DELETE /api/users/:id', function() {
		it('no token provided', function(done) {
			request(app)
				.delete('/api/users/'+helper.user._id)
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'no token provided');
					done();
				});
		});

		it('invalid token', function(done) {
			request(app)
				.delete('/api/users/'+helper.user._id)
				.field('token', helper.user.invalidToken)
				.then(function(res) {
					expect(res.statusCode).to.equal(401);
					expect(res.body).to.have.property('message', 'invalid token');
					done();
				});
		});

		it('delete an user', function(done) {
			request(app)
				.delete('/api/users/'+helper.user._id)
				.set('token', helper.user.token)
				.then(function(res) {
					expect(res.statusCode).to.equal(204);
					expect(res.body).to.be.empty;
					done();
				});
		});
	});
});
