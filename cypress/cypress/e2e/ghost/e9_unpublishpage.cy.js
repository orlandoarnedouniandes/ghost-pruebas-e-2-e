/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");

context("UnpublishPage",function () {
    let escenario = 'escenario9';
    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given
            this.page.visit(this.data.url, escenario, '1_home');
            });
        }

    });

    it("El usuario despublica una página",function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToPages(escenario, '3_pages');
        this.pageObject.findPublishedPage(); 
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title,escenario,'4_specificpage');

            //When
            this.pageObject.unpublishPage(escenario,'5_unpublishpage');
            this.page.navigateToPages(escenario, '6_pages');

            //Then
            this.pageObject.verifyPageIsDraft(title,escenario,'7_verify');
        }); 
    });
});