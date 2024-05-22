/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PostPage = require("../pageobjects/postpage");


context("CreatePost", function () {
  let escenario='escenario54';

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    cy.fixture("ghost.json").then((data) => {
      this.data = data;
      //Given      
      this.page.visit(this.data.url,escenario,'1_home');
    });
  });

  it("aleatorio - El usuario editor quiere crear un nuevo post", function () {
    //Given the user is logged as Admin and navigate to the posts
    this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
    this.page.navigateToNewPost(escenario,'3_newpost');

    //When the user get a random title and content that has special characters
    const title = faker.lorem.sentence()+this.page.generateSpecialCharactersRandomly(10);
    const content = faker.lorem.sentence()+this.page.generateSpecialCharactersRandomly(10);
    // and the user fill the form and save it and back to posts
    this.postPage.fillandSavePostForm(title, content,'4_fillform');
    this.postPage.backtoPosts(escenario,'5_backtoposts');

    //Then the user verify the post was created as a draft
    this.postPage.verifylastPostTitleandDraft(title,escenario,'6_verify');
  });
});