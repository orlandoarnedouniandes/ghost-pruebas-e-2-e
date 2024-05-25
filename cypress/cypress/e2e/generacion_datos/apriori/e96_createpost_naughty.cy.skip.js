/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const PostPage = require("../pageobjects/postpage");


context("CreatePost", function () {
  let escenario='escenario96';

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    
    cy.fixture("ghost_post_naughty.json").then((data) => {      
      this.postdata = data[12];
    });
    
    cy.fixture("ghost.json").then((data) => {
      this.userdata = data;
      //Given the user is in the home page      
      this.page.visit(this.userdata.url,escenario,'1_home');
    });

  });

  it("A priori - El usuario editor quiere crear un nuevo post", function () {
    //Given the user logs in and navigates to new post
    this.page.loginAdmin(this.userdata.username, this.userdata.password,escenario,'2_login');
    this.page.navigateToNewPost(escenario,'3_newpost');

    //When the user fills the form with a title and content from priori data and back to posts
    const title = this.postdata.post_title;
    const content = this.postdata.post_content;
    this.postPage.fillandSavePostForm(title, content,'4_fillform');
    this.postPage.backtoPosts(escenario,'5_backtoposts');

    //Then the user verify the post is created with naughty words
    this.postPage.verifylastPostTitleandDraft(title,escenario,'6_verify');
  });
});