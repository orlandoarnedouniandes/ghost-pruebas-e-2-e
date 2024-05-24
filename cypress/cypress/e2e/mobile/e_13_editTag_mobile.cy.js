/// <reference types="cypress" />


const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("EditTag", function () {
    let escenario = 'escenario13';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();
        this.postPage = new PostPage();
        this.sitePage = new SitePage();
        
        //Given **Dado** que soy un usuario de teléfono IPhone 
        cy.viewport('iphone-se2');

        cy.fixture("ghost_tag.json").then((data) => {
            this.tagdata = data[Math.floor(Math.random() * data.length)];;
        });

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;  
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it("El usuario edita un tag", function () {
        //...y que soy un usuario administrador del sitio e ingreso a la página de administradores y navego hasta la lista de tags
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToTags(escenario, '3_tags');
        this.tagpage.getLastTag();
        cy.get('@tag').then((tag) => {
            //When **Cuando** ingreso a un tag de la lista para editarlo, cambio el nombre del tag
            cy.log('tag a editar:'+tag);
            this.tagpage.navigateToSpecificTag(tag, escenario, '4_specifictag');
            const newTag = this.tagdata.tag;
            this.tagpage.updateTagForm(newTag, escenario, '5_updateform');
            this.page.backtoTags(escenario, '6_backtotags');
    
            //then **Entonces** debería ver el tag en la lista con el nuevo nombre asignado
            this.tagpage.verifyTagExists(newTag, escenario, '7_verify');
        });
    });

});