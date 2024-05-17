const { Faker, en } = require("@faker-js/faker");

// Create a new Faker instance
const faker = new Faker({
	locales: { en },
	locale: "en",
});

const generateRandomData = () => ({
	fullname: faker.person.fullName(),
	email: faker.internet.email(),
	address: faker.location.streetAddress(),
	firstname: faker.person.firstName(),
	lastname: faker.person.lastName(),
	password: faker.internet.password(),
});

module.exports = generateRandomData;
