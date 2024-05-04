/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("PublishPost", function () {
    beforeEach(function () {
      this.page = new Page();
      this.postPage = new PostPage();
      this.sitePage = new SitePage();
  
      cy.fixture("ghost.json").then((data) => {
        cy.log('Data: '+data.url );
        this.data = data;
        //Given      
        this.page.visit(this.data.url);
      });
    });
  
    it("El usuario editor quiere publicar un post que había creado previamente", function () {
      //Given
      this.page.loginAdmin(this.data.username, this.data.password);
      this.page.navigateToPosts();    
      this.postPage.findDraftPost(); 
      cy.get('@postTitle').then((title) => {
        this.postPage.navigateToSpecificPost(title);

      //When 
      this.postPage.publishPost();
      this.postPage.backtoDashBoard();
      this.page.logout();  
      this.page.visit(this.data.url);

      //Then
      this.sitePage.verifylastPostTitle(title);
      });
    });

  });