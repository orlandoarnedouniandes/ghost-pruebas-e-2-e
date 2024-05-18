/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PostPage = require("../pageobjects/postpage");


context("Post", function () {
  let escenario='escenario44';

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    cy.fixture("ghost.json").then((data) => {
      this.data = data;
      //Given  the user is in the home page   
      this.page.visit(this.data.url,escenario,'1_home');
    });
  });

  it.skip("aleatorio - El usuario editor quiere crear un nuevo post", function () { 
    //Given the user is an Admin and navegate to the new post page
    this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
    this.page.navigateToNewPost(escenario,'3_newpost');

    //When the user get a random title and content 
    const title = faker.lorem.sentence();
    const content = faker.lorem.sentence();
    // and the user fill the form and save it
    this.postPage.fillandSavePostForm(title, content,'4_fillform');
    this.postPage.backtoPosts(escenario,'5_backtoposts');

    //Then the user verify the post was created as a draft
    this.postPage.verifylastPostTitleandDraft(title,escenario,'6_verify');
  });
});