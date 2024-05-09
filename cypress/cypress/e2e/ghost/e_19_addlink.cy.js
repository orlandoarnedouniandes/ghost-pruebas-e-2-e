/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("AddLink", function () {
    let escenario = 'escenario19';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("El usuario añade un enlace", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        
        //When
        const link = this.page.getRandomLink(this.data.link);
        this.page.addLink(link, escenario, '3_addlink');
        this.page.logout(escenario, '4_logout');        
        
        //Then
        this.sitePage.verifyLink(link,escenario, '5_verify');

    });

});