'use strict';

let api = require('../controllers.js').api;
let middlewares = require('../middlewares.js');
let express = require('express');
let router = express.Router();

router.param('id', middlewares.id);

router
	.route('/auth')
	.post(api.auth.local);

router.use(middlewares.token);

router
	.route('/users')
	.get(api.users.list)
	.post(api.users.create);

router
	.route('/users/:id')
	.get(api.users.get)
	.put(api.users.update)
	.delete(api.users.delete);

router
	.use(function (req, res) {
		res.status(404).json({
			message: 'resource not found :('
		});
	});

module.exports = router;
