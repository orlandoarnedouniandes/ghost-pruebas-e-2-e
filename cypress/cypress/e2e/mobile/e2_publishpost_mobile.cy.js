/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("PublishPost", function () {
    let escenario='escenario2';

    beforeEach(function () {
      
      this.page = new Page();
      this.postPage = new PostPage();
      this.sitePage = new SitePage();

      cy.viewport('iphone-6');      

      cy.fixture("ghost.json").then((data) => {
        cy.log('Data: '+data.url );
        this.data = data;
        //Given  the user is in the home page     
        this.page.visit(this.data.url,escenario,'1_home');
      });
    });
  
    it("El usuario editor quiere publicar un post que había creado previamente", function () {
      //Given the user logs in and navigates to a draft post
      this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
      this.page.navigateToPosts(escenario,'3_posts');    
      this.postPage.findDraftPost(); 
      cy.get('@postTitle').then((title) => {
        this.postPage.navigateToSpecificPost(title,escenario,'4_specificpost');

      //When  the user publishes the post and goes back to dashboard and logs out
      this.postPage.publishPost(escenario,'5_publish');
      this.postPage.backtoDashBoard(escenario,'6_dashboard');
      this.page.logout(escenario,'7_logout');  

      //Then the user verify the post was published
      this.sitePage.verifylastPostTitle(title,escenario,'8_verify');
      });
    });

  });