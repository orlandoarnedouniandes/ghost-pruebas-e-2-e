/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("UpdateProfileName", function () {
    let escenario = 'escenario16';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost_slug.json").then((data) => {
            this.profiledata = data[87];
        });

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("El usuario actualiza su nombre de autor", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToProfile(escenario, '3_profile');
        
        //When
        const name = this.profiledata.slug_big;
        this.page.updateProfileName(name, escenario, '5_updateprofile');

        //Then
        this.page.verifyIGetTheErrorNameTooLong(escenario, '6_verify');
    });
});