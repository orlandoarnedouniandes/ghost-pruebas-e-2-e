const { Faker, en } = require("@faker-js/faker");

// Create a new Faker instance in order to access random data 
//everytime is called
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
	siteTitle: faker.commerce.productName(),
	city: faker.location.city(),
	website: faker.internet.url(),
	paragraph: faker.lorem.paragraph(),
});

module.exports = generateRandomData;
