const { Given, When, Then } = require("@cucumber/cucumber");

When(
	"I log in with email {kraken-string} and password {kraken-string}",
	async function (email, password) {
		let emailElement = await this.driver.$("#ember6");
		await emailElement.setValue(email);

		let passwordElement = await this.driver.$("#ember8");
		await passwordElement.setValue(password);

		let nextButton = await this.driver.$("#ember10");
		await nextButton.click();
	}
);

Given("I set the new user name to {string}", function (username) {
	// this.newUsername = username;
	const timestamp = Date.now();
	// Encode the timestamp to make it URL safe
	const encodedTimestamp = encodeURIComponent(timestamp);
	this.newUsername = `${username}_${encodedTimestamp}`;
});

Given("I set the new full name to {string}", function (fullName) {
	// this.newUsername = username;
	const timestamp = Date.now();
	// Encode the timestamp to make it URL safe
	const encodedTimestamp = encodeURIComponent(timestamp);
	this.newFullName = `${fullName}_${encodedTimestamp}`;
	this.currentFullName = this.newFullName;
});

When("I Click on user dropdown", async function () {
	let userDropdown = await this.driver.$(`div.gh-user-avatar`);
	await userDropdown.click();
});

When("I click on the 'Your profile' link", async function () {
	let profileLink = await this.driver.$(
		"//a[contains(text(), 'Your profile')]"
	);
	await profileLink.click();
});

When("I modify the user name and save changes", async function () {
	let nameField = await this.driver.$("input[name='user']");
	await nameField.setValue(this.newUsername);

	let saveButton = await this.driver.$("button.gh-btn-primary");
	await saveButton.click();
});

When("I modify current full name and save changes", async function () {
	let nameField = await this.driver.$("#user-name");
	await nameField.setValue(this.newFullName);

	let saveButton = await this.driver.$("button.gh-btn-primary");
	await saveButton.click();
});

Then("I should see the expected name", async function () {
	let profileName = await this.driver.$("h2.post-card-title");
	let displayedName = await profileName.getText();
	if (displayedName !== this.currentFullName) {
		throw new Error(
			`Expected name to be ${this.currentFullName} but found ${displayedName}`
		);
	}
});

Then("I should see the expected full name", async function () {
	let profileName = await this.driver.$("h2.post-card-title");
	let displayedName = await profileName.getText();
	if (displayedName !== this.currentFullName) {
		throw new Error(
			`Expected name to be ${this.currentFullName} but found ${displayedName}`
		);
	}
});

When("I navigate to new user profile page", async function () {
	await this.driver.url(
		`https://ghost-jpjk.onrender.com/author/${this.newUsername}/`
	);
});

When("I wait {int} seconds", function (seconds) {
	return new Promise((resolve) => {
		setTimeout(resolve, seconds * 1000);
	});
});

When("I get current full name", async function () {
	let fullNameElement = await this.driver.$(
		"input.user-name.ember-text-field.gh-input.ember-view"
	);
	this.currentFullName = await fullNameElement.getValue();
});

When("I get current slug name", async function () {
	let fullNameElement = await this.driver.$("input[name='user']");
	this.newUsername = await fullNameElement.getValue();
});