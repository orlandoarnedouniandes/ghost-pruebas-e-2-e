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


/**Page*/
Given("I click on the 'Pages' link", async function () {
	let postLink = await this.driver.$('a[href="#/pages/"]');
	await postLink.click();
});

let textUrlPage = "";

When("I click on the last Page and I delete the Page", async function () {	
	let pages = await this.driver.$$("ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title");
	if(pages.length>0){
		await pages[pages.length-1].click();	

		let menuButton = await this.driver.$("button.settings-menu-toggle");
		await menuButton.click();

		textUrlPage = await this.driver.$$("div.gh-icon-link input.post-setting-slug")[pages.length-1];

		let deletePageButton = await this.driver.$("button.settings-menu-delete-button");
		await deletePageButton.click();

		let deleteButton = await this.driver.$("//span[contains(text(), 'Delete')]");
		await deleteButton.click();
	}
});

Then("I validate that the last Page not exist", async function () {
	let pageLink = await this.driver.$('a[href="#/pages/"]');
	await pageLink.click();

	let pages = await this.driver.$$("ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title");
	let flag = false;

	for (let i = 0; i < pages.length; i++) {
		let page = pages[i];
		let pageText = await page.getText().toLowerCase().replace(/\s+/g, "-");;
		if (pageText.includes(textUrlPage)) {
			flag=true;
			break;
		} 
	}
    
	if (flag === true) {
		throw new Error(
			`Expected Page exist`
		);
	}
});

let titleUrlPage = "";

When("I click on the publish page", async function () {	
	let pages = await this.driver.$$("a.gh-post-list-status div span.gh-content-status-published");
	if(pages.length>0){
		await pages[0].click();
		let menuButton = await this.driver.$("button.gh-unpublish-trigger");
		await menuButton.click();
		titleUrlPage = await this.driver.$$("textarea.gh-editor-title")[0];	
	}
});

When("I click on the unpublish page", async function () {	
	let pages = await this.driver.$$("ol li.gh-list-row.gh-posts-list-item a div.intems-center span.gh-content-status-published");
if(pages.length>0){
		await pages[0].click();
		let menuButton = await this.driver.$("gh-unpublish-trigger");
		await menuButton.click();

		titleUrlPage = await this.driver.$$("textarea.gh-editor-title")[0];
		let unpublishedPageButton = await this.driver.$("button.gh-unpublish-trigger");
		await unpublishedPageButton.click();

		let unpublishedButton = await this.driver.$("button.gh-revert-to-draft");
		await unpublishedButton.click();				
	}
});	

Then("I validate that the last Page is unpublish", async function () {
	let pageLink = await this.driver.$('a[href="#/pages/"]');
	await pageLink.click();

	let pages = await this.driver.$$("ol li.gh-list-row.gh-posts-list-item a div.intems-center span");
	let flag = false;

	for (let i = 0; i < pages.length; i++) {
		let page = pages[i];
		let pageText = await page.getText().toLowerCase().replace(/\s+/g, "-");;
		if (pageText.includes(titleUrlPage)) {
			flag=true;	
			break;
		} 
	}
    
	if (flag === true) {
		throw new Error(
			`Expected Page publish`
		);
	}
});

/**Tags**/
Given("I click on the 'Tags' link", async function () {
	let tagLink = await this.driver.$('a[href="#/tags/"]');
	await tagLink.click();
});

Given("I click on the 'New Tag' link", async function () {
	let newTagLink = await this.driver.$('a[href="#/tags/new/"]');
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
	let tagLink = await this.driver.$('a[href="#/tags/"]');
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
	let tagLink = await this.driver.$('a[href="#/tags/"]');
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
	let tagLink = await this.driver.$('a[href="#/tags/"]');
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

/**Posts**/
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

let textUrlPost = "";

When("I click on the last Post and I delete the Post", async function () {	
	let posts = await this.driver.$$("ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title");
	if(posts.length>0){
		await posts[posts.length-1].click();	

		let menuButton = await this.driver.$("button.settings-menu-toggle");
		await menuButton.click();

		textUrlPost = await this.driver.$$("div.gh-icon-link input.post-setting-slug")[posts.length-1];

		let deletePostButton = await this.driver.$("button.settings-menu-delete-button");
		await deletePostButton.click();

		let deleteButton = await this.driver.$("//span[contains(text(), 'Delete')]");
		await deleteButton.click();
	}
});

Then("I validate that the last Post not exist", async function () {
	let postLink = await this.driver.$('a[href="#/posts/"]');
	await postLink.click();

	let posts = await this.driver.$$("ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title");
	let flag = false;

	for (let i = 0; i < posts.length; i++) {
		let post = posts[i];
		let postText = await post.getText().toLowerCase().replace(/\s+/g, "-");;
		if (postText.includes(textUrlPost)) {
			flag=true;
			break;
		} 
	}
    
	if (flag === true) {
		throw new Error(
			`Expected Post exist`
		);
	}
});




let titleUrlPost = "";

When("I click on the publish post", async function () {	
	let posts = await this.driver.$$("a.gh-post-list-status div span.gh-content-status-published");
	if(posts.length>0){
		await posts[0].click();
		let menuButton = await this.driver.$("button.gh-unpublish-trigger");
		await menuButton.click();
		titleUrlPost = await this.driver.$$("textarea.gh-editor-title")[0];	
	}
});

When("I click on the unpublish post", async function () {	
	let posts = await this.driver.$$("ol li.gh-list-row.gh-posts-list-item a div.intems-center span.gh-content-status-published");
if(posts.length>0){
		await posts[0].click();
		let menuButton = await this.driver.$("gh-unpublish-trigger");
		await menuButton.click();

		titleUrlPost = await this.driver.$$("textarea.gh-editor-title")[0];
		let unpublishedPostButton = await this.driver.$("button.gh-unpublish-trigger");
		await unpublishedPostButton.click();

		let unpublishedButton = await this.driver.$("button.gh-revert-to-draft");
		await unpublishedButton.click();				
	}
});	

Then("I validate that the last Post is unpublish", async function () {
	let postsLink = await this.driver.$('a[href="#/posts/"]');
	await postsLink.click();

	let posts = await this.driver.$$("ol li.gh-list-row.gh-posts-list-item a div.intems-center span");
	let flag = false;

	for (let i = 0; i < posts.length; i++) {
		let post = posts[i];
		let postText = await post.getText().toLowerCase().replace(/\s+/g, "-");;
		if (postText.includes(titleUrlPost)) {
			flag=true;	
			break;
		} 
	}
    
	if (flag === true) {
		throw new Error(
			`Expected Post publish`
		);
	}
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

//E9

When(
	"I add a new navigation item with label {string} and URL {string}",
	async function (label, url) {
		let labelInputs = await this.driver.$$(
			`input.ember-text-field.gh-input[type='text'][placeholder='Label']`
		);

		await labelInputs[labelInputs.length - 1].setValue(label);

		let addButtons = await this.driver.$$("button.gh-blognav-add");
		let lastAddButton = addButtons[addButtons.length - 1]; // Select the last "Add" button
		await lastAddButton.click();
	}
);

When("I save the navigation changes", async function () {
	let saveButton = await this.driver.$("button[type='submit']");
	await saveButton.click();
});

Then(
	"I should see a navigation item with label {string} and URL {string}",
	async function (expectedLabel, expectedUrl) {
		let labels = await this.driver.$$(
			`input.ember-text-field.gh-input[type='text'][placeholder='Label']`
		);
		

		let labelExists = labels.some(
			async (input) => (await input.getValue()) === expectedLabel
		);


		if (!labelExists ) {
			throw new Error(
				`Expected navigation item with label ${expectedLabel} was not found.`
			);
		}
	}
);

Then("delete label {string}", async function (expectedLabel) {
	let deleteButtons = await this.driver.$$("button.gh-blognav-delete");
	let lastDeleteButton = deleteButtons[deleteButtons.length - 1]; // Select the last "Add" button
	await lastDeleteButton.click();

});