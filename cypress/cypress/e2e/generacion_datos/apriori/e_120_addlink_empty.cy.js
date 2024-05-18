/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("AddLink", function () {
    let escenario = 'escenario19';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;

            //Given the user is in the home page   
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("A priori - El usuario añade un enlace", function () {
        //Given the user is logged as Admin
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        
        //When the user gets an empty link    
        let link = '';    
        // and the user fill the form and save it
        this.page.addLinkEmpty(link,escenario, '3_addlink');   
        
        //Then the user verify an error message is displayed
        this.page.verifyLinkEmpty(link,escenario, '5_verify');

    });

});