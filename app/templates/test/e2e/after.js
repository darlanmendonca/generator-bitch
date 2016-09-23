import Users from '../../server/users/users.model.js';

after(function(done) {
	Users
		.remove({test: true})
		.then(function() {
			done();
		});
});
