/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("UnpublishPost", function () {
  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    this.SitePage = new SitePage();

    if (this.data === undefined) {
      cy.fixture("ghost.json").then((data) => {
        this.data = data;
        //Given
        this.page.visit(this.data.url);
      });
    }
  });

  it("El usuario editor quiere despublicar un post para que no esté más visible en el home del sitio", function () {
    this.page.getLastPostTitle();
    cy.get("@postTitle").then((title) => {
      cy.log("post a despublicar:" + title);

      //Given
      this.page.loginAdmin(this.data.username, this.data.password);
      this.page.navigateToPosts();
      this.postPage.navigateToSpecificPost(title);

      //When
      this.postPage.unpublishPost();
      this.page.navigateToPosts();
      this.page.logout();

      //Then
      this.SitePage.verifyPostTitleDoesNotExist(title);
    });
  });
});
