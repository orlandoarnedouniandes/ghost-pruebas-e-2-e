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
            //Given the user is in the home page
            this.page.visit(this.data.url, escenario, '1_home');
            });
        }

    });

    it.skip("El usuario despublica una página",function () {
        //Given the user logs in and navigates to a specific published page
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToPages(escenario, '3_pages');
        this.pageObject.findPublishedPage(); 
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title,escenario,'4_specificpage');

            //When the user unpublishes the page and goes back to pages
            this.pageObject.unpublishPage(escenario,'5_unpublishpage');
            this.page.navigateToPages(escenario, '6_pages');

            //Then the user verify the page does not exist
            this.pageObject.verifyPageIsDraft(title,escenario,'7_verify');
        }); 
    });
});