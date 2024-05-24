/// <reference types="cypress" />


const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("UseTag", function () {
    let escenario = 'escenario12';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();
        this.postPage = new PostPage();
        this.sitePage = new SitePage();
        //Given **Dado** que soy un usuario de teléfono IPhone
        cy.viewport('iphone-se2');

        cy.fixture("ghost_post.json").then((data) => {
            this.postdata = data[Math.floor(Math.random() * data.length)];;
        });          

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given the user is in the home page      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it("El usuario usa un tag", function () {
        //...y que soy un usuario administrador e ingreso a la página de administradores y navego hasta el listado de tags y busco el tag que quiero usar
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToTags(escenario, '3_tags');
        this.tagpage.getLastTag();
        cy.get('@tag').then((tag) => {
            //When **Cuando** reo un nuevo post, uso el tag en la creación del post, voy al home del sitio y navego hacia el post
            cy.log('tag a usar:'+tag);
            this.page.navigateToNewPost(escenario, '4_newpost');
            const title = this.postdata.post_title.substring(0, 200);
            this.postPage.selectTag(tag, escenario, '5_selecttag');
            this.postPage.fillandSavePostForm(title, this.postdata.post_content.substring(0,500), escenario, '6_fillform');           
            this.postPage.publishPost(escenario, '7_publishpost');
            this.postPage.backtoDashBoard(escenario, '8_backtodashboard');
            this.page.logout(escenario, '9_logout'); 

            //Then **Entonces** el tag debe existir dentro de los tags de la publicación
            this.sitePage.verifyTagExistsInPost(tag, escenario, '10_verify');
        });
    });

});