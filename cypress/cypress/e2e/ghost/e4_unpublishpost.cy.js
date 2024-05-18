/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("UnpublishPost", function () {
  let escenario = "escenario4";

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    this.SitePage = new SitePage();

    if (this.data === undefined) {
      cy.fixture("ghost.json").then((data) => {
        this.data = data;
        //Given the user is in the home page
        this.page.visit(this.data.url, escenario, "1_home");
      });
    }
  });

  it.skip("El usuario editor quiere despublicar un post para que no esté más visible en el home del sitio", function () {
    this.page.getLastPostTitle();
    cy.get("@postTitle").then((title) => {
      cy.log("post a despublicar:" + title);

      //Given the user logs in and navigates to the last post created
      this.page.loginAdmin(this.data.username, this.data.password, escenario, "2_login");
      this.page.navigateToPosts(escenario, "3_posts");
      this.postPage.navigateToSpecificPost(title, escenario, "4_post");

      //When the user unpublish the post and logs out
      this.postPage.unpublishPost(escenario, "5_unpublish");
      this.page.navigateToPosts(escenario, "6_posts");
      this.page.logout(escenario, "7_logout");

      //Then the user verify the post was unpublished
      this.SitePage.verifyPostTitleDoesNotExist(title, escenario, "8_verify");
    });
  });
});
