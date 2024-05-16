const { faker } = require("@faker-js/faker");

faker.seed(123);

const pseudoRandomData = {
	fullname: faker.person.fullName(),
	email: faker.internet.email(),
	address: faker.location.streetAddress(),
	firstname: faker.person.firstName(),
	lastname: faker.person.lastName(),
	password: faker.internet.password(),
};

module.exports = pseudoRandomData;
