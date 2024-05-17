/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PostPage = require("../pageobjects/postpage");


context("CreatePost", function () {
  let escenario='escenario1';

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    cy.fixture("ghost.json").then((data) => {
      this.data = data;
      //Given      
      this.page.visit(this.data.url,escenario,'1_home');
    });
  });

  it.skip("El usuario editor quiere crear un nuevo post", function () {
    //Given
    this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
    this.page.navigateToNewPost(escenario,'3_newpost');

    //When
    const title = faker.datatype.string(2001);
    console.log('Title: '+title);
    const content = faker.datatype.string(200);
    this.postPage.fillandSavePostForm(title, content,'4_fillform');
    this.postPage.backtoPosts(escenario,'5_backtoposts');

    //Then
    this.postPage.verifylastPostTitleandDraft(title,escenario,'6_verify');
  });
});