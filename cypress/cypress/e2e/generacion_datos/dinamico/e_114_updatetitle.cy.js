/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("UpdateTitle", function () {
    let escenario = 'escenario114';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;

            cy.request('GET', this.data.api_ghost).then((response) => {
                this.ghostdata = response.body;
            });
            
            //Given the user is in the home page
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("Dinamico - El usuario actualiza el titulo del sitio", function () {
        //Given the user logs in
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        
        //When the user updates the title with a dynamic value and logs out
        const title = this.ghostdata.titulo_naughty;
        this.page.updateTitle(title, escenario, '3_updatetitle');
        this.page.logout(escenario, '4_logout');

        //Then the user verify the title is updated
        this.sitePage.verifyTitle(title, escenario, '5_verify');
    });

});

