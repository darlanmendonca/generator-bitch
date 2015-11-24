/* globals after */
'use strict';

let Users = require('../../server/models').users;

after(function(done) {
	Users
		.remove({test: true})
		.then(function() {
			done();
		});
});
