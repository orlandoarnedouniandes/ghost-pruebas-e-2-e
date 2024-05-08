const { Given, When, Then } = require("@cucumber/cucumber");
let datetime;
let resultsPath;

const {
	ensureDirSync,
	getFormattedDatetime,
	saveComparisonReport,
} = require("./helper");

async function saveScreenshot(resultsPath, stringId, sequenceString) {
	ensureDirSync(resultsPath);

	//since the steps are too quick, we need time to take a meaningful screenshot
	await new Promise((resolve) => setTimeout(resolve, 500));

	await this.driver.saveScreenshot(
		`${resultsPath}/${stringId}-${sequenceString}.png`
	);
	if (sequenceString === "after") {
		try {
			await saveComparisonReport.call(this, datetime, resultsPath, stringId);
		} catch (error) {
			console.log(error);
		}
	}
}

When(
	"I log in with email {kraken-string} and password {kraken-string}",
	async function (email, password) {
		datetime = getFormattedDatetime();
		resultsPath = `./results/${datetime}`;

		await saveScreenshot.call(this, resultsPath, "email", "before");
		let emailElement = await this.driver.$("#ember6");
		await emailElement.setValue(email);
		await saveScreenshot.call(this, resultsPath, "email", "after");

		await saveScreenshot.call(this, resultsPath, "pwd", "before");
		let passwordElement = await this.driver.$("#ember8");
		await passwordElement.setValue(password);
		await saveScreenshot.call(this, resultsPath, "pwd", "after");

		await saveScreenshot.call(this, resultsPath, "loginBtn", "before");
		let nextButton = await this.driver.$("#ember10");
		await nextButton.click();
		await saveScreenshot.call(this, resultsPath, "loginBtn", "after");
	}
);

Given("I set the new user name to {string}", function (username) {
	const timestamp = Date.now();
	const encodedTimestamp = encodeURIComponent(timestamp);
	this.newUsername = `${username}_${encodedTimestamp}`;
});

Given("I set the new full name to {string}", function (fullName) {
	const timestamp = Date.now();
	const encodedTimestamp = encodeURIComponent(timestamp);
	this.newFullName = `${fullName}_${encodedTimestamp}`;
	this.currentFullName = this.newFullName;
});

When("I Click on user dropdown", async function () {
	await saveScreenshot.call(this, resultsPath, "clickUserDropdown", "before");
	let userDropdown = await this.driver.$(`div.gh-user-avatar`);
	await userDropdown.click();
	await saveScreenshot.call(this, resultsPath, "clickUserDropdown", "after");
});

When("I click on the 'Your profile' link", async function () {
	await saveScreenshot.call(this, resultsPath, "clickUserProfile", "before");
	let profileLink = await this.driver.$(
		"//a[contains(text(), 'Your profile')]"
	);
	await profileLink.click();
	await saveScreenshot.call(this, resultsPath, "clickUserProfile", "after");
});

When("I modify the user name and save changes", async function () {
	await saveScreenshot.call(this, resultsPath, "modifyUsername", "before");
	let nameField = await this.driver.$("input[name='user']");
	await nameField.setValue(this.newUsername);
	await saveScreenshot.call(this, resultsPath, "modifyUsername", "after");

	await saveScreenshot.call(this, resultsPath, "clickSaveUsername", "before");
	let saveButton = await this.driver.$("button.gh-btn-primary");
	await saveButton.click();
	await saveScreenshot.call(this, resultsPath, "clickSaveUsername", "after");
});

When("I modify current full name and save changes", async function () {
	await saveScreenshot.call(this, resultsPath, "changeFullName", "before");
	let nameField = await this.driver.$("#user-name");
	await nameField.setValue(this.newFullName);
	await saveScreenshot.call(this, resultsPath, "changeFullName", "after");

	await saveScreenshot.call(this, resultsPath, "changeFullNameClick", "before");
	let saveButton = await this.driver.$("button.gh-btn-primary");
	await saveButton.click();
	await saveScreenshot.call(this, resultsPath, "changeFullNameClick", "after");
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
	await saveScreenshot.call(this, resultsPath, "navigateToProfile", "before");
	await this.driver.url(
		`https://ghost-jpjk.onrender.com/author/${this.newUsername}/`
	);
	await saveScreenshot.call(this, resultsPath, "navigateToProfile", "after");
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
	await saveScreenshot.call(this, resultsPath, "clickPageLink", "before");
	let postLink = await this.driver.$('a[href="#/pages/"]');
	await postLink.click();
	await saveScreenshot.call(this, resultsPath, "clickPageLink", "after");
});

let textUrlPage = "";

When("I click on the last Page and I delete the Page", async function () {
	let pages = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title"
	);
	if (pages.length > 0) {
		await saveScreenshot.call(this, resultsPath, "clickLastPage", "before");
		await pages[pages.length - 1].click();
		await saveScreenshot.call(this, resultsPath, "clickLastPage", "after");

		await saveScreenshot.call(this, resultsPath, "clickMenuToggle", "before");
		let menuButton = await this.driver.$("button.settings-menu-toggle");
		await menuButton.click();
		await saveScreenshot.call(this, resultsPath, "clickMenuToggle", "after");

		await saveScreenshot.call(this, resultsPath, "deletePage1", "before");
		textUrlPage = await this.driver.$$(
			"div.gh-icon-link input.post-setting-slug"
		)[pages.length - 1];

		let deletePageButton = await this.driver.$(
			"button.settings-menu-delete-button"
		);
		await deletePageButton.click();
		await saveScreenshot.call(this, resultsPath, "deletePage1", "after");

		await saveScreenshot.call(this, resultsPath, "deletePage2", "before");
		let deleteButton = await this.driver.$(
			"//span[contains(text(), 'Delete')]"
		);
		await deleteButton.click();
		await saveScreenshot.call(this, resultsPath, "deletePage2", "after");
	}
});

Then("I validate that the last Page not exist", async function () {
	await saveScreenshot.call(this, resultsPath, "deletedPageCheck", "before");
	let pageLink = await this.driver.$('a[href="#/pages/"]');
	await pageLink.click();
	await saveScreenshot.call(this, resultsPath, "deletedPageCheck", "after");

	let pages = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title"
	);
	let flag = false;

	for (let i = 0; i < pages.length; i++) {
		let page = pages[i];
		let pageText = await page.getText().toLowerCase().replace(/\s+/g, "-");
		if (pageText.includes(textUrlPage)) {
			flag = true;
			break;
		}
	}

	if (flag === true) {
		throw new Error(`Expected Page exist`);
	}
});

let titleUrlPage = "";

When("I click on the publish page", async function () {
	await saveScreenshot.call(this, resultsPath, "publishClick", "before");
	let pages = await this.driver.$$(
		"a.gh-post-list-status div span.gh-content-status-published"
	);
	if (pages.length > 0) {
		await pages[0].click();
		let menuButton = await this.driver.$("button.gh-unpublish-trigger");
		await menuButton.click();
		titleUrlPage = await this.driver.$$("textarea.gh-editor-title")[0];
	}
	await saveScreenshot.call(this, resultsPath, "publishClick", "after");
});

When("I click on the unpublish page", async function () {
	let pages = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a div.intems-center span.gh-content-status-published"
	);
	if (pages.length > 0) {
		await pages[0].click();
		let menuButton = await this.driver.$("gh-unpublish-trigger");
		await menuButton.click();

		titleUrlPage = await this.driver.$$("textarea.gh-editor-title")[0];
		let unpublishedPageButton = await this.driver.$(
			"button.gh-unpublish-trigger"
		);
		await unpublishedPageButton.click();

		await saveScreenshot.call(this, resultsPath, "unPublishClick", "before");
		let unpublishedButton = await this.driver.$("button.gh-revert-to-draft");
		await unpublishedButton.click();
		await saveScreenshot.call(this, resultsPath, "unPublishClick", "after");
	}
});

Then("I validate that the last Page is unpublish", async function () {
	await saveScreenshot.call(this, resultsPath, "unPublishCheck", "before");
	let pageLink = await this.driver.$('a[href="#/pages/"]');
	await pageLink.click();

	let pages = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a div.intems-center span"
	);
	let flag = false;

	for (let i = 0; i < pages.length; i++) {
		let page = pages[i];
		let pageText = await page.getText().toLowerCase().replace(/\s+/g, "-");
		if (pageText.includes(titleUrlPage)) {
			flag = true;
			break;
		}
	}

	if (flag === true) {
		throw new Error(`Expected Page publish`);
	}
	await saveScreenshot.call(this, resultsPath, "unPublishCheck", "after");
});

/**Tags**/
Given("I click on the 'Tags' link", async function () {
	await saveScreenshot.call(this, resultsPath, "tagClick", "before");
	let tagLink = await this.driver.$('a[href="#/tags/"]');
	await tagLink.click();
	await saveScreenshot.call(this, resultsPath, "tagClick", "after");
});

Given("I click on the 'New Tag' link", async function () {
	await saveScreenshot.call(this, resultsPath, "newTagClick", "before");
	let newTagLink = await this.driver.$('a[href="#/tags/new/"]');
	await newTagLink.click();
	await saveScreenshot.call(this, resultsPath, "newTagClick", "after");
});

When(
	"I type the basic information for New Tag 'Test Tag' and create Tag",
	async function () {
		await saveScreenshot.call(this, resultsPath, "newTagData1", "before");
		let tagNameElement = await this.driver.$("#tag-name");
		await tagNameElement.setValue("Test Tag");
		await saveScreenshot.call(this, resultsPath, "newTagData1", "after");

		await saveScreenshot.call(this, resultsPath, "newTagData2", "before");
		let accentColorElement = await this.driver.$(
			"div.input-color input.gh-input"
		);
		await accentColorElement.setValue("d62e2e");
		await saveScreenshot.call(this, resultsPath, "newTagData2", "after");

		await saveScreenshot.call(this, resultsPath, "newTagData3", "before");
		let tagSlugElement = await this.driver.$("#tag-slug");
		await tagSlugElement.setValue("testslug");
		await saveScreenshot.call(this, resultsPath, "newTagData3", "after");

		await saveScreenshot.call(this, resultsPath, "newTagData4", "before");
		let tagDescriptionElement = await this.driver.$("#tag-description");
		await tagDescriptionElement.setValue("Description");
		await saveScreenshot.call(this, resultsPath, "newTagData4", "after");

		let saveButton = await this.driver.$("//span[contains(text(), 'Save')]");
		await saveButton.click();
	}
);

Then("I validate the New Tag created 'Test Tag'", async function () {
	await saveScreenshot.call(this, resultsPath, "newTagCheck", "before");
	let tagLink = await this.driver.$('a[href="#/tags/"]');
	await tagLink.click();

	let tags = await this.driver.$$(
		"ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name"
	);
	let flag = false;

	for (let i = 0; i < tags.length; i++) {
		let tag = tags[i];
		let tagText = await tag.getText();
		if (tagText.includes("Test Tag")) {
			flag = true;
			break;
		}
	}
	await saveScreenshot.call(this, resultsPath, "newTagCheck", "after");

	if (flag === false) {
		throw new Error(`Expected Tag to be 'Test Tag' but found ${actualText}`);
	}
});

When("I click on the first Tag list and I modify the title", async function () {
	let tags = await this.driver.$$(
		"ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name"
	);
	if (tags.length > 0) {
		await tags[0].click();

		await saveScreenshot.call(this, resultsPath, "tagedit", "before");
		let tagNameElement = await this.driver.$("#tag-name");
		await tagNameElement.setValue("Test Tag Modified");
		await saveScreenshot.call(this, resultsPath, "tagedit", "after");

		await saveScreenshot.call(this, resultsPath, "tageditClick", "before");
		let saveButton = await this.driver.$("//span[contains(text(), 'Save')]");
		await saveButton.click();
		await saveScreenshot.call(this, resultsPath, "tageditClick", "after");
	}
});

Then("I validate the Tag modified 'Test Tag Modified'", async function () {
	await saveScreenshot.call(this, resultsPath, "tageditcheck", "before");
	let tagLink = await this.driver.$('a[href="#/tags/"]');
	await tagLink.click();

	let tags = await this.driver.$$(
		"ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name"
	);
	let flag = false;

	for (let i = 0; i < tags.length; i++) {
		let tag = tags[i];
		let tagText = await tag.getText();
		if (tagText.includes("Test Tag Modified")) {
			flag = true;
			break;
		}
	}

	await saveScreenshot.call(this, resultsPath, "tageditcheck", "after");

	if (flag === false) {
		throw new Error(`Expected Tag to be 'Test Tag' but found ${actualText}`);
	}
});

let textSlugTag = "";

When("I click on the last Tag and I delete the tag", async function () {
	await saveScreenshot.call(this, resultsPath, "deleteTag", "before");
	let tags = await this.driver.$$(
		"ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name"
	);
	if (tags.length > 0) {
		await tags[tags.length - 1].click();

		textSlugTag = await this.driver.$$(
			"ol li.gh-list-row.gh-tags-list-item a span"
		)[tags.length - 1];

		let deleteTagButton = await this.driver.$(
			"//span[contains(text(), 'Delete tag')]"
		);
		await deleteTagButton.click();

		let deleteButton = await this.driver.$(
			"//span[contains(text(), 'Delete')]"
		);
		await deleteButton.click();
	}
	await saveScreenshot.call(this, resultsPath, "deleteTag", "after");
});

Then(
	"I validate that the tag 'Test Tag Modified' not exist",
	async function () {
		await saveScreenshot.call(this, resultsPath, "tagEditionCheck", "before");
		let tagLink = await this.driver.$('a[href="#/tags/"]');
		await tagLink.click();

		let tags = await this.driver.$$(
			"ol li.gh-list-row.gh-tags-list-item a span"
		);
		let flag = false;

		for (let i = 0; i < tags.length; i++) {
			let tag = tags[i];
			let tagText = await tag.getText();
			if (tagText.includes(textSlugTag)) {
				flag = true;
				break;
			}
		}
		await saveScreenshot.call(this, resultsPath, "tagEditionCheck", "after");

		if (flag === true) {
			throw new Error(`Expected Tag exist`);
		}
	}
);

/**General*/
Given("I click on the 'Settings' link", async function () {
	await saveScreenshot.call(this, resultsPath, "settingsClick", "before");
	let settingsLink = await this.driver.$("path.settings_svg__a");
	await settingsLink.click();
	await saveScreenshot.call(this, resultsPath, "settingsClick", "after");
});

Given("I click on the 'General Settings' link", async function () {
	await saveScreenshot.call(this, resultsPath, "genSettingsClick", "before");
	let settingsLink = await this.driver.$('a[href="#/settings/general/"]');
	await settingsLink.click();
	await saveScreenshot.call(this, resultsPath, "genSettingsClick", "after");
});

When("I modify the description", async function () {
	let expandLink = await this.driver.$$(
		"div.gh-expandable-header button.gh-btn"
	)[0];
	await expandLink.click();

	await saveScreenshot.call(this, resultsPath, "desciptionEdit", "before");
	let descriptionElement = await this.driver.$(
		"div.description-container input.ember-text-field"
	);
	await descriptionElement.setValue("Tests Ghost Uniandes");
	await saveScreenshot.call(this, resultsPath, "desciptionEdit", "after");

	await saveScreenshot.call(this, resultsPath, "desciptionEditClick", "before");
	let saveButton = await this.driver.$("//span[contains(text(), 'Save')]");
	await saveButton.click();
	await saveScreenshot.call(this, resultsPath, "desciptionEditClick", "after");
});

Then(
	"I validate that the description has been changed 'Proof Ghost Uniandes' on users page",
	async function () {
		let descriptionElement = await this.driver
			.$("div.site-header-inner p.site-description")
			.getText();

		if (descriptionElement !== "Tests Ghost Uniandes") {
			throw new Error(`Expected Description is different`);
		}
	}
);

/**Posts**/
Given("I click on the 'Posts' link", async function () {
	await saveScreenshot.call(this, resultsPath, "postLinkClick", "before");
	let tagLink = await this.driver.$('a[href="#/posts/"]');
	await tagLink.click();
	await saveScreenshot.call(this, resultsPath, "postLinkClick", "after");
});

let urlPosts = "";
let addTag = "";

When("I click on the first Post list and I add the tag", async function () {
	await saveScreenshot.call(this, resultsPath, "addTagToPost", "before");
	let posts = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title"
	);
	if (posts.length > 0) {
		urlPosts = posts[0].getText();
		await posts[0].click();

		let menuButton = await this.driver.$("button.settings-menu-toggle");
		await menuButton.click();

		let inputTags = await this.driver.$(
			"input.ember-power-select-trigger-multiple-input"
		);
		await inputTags.click();

		let tags = await this.driver.$$("li.ember-power-select-option");
		if (tags.length > 0) {
			let tag = tags[0];
			addTag = tag.getText();
			await tag.click();
		}
	}
	await saveScreenshot.call(this, resultsPath, "addTagToPost", "after");
});

When("I click on the modify Post list and I verify tag", async function () {
	await saveScreenshot.call(this, resultsPath, "TagToPostCheck", "before");
	let tags = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title"
	);

	for (let i = 0; i < tags.length; i++) {
		let tag = tags[i];
		let tagText = await tag.getText();
		if (tagText.includes(urlPosts)) {
			await tags[i].click();

			let menuButton = await this.driver.$("button.settings-menu-toggle");
			await menuButton.click();

			let tagsAdd = await this.driver.$$(
				"li.ember-power-select-multiple-option span.ember-power-select-multiple-inner-text"
			);
			let flag = false;
			for (let a = 0; a < tagsAdd.length; a++) {
				let input = tagsAdd[a];
				let inputText = await input.getText();
				if (inputText.includes(addTag)) {
					flag = true;
					break;
				}
			}
			if (flag === false) {
				throw new Error(`There is not Tag on the post`);
			}
			break;
		}
	}
	await saveScreenshot.call(this, resultsPath, "TagToPostCheck", "after");
});

let textUrlPost = "";

When("I click on the last Post and I delete the Post", async function () {
	await saveScreenshot.call(this, resultsPath, "deletePost", "before");
	let posts = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title"
	);
	if (posts.length > 0) {
		await posts[posts.length - 1].click();

		let menuButton = await this.driver.$("button.settings-menu-toggle");
		await menuButton.click();

		textUrlPost = await this.driver.$$(
			"div.gh-icon-link input.post-setting-slug"
		)[posts.length - 1];

		let deletePostButton = await this.driver.$(
			"button.settings-menu-delete-button"
		);
		await deletePostButton.click();

		let deleteButton = await this.driver.$(
			"//span[contains(text(), 'Delete')]"
		);
		await deleteButton.click();
	}
	await saveScreenshot.call(this, resultsPath, "deletePost", "after");
});

Then("I validate that the last Post not exist", async function () {
	await saveScreenshot.call(this, resultsPath, "deletePostCheck", "before");
	let postLink = await this.driver.$('a[href="#/posts/"]');
	await postLink.click();

	let posts = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title"
	);
	let flag = false;

	for (let i = 0; i < posts.length; i++) {
		let post = posts[i];
		let postText = await post.getText().toLowerCase().replace(/\s+/g, "-");
		if (postText.includes(textUrlPost)) {
			flag = true;
			break;
		}
	}
	await saveScreenshot.call(this, resultsPath, "deletePostCheck", "after");

	if (flag === true) {
		throw new Error(`Expected Post exist`);
	}
});

let titleUrlPost = "";

When("I click on the publish post", async function () {
	let posts = await this.driver.$$(
		"a.gh-post-list-status div span.gh-content-status-published"
	);
	if (posts.length > 0) {
		await saveScreenshot.call(this, resultsPath, "publishPostClick", "before");
		await posts[0].click();
		await saveScreenshot.call(this, resultsPath, "publishPostClick", "after");

		await saveScreenshot.call(
			this,
			resultsPath,
			"publishPostMenuClick",
			"before"
		);
		let menuButton = await this.driver.$("button.gh-unpublish-trigger");
		await menuButton.click();
		await saveScreenshot.call(
			this,
			resultsPath,
			"publishPostMenuClick",
			"after"
		);
		titleUrlPost = await this.driver.$$("textarea.gh-editor-title")[0];
	}
});

When("I click on the unpublish post", async function () {
	await saveScreenshot.call(this, resultsPath, "unPublishPost", "before");
	let posts = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a div.intems-center span.gh-content-status-published"
	);
	if (posts.length > 0) {
		await posts[0].click();
		let menuButton = await this.driver.$("gh-unpublish-trigger");
		await menuButton.click();

		titleUrlPost = await this.driver.$$("textarea.gh-editor-title")[0];
		let unpublishedPostButton = await this.driver.$(
			"button.gh-unpublish-trigger"
		);
		await unpublishedPostButton.click();

		let unpublishedButton = await this.driver.$("button.gh-revert-to-draft");
		await unpublishedButton.click();
	}
	await saveScreenshot.call(this, resultsPath, "unPublishPost", "after");
});

Then("I validate that the last Post is unpublish", async function () {
	await saveScreenshot.call(this, resultsPath, "unPublishPostCheck", "before");
	let postsLink = await this.driver.$('a[href="#/posts/"]');
	await postsLink.click();

	let posts = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a div.intems-center span"
	);
	let flag = false;

	for (let i = 0; i < posts.length; i++) {
		let post = posts[i];
		let postText = await post.getText().toLowerCase().replace(/\s+/g, "-");
		if (postText.includes(titleUrlPost)) {
			flag = true;
			break;
		}
	}
	await saveScreenshot.call(this, resultsPath, "unPublishPostCheck", "after");

	if (flag === true) {
		throw new Error(`Expected Post publish`);
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
	await saveScreenshot.call(
		this,
		resultsPath,
		`clickOnTab_${tabName}`,
		"before"
	);
	let tab = await this.driver.$(`a[href="#/${tabName.toLowerCase()}/"]`);
	await tab.click();
	await saveScreenshot.call(
		this,
		resultsPath,
		`clickOnTab_${tabName}`,
		"after"
	);
});

When("I navigate to the {string} settings page", async function (pageName) {
	await saveScreenshot.call(
		this,
		resultsPath,
		`navigateSetting_${pageName}`,
		"before"
	);
	let link = await this.driver.$(
		`a[href="#/settings/${pageName.toLowerCase()}/"]`
	);
	await link.click();
	await saveScreenshot.call(
		this,
		resultsPath,
		`navigateSetting_${pageName}`,
		"after"
	);
});

When("I click the Expand button", async function () {
	await saveScreenshot.call(this, resultsPath, "expandBtnClick", "before");
	let button = await this.driver.$(
		"body > div.gh-app > div > main > section > div:nth-child(2) > div:nth-child(1) > section > div:nth-child(1) > div.gh-expandable-header > button"
	);
	await button.click();
	await saveScreenshot.call(this, resultsPath, "expandBtnClick", "after");
});

When("I update the site title to {string}", async function (newTitle) {
	await saveScreenshot.call(this, resultsPath, "updateSiteTitle", "before");
	let titleInput = await this.driver.$(
		"input.ember-text-field.gh-input[type='text']"
	);
	const timestamp = Date.now();
	const encodedTimestamp = encodeURIComponent(timestamp);
	this.updatedSiteTitle = `${"Updated Title"}_${encodedTimestamp}`;

	await titleInput.setValue(this.updatedSiteTitle);
	await saveScreenshot.call(this, resultsPath, "updateSiteTitle", "after");
});

When("I click the primary Save button", async function () {
	await saveScreenshot.call(this, resultsPath, "primarySaveBtn", "before");
	let saveButton = await this.driver.$(
		"button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view"
	);
	await saveButton.click();
	await saveScreenshot.call(this, resultsPath, "primarySaveBtn", "after");
});

When("I navigate to the {string} page", async function (pageName) {
	await saveScreenshot.call(
		this,
		resultsPath,
		`navigatePage_${pageName}`,
		"before"
	);
	let link = await this.driver.$(`a[href="#/${pageName.toLowerCase()}/"]`);
	await link.click();
	await saveScreenshot.call(
		this,
		resultsPath,
		`navigatePage_${pageName}`,
		"after"
	);
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
		await saveScreenshot.call(this, resultsPath, "newNavigation", "before");
		let labelInputs = await this.driver.$$(
			`input.ember-text-field.gh-input[type='text'][placeholder='Label']`
		);

		await labelInputs[labelInputs.length - 1].setValue(label);

		let addButtons = await this.driver.$$("button.gh-blognav-add");
		let lastAddButton = addButtons[addButtons.length - 1]; // Select the last "Add" button
		await lastAddButton.click();
		await saveScreenshot.call(this, resultsPath, "newNavigation", "after");
	}
);

When("I save the navigation changes", async function () {
	await saveScreenshot.call(this, resultsPath, "saveNavigation", "before");
	let saveButton = await this.driver.$("button[type='submit']");
	await saveButton.click();
	await saveScreenshot.call(this, resultsPath, "saveNavigation", "after");
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

		if (!labelExists) {
			throw new Error(
				`Expected navigation item with label ${expectedLabel} was not found.`
			);
		}
	}
);

Then("delete label {string}", async function (expectedLabel) {
	await saveScreenshot.call(this, resultsPath, "deleteLabel", "before");
	let deleteButtons = await this.driver.$$("button.gh-blognav-delete");
	let lastDeleteButton = deleteButtons[deleteButtons.length - 1];
	await lastDeleteButton.click();
	await saveScreenshot.call(this, resultsPath, "deleteLabel", "after");
});


When ("I click on the 'NewPost' link", async function () {
	await saveScreenshot.call(this, resultsPath, "saveNavigation", "before");
	let newpost = await this.driver.$('a[href="#/editor/post/"]');
	await newpost.click();	
	await saveScreenshot.call(this, resultsPath, "saveNavigation", "after");
});

When("I fill the post with title {kraken-string} and content {kraken-string}",
	async function (title, content) {

		let titleElement = await this.driver.$("textarea.gh-editor-title");
		await titleElement.setValue(title);
		let contentElement = await this.driver.$("div.koenig-editor__editor");
		await contentElement.setValue(content);
	}
);

When("I navigate back to the 'Posts' page", async function () {
	await saveScreenshot.call(this, resultsPath, "navigateToPosts", "before");
	let postsLink = await this.driver.$('a[href="#/posts/"]');
	await postsLink.click();
	await saveScreenshot.call(this, resultsPath, "navigateToPosts", "after");
});

Then("I validate the last post with title {kraken-string}", async function (title) {
	let posts = await this.driver.$$(
		"ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title"
	);
	let flag = false;
	for (let i = 0; i < posts.length; i++) {
		let post = posts[i];
		let postText = (await post.getText()).toLowerCase().replace(/\s+/g, "-");		                     
		if (postText.includes(title)) {
			flag = true;
			break;
		}
	}

	if (flag === true) {
		throw new Error(`Expected Post not exists`);
	}
});

