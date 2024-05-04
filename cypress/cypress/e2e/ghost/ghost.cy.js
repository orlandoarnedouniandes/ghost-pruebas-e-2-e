/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

/*context("Ghost",function () {
  beforeEach(async function () {
    this.page = new Page();
    this.postPage = new PostPage();
    this.SitePage = new SitePage();

    await cy.fixture("ghost.json").then((data) => {
      this.data = data;
    });

    //Given
    this.page.visit(this.data.url);
  });

  //it.skip("should open the Ghost page", function () {
  //  this.page.visit(this.data.url);
  //});

  it("User should create a new post",function () {
    //Given
    this.page.loginAdmin(this.data.username, this.data.password);
    this.page.navigateToNewPost();

    //When
    this.postPage.fillPostForm(this.data.post.title, this.data.post.content);
    this.postPage.publishPost();
    this.postPage.backtoDashBoard();
    this.page.logout();

    //Then
    this.SitePage.verifylastPostTitle(this.data.post.title);
  });
});*/
