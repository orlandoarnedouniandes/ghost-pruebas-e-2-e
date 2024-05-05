/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("UpdateTitle", function () {
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given      
            this.page.visit(this.data.url);
        });
    });

    it("El usuario actualiza el titulo del sitio", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password);
        
        //When
        const title = this.page.getRandomTitle(this.data.title);
        this.page.updateTitle(title);
        this.page.logout();
        cy.visit(this.data.url);
        
        //Then
        this.sitePage.verifyTitle(title);

    });

});

