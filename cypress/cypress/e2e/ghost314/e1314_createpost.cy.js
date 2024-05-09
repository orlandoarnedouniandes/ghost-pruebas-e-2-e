/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");


context("CreatePost314", function () {
  let escenario='escenario1';

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    cy.fixture("ghost.json").then((data) => {
      this.data = data;
      //Given      
      this.page.visit(this.data.url342,escenario,'1_home');
    });
  });

  it("El usuario editor quiere crear un nuevo post", function () {
    //Given
    this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
    this.page.navigateToNewPost(escenario,'3_newpost');

    //When
    const title = this.page.getRandomPostTitle(this.data.post.title);
    this.postPage.fillandSavePostForm(title, this.data.post.content,escenario,'4_fillform');
    this.postPage.backtoPosts(escenario,'5_backtoposts');

    //Then
    this.postPage.verifylastPostTitleandDraft(title,escenario,'6_verify');
  });
});