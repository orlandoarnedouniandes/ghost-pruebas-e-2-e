/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PostPage = require("../pageobjects/postpage");


//La aserción de este caso de prueba falla debido a que Ghost tiene un bug cuando se intenta crear un post con un título de más de 2000 caracteres

context("CreatePost", function () {
  let escenario='escenario45';

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    cy.fixture("ghost.json").then((data) => {
      this.data = data;
      //Given the user is in the home page      
      this.page.visit(this.data.url,escenario,'1_home');
    });
  });

  it("aleatorio - El usuario editor quiere crear un nuevo post con un titulo de mas de 2000 caracteres", function () {
    //Given the user is logged as Admin and navigate to new post page
    this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
    this.page.navigateToNewPost(escenario,'3_newpost');

    //When the user get a random title with more than 2000 characters and a random content 
    const title = faker.datatype.string(2001);
    console.log('Title: '+title);
    const content = faker.datatype.string(200);
    // and the user fill the form and save it and back to posts
    this.postPage.fillandSavePostForm(title, content,'4_fillform');
    this.postPage.backtoPosts(escenario,'5_backtoposts');
    
    //Then the user verify the post was created as a draft    
    this.postPage.verifylastPostTitleandDraft(title,escenario,'6_verify');
  });
});