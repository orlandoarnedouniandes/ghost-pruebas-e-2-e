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


//E17
Given("I navigate to the Ghost login page", async function () {
	await this.driver.url("https://ghost-jpjk.onrender.com/ghost/#/signin/");
});

When("I click on the {string} tab", async function (tabName) {
	let tab = await this.driver.$(`a[href="#/${tabName.toLowerCase()}/"]`);
	await tab.click();
});

When("I navigate to the {string} settings page", async function (pageName) {
	let link = await this.driver.$(
		`a[href="#/settings/${pageName.toLowerCase()}/"]`
	);
	await link.click();
});

When("I click the Expand button", async function () {
    let button = await this.driver.$(
			"body > div.gh-app > div > main > section > div:nth-child(2) > div:nth-child(1) > section > div:nth-child(1) > div.gh-expandable-header > button"
		);
	await button.click();
});

When("I update the site title to {string}", async function (newTitle) {
	let titleInput = await this.driver.$(
		"input.ember-text-field.gh-input[type='text']"
	);
	const timestamp = Date.now();
	const encodedTimestamp = encodeURIComponent(timestamp);
	this.updatedSiteTitle = `${"Updated Title"}_${encodedTimestamp}`;

	await titleInput.setValue(this.updatedSiteTitle);
});

When("I click the primary Save button", async function () {
	let saveButton = await this.driver.$(
		"button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view"
	);
	await saveButton.click();
});

When("I navigate to the {string} page", async function (pageName) {
	let link = await this.driver.$(`a[href="#/${pageName.toLowerCase()}/"]`);
	await link.click();
});

Then("The site title in the header should be Updated", async function () {
	let siteTitleH1 = await this.driver.$(
		".site-header-content.outer .site-title"
	);
	let titleText = await siteTitleH1.getText();
	expect(titleText).to.equal("Updated Title");
});

When("I refresh the page", async function () {
	await this.driver.refresh();
});

Then("The input field should equal 'Updated Title'", async function () {
	let inputField = await this.driver.$(
		"input.ember-text-field.gh-input[type='text']"
	);
	let inputValue = await inputField.getValue();
	if (inputValue !== this.updatedSiteTitle) {
		throw new Error(
			`Expected input to be 'Updated Title' but found '${inputValue}'`
		);
	}
});