/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const PostPage = require("../pageobjects/postpage");


context("CreatePost", function () {
  let escenario='escenario91';

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    
    cy.fixture("ghost.json").then((data) => {
      this.userdata = data;

      cy.request('GET', this.userdata.api_post_dinamico).then((response) => {
        this.postdata = response.body;
      });

      //Given the user is in the home page      
      this.page.visit(this.userdata.url,escenario,'1_home');
    });

  });

  it("Dinamico - El usuario editor quiere crear un nuevo post", function () {
    //Given the user logs in and navigates to new post
    this.page.loginAdmin(this.userdata.username, this.userdata.password,escenario,'2_login');
    this.page.navigateToNewPost(escenario,'3_newpost');

    //When the user fills the form with dynamic values and saves the post and goes back to posts
    const title = this.postdata.post_title;
    const content = this.postdata.post_content;
    this.postPage.fillandSavePostForm(title, content,'4_fillform');
    this.postPage.backtoPosts(escenario,'5_backtoposts');

    //Then the user verify the post was created and is in draft
    this.postPage.verifylastPostTitleandDraft(title,escenario,'6_verify');
  });
});