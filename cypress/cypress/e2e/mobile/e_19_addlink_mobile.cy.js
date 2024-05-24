/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("AddLink", function () {
    let escenario = 'escenario19';
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

    it("El usuario añade un enlace", function () {
        //...y que soy un administrador del sitio y accedo a la página de inicio de sesión de Ghost, luego de autenticarme, y navegar hasta la pestaña de "Configuración" y luego a la página de navegacion
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        
        //When **Cuando** adiciono un link secundario
        const link = this.page.getRandomLink(this.data.link);
        this.page.addLink(link, escenario, '3_addlink');
        this.page.logout(escenario, '4_logout');        
        
        //Then **entonces** debo poder ver el link adicionado
        this.sitePage.verifyLink(link,escenario, '5_verify');

    });

});