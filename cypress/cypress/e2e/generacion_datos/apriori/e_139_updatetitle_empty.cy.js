/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("UpdateTitle", function () {
    let escenario = 'escenario139';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost_general.json").then((data) => {
            this.contentdata = data[Math.floor(Math.random() * data.length)];
        });


        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given       
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("A priori - El usuario actualiza el titulo del sitio con un titulo vacio", function () {
        //Given the user is in the home page and logs in
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        
        //When the user updates the title with an empty value and logs out
        const title = '';
        this.page.updateTitleEmpty(title, escenario, '3_updatetitle');
        this.page.logout(escenario, '4_logout');

        //Then the user verify the title is updated
        this.sitePage.verifyTitle(title, escenario, '5_verify');
    });

});

