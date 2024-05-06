/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");


context("DeletePost",function () {

    beforeEach(function () {
        this.page = new Page();
        this.postPage = new PostPage();
        this.SitePage = new SitePage();
    
        if(this.data === undefined){
          cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given
            this.page.visit(this.data.url);
          });
        }
    
      });

      it("User wants to delete a post",function (){
        //Given
        this.page.visit(this.data.url);
        cy.wait(3000);
        this.page.getLastPostTitle();
        cy.get('@postTitle').then((title) => {
            cy.log('post a eliminar:'+title);
            this.page.loginAdmin(this.data.username, this.data.password);
            this.page.navigateToPosts();
            this.postPage.navigateToSpecificPost(title); 

            //When
            this.postPage.deletePost();
            this.page.logout();  

            //Then
            this.SitePage.verifyPostTitleDoesNotExist(title);
        });
      });
});