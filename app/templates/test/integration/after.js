'use strict';

let Users = require('../../models').users;

after(function(done) {
	Users
		.remove({test: true})
		.then(function() {
			done();
		});
});
