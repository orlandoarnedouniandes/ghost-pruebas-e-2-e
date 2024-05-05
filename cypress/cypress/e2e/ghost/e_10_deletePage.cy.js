/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");
const SitePage = require("./pageobjects/sitepage");

context("DeletePage",function () {

    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();
        this.SitePage = new SitePage();

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given
            this.page.visit(this.data.url);
            });
        }

    });

    it("El usuario elimina una página",function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password);
        this.page.navigateToPages();
        this.pageObject.findfirstpage();
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title);

            //When
            this.pageObject.deletePage();
            this.page.navigateToPages();

            //Then
            this.pageObject.verifyPageTitleDoesNotExist(title);
        }); 
    });
});