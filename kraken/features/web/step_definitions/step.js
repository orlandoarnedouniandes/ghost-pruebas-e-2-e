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

When(
	"I modify the user name to {string} and save changes",
	async function (newName) {
		let nameField = await this.driver.$("input[name='user']");
		await nameField.setValue(newName);

		let saveButton = await this.driver.$("button.gh-btn-primary");
		await saveButton.click();
	}
);

Then(
	"I should see the updated name {string} in the profile",
	async function (expectedName) {
		let profileName = await this.driver.$("h2.post-card-title");
		let displayedName = await profileName.getText();
		if (displayedName !== expectedName) {
			throw new Error(
				`Expected name to be ${expectedName} but found ${displayedName}`
			);
		}
	}
);

When("I wait {int} seconds", function (seconds) {
	return new Promise((resolve) => {
		setTimeout(resolve, seconds * 1000); // Convert seconds to milliseconds
	});
});