/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("AddLink", function () {
    let escenario = 'escenario20';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    it("El usuario elimina un enlace", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        
        //When
        this.page.removeLink(escenario,'3_removelink').then((link) => {
            cy.log('Link: '+link);
            this.page.logout(escenario, '4_logout');
        
            //Then
            this.sitePage.verifyLinkNotExists(link,escenario, '5_verify');
        });
    });
});