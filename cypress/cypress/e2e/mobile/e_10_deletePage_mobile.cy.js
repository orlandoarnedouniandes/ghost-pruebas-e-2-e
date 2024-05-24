/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");
const SitePage = require("./pageobjects/sitepage");

context("DeletePage",function () {
    let escenario = 'escenario10';
    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();
        this.SitePage = new SitePage();
        //**Dado** que soy un usuario de teléfono IPhone
        cy.viewport('iphone-se2');        

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            this.page.visit(this.data.url, escenario, '1_home');
            });
        }

    });

    it("El usuario elimina una página",function () {
        //...y que soy un usuario administrador ingreso a la página de administradores navego hasta el listado de páginas, ingreso a la página que quiero eliminar, navego hasta settings y elimino la página
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToPages(escenario, '3_pages');
        this.pageObject.findfirstpage();
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title,escenario,'4_specificpage');

            //When **Cuando** elimino la página y vuelvo al home del listado de páginas
            this.pageObject.deletePage(escenario,'5_deletepage');
            this.page.navigateToPages(escenario, '6_pages');

            //Then **Entonces** la página no debe estar visible
            this.pageObject.verifyPageTitleDoesNotExist(title,escenario,'7_verify');
        }); 
    });
});