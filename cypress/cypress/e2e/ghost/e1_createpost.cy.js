/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");

context("CreatePost", function () {
  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();

    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      //Given      
      this.page.visit(this.data.url);
    });
  });

  it("El usuario editor quiere crear un nuevo post", function () {
    //Given
    this.page.loginAdmin(this.data.username, this.data.password);
    this.page.navigateToNewPost();

    //When
    const title = this.page.getRandomPostTitle(this.data.post.title);
    this.postPage.fillandSavePostForm(title, this.data.post.content);
    this.postPage.backtoPosts();

    //Then
    this.postPage.verifylastPostTitleandDraft(title);
  });
});