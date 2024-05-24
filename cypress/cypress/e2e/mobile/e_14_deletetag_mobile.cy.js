/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");


context("DeleteTag", function () {
    let escenario = 'escenario14';
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
    
    it("El usuario elimina un tag", function () {
        //...y que soy un usuario administrador del sitio e ingreso a la página de administradores y navego hasta la lista de tags
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToNewTag(escenario, '3_newtag');
        const title = this.tagdata.tag;
        this.tagpage.fillandSaveTagForm(title, this.tagdata.color,escenario, '4_fillform');
        this.page.backtoTags(escenario, '5_backtotags');
        //When  **Cuando** ingreso a un tag de la lista para eliminarlo, doy clic en el botón el eliminar y confirmo su eliminación
        this.tagpage.navigateToSpecificTag(title, escenario, '6_specifictag');
        this.tagpage.deleteTag(escenario, '7_deletetag');

        //Then **Entonces** debería desaparecer el tag de la lista
        this.tagpage.verifyTagNotExists(title, escenario, '8_verify');
    });

});