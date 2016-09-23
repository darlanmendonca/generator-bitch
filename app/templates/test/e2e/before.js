import mongoose from 'mongoose';
import config from '../../config';
import Users from '../../server/users/users.model.js';
import helper from '../helper.js';
import jwt from 'jsonwebtoken';

before(function(done){
  mongoose.connect(config.database.url, () => done());
});

before(function(done) {
	var user = new Users(helper.user);
	user
    .save()
    .then(function(user) {
    	helper.user._id = user._id;
    	helper.user.token = jwt.sign(user, config.secret, config.token);
    	helper.user.invalidToken = helper.user.token.replace(/^.{2}/, 'dd');
    	helper.user.invalidPassword = helper.user.password.replace(/^.{2}/, 'dd');
      return done();
    });
});
