/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("UpdatePost",function () {
    let escenario='escenario3';

    beforeEach(function () {
        this.page = new Page();
        this.postPage = new PostPage();
        this.SitePage = new SitePage();
        //Given **Dado** que soy un usuario de teléfono IPhone
        cy.viewport('iphone-6');

        cy.fixture("ghost_post.json").then((data) => {
            this.postdata = data[Math.floor(Math.random() * data.length)];;
        });

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            this.page.visit(this.data.url,escenario,'1_home');
            });
        }
    });

    it("El usuario editor quiere cambiar el título de un post que había publicado anteriormente",function () {
        //...y que soy un usuario administrador e ingreso a la página de administradores y navego hasta el listado de post y busco el post que quiero editar       
        this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
        this.page.navigateToPosts(escenario,'3_posts');
        this.postPage.getLastPostTitle();
        cy.get('@postTitle').then((title) => {
            cy.log('post a editar:'+title);
            this.postPage.navigateToSpecificPost(title, escenario,'4_post'); 

            //When: **Cuando** cambio el título del post, guardo y luego voy al home del sitio,
            const newTitle = this.page.getRandomPostTitle(this.postdata.post_title.substring(0, 200))   ;
            this.postPage.fillandSavePostForm(newTitle, this.postdata.post_content,escenario,'5_fillform');
            this.postPage.backtoPosts(escenario,'5_backtoposts');

            //Then: **Entonces** el post debe haber cambiado su título
            this.postPage.verifylastPostTitleandDraft(newTitle,escenario,'6_verify');
        });  
    });
});