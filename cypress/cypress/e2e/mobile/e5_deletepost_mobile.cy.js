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
        //Given: **Dado** que soy un usuario de teléfono IPhone
        cy.viewport('iphone-se2');

        if(this.data === undefined){
          cy.fixture("ghost.json").then((data) => {
            this.data = data;
            this.page.visit(this.data.url,escenario,'1_home');
          });
        }
    
      });

      it("User wants to delete a post",function (){
        //...y que soy un usuario administrador ingreso a la página de administradores y navego hasta el listado de post y busco el post que quiero eliminar,
        cy.wait(3000);
        this.page.getLastPostTitle();
        cy.get('@postTitle').then((title) => {
            cy.log('post a eliminar:'+title);
            this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
            this.page.navigateToPosts(escenario,'3_posts');
            this.postPage.filterPublishedPosts(escenario,'4_filter');
            this.postPage.navigateToSpecificPost(title,escenario,'5_post'); 

            //When: **Cuando** elimino el post y vuelvo a la página home del sitio
            this.postPage.deletePost(escenario,'6_deletepost');
            this.page.logout(escenario,'7_logout');  

            //Then: **Entonces** el post no debe estar visible
            this.SitePage.verifyPostTitleDoesNotExist(title,escenario,'8_verify');
        });
      });
});