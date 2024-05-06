/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("AddLink", function () {
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given      
            this.page.visit(this.data.url);
        });
    });

    it("El usuario añade un enlace", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password);
        
        //When
        const link = this.page.getRandomLink(this.data.link);
        this.page.addLink(link);
        this.page.logout();
        cy.visit(this.data.url);
        
        //Then
        this.sitePage.verifyLink(link);

    });

});