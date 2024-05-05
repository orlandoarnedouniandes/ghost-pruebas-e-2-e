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

Then("I should see the updated name", async function () {
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


/**Page*/
Given("I click on the 'Page' link", async function () {
	let tagLink = await this.driver.$('a[href="#/poages/"]');
	await tagLink.click();
});

/**Tags**/
Given("I click on the 'Tags' link", async function () {
	let tagLink = await this.driver.$("//a[contains(text(), 'Tags')]");
	await tagLink.click();
});

Given("I click on the 'New Tag' link", async function () {
	let newTagLink = await this.driver.$("//span[contains(text(), 'New tag')]");
	await newTagLink.click();
});

When("I type the basic information for New Tag 'Test Tag' and create Tag", async function () {
	let tagNameElement = await this.driver.$("#tag-name");
	await tagNameElement.setValue("Test Tag");

	let accentColorElement = await this.driver.$("div.input-color input.gh-input");
	await accentColorElement.setValue("d62e2e");

	let tagSlugElement = await this.driver.$("#tag-slug");
	await tagSlugElement.setValue("testslug");

	let tagDescriptionElement = await this.driver.$("#tag-description");
	await tagDescriptionElement.setValue("Description");

	let saveButton = await this.driver.$("//span[contains(text(), 'Save')]");
	await saveButton.click();
});

Then("I validate the New Tag created 'Test Tag'", async function () {
	let tagLink = await this.driver.$("//a[contains(text(), 'Tags')]");
	await tagLink.click();

	let tags = await this.driver.$$("ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name");	
	let flag = false;

	for (let i = 0; i < tags.length; i++) {
		let tag = tags[i];
		let tagText = await tag.getText();
		if (tagText.includes("Test Tag")) {
			flag=true;
			break;
		} 
	}
    
	if (flag === false) {
		throw new Error(
			`Expected Tag to be 'Test Tag' but found ${actualText}`
		);
	}
});

When("I click on the first Tag list and I modify the title", async function () {	
	let tags = await this.driver.$$("ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name");
	if(tags.length>0){
		await tags[0].click();	

		let tagNameElement = await this.driver.$("#tag-name");
		await tagNameElement.setValue("Test Tag Modified");

		let saveButton = await this.driver.$("//span[contains(text(), 'Save')]");
		await saveButton.click();
	}
});

Then("I validate the Tag modified 'Test Tag Modified'", async function () {
	let tagLink = await this.driver.$("//a[contains(text(), 'Tags')]");
	await tagLink.click();

	let tags = await this.driver.$$("ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name");	
	let flag = false;

	for (let i = 0; i < tags.length; i++) {
		let tag = tags[i];
		let tagText = await tag.getText();
		if (tagText.includes("Test Tag Modified")) {
			flag=true;
			break;
		} 
	}
    
	if (flag === false) {
		throw new Error(
			`Expected Tag to be 'Test Tag' but found ${actualText}`
		);
	}
});

let textSlugTag = "";

When("I click on the last Tag and I delete the tag", async function () {	
	let tags = await this.driver.$$("ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name");
	if(tags.length>0){
		await tags[tags.length-1].click();	

		textSlugTag = await this.driver.$$("ol li.gh-list-row.gh-tags-list-item a span")[tags.length-1];

		let deleteTagButton = await this.driver.$("//span[contains(text(), 'Delete tag')]");
		await deleteTagButton.click();

		let deleteButton = await this.driver.$("//span[contains(text(), 'Delete')]");
		await deleteButton.click();
	}
});

Then("I validate that the tag 'Test Tag Modified' not exist", async function () {
	let tagLink = await this.driver.$("//a[contains(text(), 'Tags')]");
	await tagLink.click();

	let tags = await this.driver.$$("ol li.gh-list-row.gh-tags-list-item a span");
	let flag = false;

	for (let i = 0; i < tags.length; i++) {
		let tag = tags[i];
		let tagText = await tag.getText();
		if (tagText.includes(textSlugTag)) {
			flag=true;
			break;
		} 
	}
    
	if (flag === true) {
		throw new Error(
			`Expected Tag exist`
		);
	}
});

/**General*/
Given("I click on the 'Settings' link", async function () {
	let settingsLink = await this.driver.$("path.settings_svg__a");
	await settingsLink.click();
});

Given("I click on the 'General Settings' link", async function () {
	let settingsLink = await this.driver.$('a[href="#/settings/general/"]');
	await settingsLink.click();
});

When("I modify the description", async function () {	
	let expandLink = await this.driver.$$('div.gh-expandable-header button.gh-btn')[0];
	await expandLink.click();

	let descriptionElement = await this.driver.$('div.description-container input.ember-text-field');
	await descriptionElement.setValue("Tests Ghost Uniandes");

	let saveButton = await this.driver.$("//span[contains(text(), 'Save')]");
	await saveButton.click();
});

Then("I validate that the description has been changed 'Proof Ghost Uniandes' on users page", async function () {	
	let descriptionElement = await this.driver.$("div.site-header-inner p.site-description").getText();
	
	if(descriptionElement !== "Tests Ghost Uniandes"){
		throw new Error(
			`Expected Description is different`
		);
	}
});

/**Tags - Posts**/
Given("I click on the 'Posts' link", async function () {
	let tagLink = await this.driver.$('a[href="#/posts/"]');
	await tagLink.click();
});

let urlPosts = "";
let addTag = "";

When("I click on the first Post list and I add the tag", async function () {	
	let posts = await this.driver.$$("ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title");
	if(posts.length>0){
		urlPosts = posts[0].getText();
		await posts[0].click();	

		let menuButton = await this.driver.$("button.settings-menu-toggle");
		await menuButton.click();

		let inputTags = await this.driver.$("input.ember-power-select-trigger-multiple-input");
		await inputTags.click();

		let tags = await this.driver.$$("li.ember-power-select-option");
		if(tags.length > 0){
			let tag = tags[0];
			addTag = tag.getText(); 
			await tag.click();			
		}
	}
});

When("I click on the modify Post list and I verify tag", async function () {	
	let tags = await this.driver.$$("ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title");
	
	for (let i = 0; i < tags.length; i++) {
		let tag = tags[i];
		let tagText = await tag.getText();
		if (tagText.includes(urlPosts)) {
			await tags[i].click();
			
			let menuButton = await this.driver.$("button.settings-menu-toggle");
			await menuButton.click();

			let tagsAdd = await this.driver.$$("li.ember-power-select-multiple-option span.ember-power-select-multiple-inner-text");
			let flag = false;
			for (let a = 0; a < tagsAdd.length; a++) {
				let input = tagsAdd[a];
				let inputText = await input.getText();
				if (inputText.includes(addTag)) {
					flag = true;
					break;
				}				
			}
			if(flag===false){
				throw new Error(
					`There is not Tag on the post`
				);
			}
			break;
		} 
	}
});