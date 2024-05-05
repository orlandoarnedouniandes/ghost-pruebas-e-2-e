/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");

context("UnpublishPage",function () {
    
    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given
            this.page.visit(this.data.url);
            });
        }

    });

    it("El usuario despublica una página",function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password);
        this.page.navigateToPages();
        this.pageObject.findPublishedPage(); 
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title);

            //When
            this.pageObject.unpublishPage();
            this.page.navigateToPages();

            //Then
            this.pageObject.verifyPageIsDraft(title);
        }); 
    });
});