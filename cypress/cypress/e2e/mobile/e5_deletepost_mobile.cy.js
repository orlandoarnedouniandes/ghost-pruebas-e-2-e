/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");


context("DeletePost",function () {
    let escenario='escenario5';

    beforeEach(function () {
        this.page = new Page();
        this.postPage = new PostPage();
        this.SitePage = new SitePage();
        cy.viewport('iphone-6');
        if(this.data === undefined){
          cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given the user is in the home page
            this.page.visit(this.data.url,escenario,'1_home');
          });
        }
    
      });

      it("User wants to delete a post",function (){
        //Given the user logs in and navigates to the last post created
        cy.wait(3000);
        this.page.getLastPostTitle();
        cy.get('@postTitle').then((title) => {
            cy.log('post a eliminar:'+title);
            this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
            this.page.navigateToPosts(escenario,'3_posts');
            this.postPage.filterPublishedPosts(escenario,'4_filter');
            this.postPage.navigateToSpecificPost(title,escenario,'5_post'); 

            //When the user deletes the post and logs out
            this.postPage.deletePost(escenario,'6_deletepost');
            this.page.logout(escenario,'7_logout');  

            //Then the user verify the post was deleted
            this.SitePage.verifyPostTitleDoesNotExist(title,escenario,'8_verify');
        });
      });
});