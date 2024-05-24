/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");

context("UnpublishPage",function () {
    let escenario = 'escenario9';
    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();
        //Given **Dado** que soy un usuario de teléfono IPhone
        cy.viewport('iphone-se2');

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            this.page.visit(this.data.url, escenario, '1_home');
            });
        }

    });

    it("El usuario despublica una página",function () {
        //...y que soy un usuario administrador ingreso a la página de administradores y navego hasta el listado de páginas y busco la página que quiero despublicar
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToPages(escenario, '3_pages');
        this.pageObject.findPublishedPage(); 
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title,escenario,'4_specificpage');

            //When **Cuando** despublico la página y vuelvo al home del listado de páginas
            this.pageObject.unpublishPage(escenario,'5_unpublishpage');
            this.page.backToPages(escenario, '6_pages');

            //Then  **Entonces** la página debe estar en estado DRAFT
            this.pageObject.verifyPageIsDraft(title,escenario,'7_verify');
        }); 
    });
});