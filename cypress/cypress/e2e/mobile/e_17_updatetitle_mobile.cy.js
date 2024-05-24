/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("UpdateTitle", function () {
    let escenario = 'escenario17';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();
        //Given **Dado** que soy un usuario de teléfono IPhone
        cy.viewport('iphone-se2');
        
        cy.fixture("ghost.json").then((data) => {
            this.data = data;     
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("El usuario actualiza el titulo del sitio", function () {
        //...y que soy un administrador del sitio y accedo a la página de inicio de sesión de Ghost, luego de autenticarme,
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        
        //When **Cuando** actualizo el título del sitio
        const title = this.page.getRandomTitle(this.data.title);
        this.page.updateTitle(title, escenario, '3_updatetitle');
        this.page.logout(escenario, '4_logout');

        //Then **entonces** el campo de titulo del sitio debería mostrar el titulo actualizado
        this.sitePage.verifyTitle(title, escenario, '5_verify');
    });

});

