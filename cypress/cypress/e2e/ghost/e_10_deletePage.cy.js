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

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given
            this.page.visit(this.data.url, escenario, '1_home');
            });
        }

    });

    it("El usuario elimina una página",function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToPages(escenario, '3_pages');
        this.pageObject.findfirstpage();
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title,escenario,'4_specificpage');

            //When
            this.pageObject.deletePage(escenario,'5_deletepage');
            this.page.navigateToPages(escenario, '6_pages');

            //Then
            this.pageObject.verifyPageTitleDoesNotExist(title,escenario,'7_verify');
        }); 
    });
});