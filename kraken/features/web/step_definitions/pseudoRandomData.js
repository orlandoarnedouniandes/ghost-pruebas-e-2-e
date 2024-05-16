const faker = require("faker");

faker.seed(123);

const pseudoRandomData = {
	fullname: faker.name.findName(),
	email: faker.internet.email(),
	address: faker.address.streetAddress(),
	firstname: faker.firstname.findName(),
	lastname: faker.lastname.findName(),
};

module.exports = pseudoRandomData;
