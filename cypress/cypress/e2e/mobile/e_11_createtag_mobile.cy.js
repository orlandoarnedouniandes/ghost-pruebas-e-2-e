/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");


context("CreateTag", function () {
    let escenario = 'escenario11';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();
        
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
    
    it("El usuario crea un tag", function () {
        //...y que soy un usuario administrador del sitio e ingreso a la página de administradores y navego hasta la creación de tags
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToNewTag(escenario, '3_newtag');
    
        //When **Cuando** ingreso nuevo tag indico nombre, color, slug y descripción, lo guardo y navego a la lista de tags
        const title = this.page.getRandomTagTitle(this.tagdata.tag);
        this.tagpage.fillandSaveTagForm(title, this.tagdata.color, escenario, '4_fillform');
        this.page.backtoTags(escenario, '5_backtotags');
    
        //Then **Entonces** debería ver el tag en la lista
        this.tagpage.verifyTagExists(title, escenario, '6_verify');
    });

});