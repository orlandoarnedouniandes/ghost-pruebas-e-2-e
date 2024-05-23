/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");


context("CreatePost", function () {
  let escenario='escenario1';

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();

    cy.viewport('iphone-6');

    cy.fixture("ghost_post.json").then((data) => {
      this.postdata = data[Math.floor(Math.random() * data.length)];;
    });
    
    cy.fixture("ghost.json").then((data) => {
      this.data = data;
      //Given the user is in the home page     
      this.page.visit(this.data.url,escenario,'1_home');
    });  
  });

  it("El usuario editor quiere crear un nuevo post", function () {
    //Given the user logs in and navigates to new post
    this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
    this.page.navigateToNewPost(escenario,'3_newpost');

    //When the user fills the form with dynamic values and saves the post and goes back to posts
    const title = this.page.getRandomPostTitle(this.postdata.post_title.substring(0, 200));
    this.postPage.fillandSavePostForm(title, this.postdata.post_content.substring(0,1000),escenario,'4_fillform');
    this.postPage.backtoPosts(escenario,'5_backtoposts');

    //Then the user verify the post was created and is in draft
    this.postPage.verifylastPostTitleandDraft(title,escenario,'6_verify');
  });
});