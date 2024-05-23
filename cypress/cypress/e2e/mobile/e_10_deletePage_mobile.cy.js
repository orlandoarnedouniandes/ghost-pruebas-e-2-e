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

        cy.viewport('iphone-6');
        
        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given the user is in the home page
            this.page.visit(this.data.url, escenario, '1_home');
            });
        }

    });

    it("El usuario elimina una página",function () {
        //Given the user logs in and navigates to the last page
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToPages(escenario, '3_pages');
        this.pageObject.findfirstpage();
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title,escenario,'4_specificpage');

            //When the user deletes the page and navigates to pages
            this.pageObject.deletePage(escenario,'5_deletepage');
            this.page.navigateToPages(escenario, '6_pages');

            //Then the user verify the page does not exist
            this.pageObject.verifyPageTitleDoesNotExist(title,escenario,'7_verify');
        }); 
    });
});