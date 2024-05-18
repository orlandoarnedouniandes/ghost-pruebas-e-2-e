/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("AddLink", function () {
    let escenario = 'escenario113';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();
        
        cy.fixture("ghost_general.json").then((data) => {
            this.contentdata = data[Math.floor(Math.random() * data.length)];
        });

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given the user is in the home page      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("A priori - El usuario añade un enlace", function () {
        //Given the user is logged as Admin
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        
        //When the user gets a link from priori data
        const link = this.contentdata.link;
        // and the user fill the form and save it
        this.page.addLink(link, escenario, '3_addlink');
        // and the user logout
        this.page.logout(escenario, '4_logout');        
        
        //Then the user verify the link was added
        this.sitePage.verifyLink(link,escenario, '5_verify');

    });

});