import faker from 'faker';
import config from '../config';

module.exports = {
	API: `http://localhost:${config.server.port}/api`,

	user: {
		test: true,
		firstname: faker.name.firstName(),
		lastname: faker.name.lastName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		birthdate: faker.date.past(),
		gender: 'male'
	}
};
