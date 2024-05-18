/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const PostPage = require("../pageobjects/postpage");


context("CreatePost", function () {
  let escenario='escenario1';

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    
    cy.fixture("ghost_post.json").then((data) => {
      this.postdata = data[Math.floor(Math.random() * data.length)];;
    });
    
    cy.fixture("ghost.json").then((data) => {
      this.userdata = data;
      //Given      
      this.page.visit(this.userdata.url,escenario,'1_home');
    });

  });

  it("El usuario editor quiere crear un nuevo post", function () {
    //Given
    this.page.loginAdmin(this.userdata.username, this.userdata.password,escenario,'2_login');
    this.page.navigateToNewPost(escenario,'3_newpost');

    //When
    const title = this.postdata.post_title;
    const content = this.postdata.post_content;
    this.postPage.fillandSavePostForm(title, content,'4_fillform');
    this.postPage.backtoPosts(escenario,'5_backtoposts');

    //Then
    this.postPage.verifylastPostTitleandDraft(title,escenario,'6_verify');
  });
});