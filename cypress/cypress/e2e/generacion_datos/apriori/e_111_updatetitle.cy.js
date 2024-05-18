/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("UpdateTitle", function () {
    let escenario = 'escenario17';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost_general.json").then((data) => {
            this.contentdata = data[Math.floor(Math.random() * data.length)];
        });

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given  the user is in the home page     
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("A priori - El usuario actualiza el titulo del sitio", function () {
        //Given the user is logged as Admin
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        
        //When the user gets a title from priori data
        const title = this.contentdata.titulo;
        // and the user fill the form and save it
        this.page.updateTitle(title, escenario, '3_updatetitle');
        // and the user logout
        this.page.logout(escenario, '4_logout');

        //Then the user verify the title was updated
        this.sitePage.verifyTitle(title, escenario, '5_verify');
    });

});

