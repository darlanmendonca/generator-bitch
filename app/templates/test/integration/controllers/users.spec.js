'use strict';

let request = require('supertest');
let should = require('should'); /* jshint ignore:line */
let helper = require('../../helper.js');
let faker = require('faker');
let app = require('../../../app');

describe('Users', function() {
	describe('.list - GET /api/users', function() {
		it('no token provided', function(done) {
      request(app)
        .get('/api/users')
        .end(function(err, res) {
          res.statusCode.should.equal(401);
          res.body.should.have.property('message', 'no token provided');
          done();
        });
    });

    it('invalid token', function(done) {
      request(app)
        .get('/api/users')
        .set('token', helper.user.invalidToken)
        .expect(401, {message: 'invalid token'}, done);
    });

    it('list', function(done) {
      request(app)
        .get('/api/users')
        .set('token', helper.user.token)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
	});

	describe('.create - POST /api/users', function() {
		it('no token provided', function(done) {
      request(app)
        .post('/api/users')
        .end(function(err, res) {
          res.statusCode.should.equal(401);
          res.body.should.have.property('message', 'no token provided');
          done();
        });
    });

    it('invalid token', function(done) {
      request(app)
        .post('/api/users')
        .field('token', helper.user.invalidToken)
        .expect(401, {message: 'invalid token'}, done);
    });

    it('create', function(done) {
      request(app)
        .post('/api//users')
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

	describe('.get - GET /api/users/:id', function() {
		it('no token provided', function(done) {
      request(app)
        .get('/api/users/'+helper.user._id)
        .end(function(err, res) {
          res.statusCode.should.equal(401);
          res.body.should.have.property('message', 'no token provided');
          done();
        });
    });

    it('invalid token', function(done) {
      request(app)
        .get('/api/users/'+helper.user._id+'?token='+helper.user.invalidToken)
        .expect(401, {message: 'invalid token'}, done);
    });

    it('not found', function(done) {
      request(app)
        .get('/api/users/'+helper.user._id.toString().replace(/^.{2}/, 'dd'))
        .set('token', helper.user.token)
        .end(function(err, res) {
          res.statusCode.should.equal(200);
          should.equal(res.body, null);
          done();
        });
    });

    it('get user', function(done) {
      request(app)
        .get('/api/users/'+helper.user._id.toString())
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
});

