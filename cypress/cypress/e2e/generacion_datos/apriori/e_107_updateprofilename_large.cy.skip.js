/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("UpdateProfileName", function () {
    let escenario = 'escenario107';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost_slug.json").then((data) => {
            this.profiledata = data[87];
        });

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given the user is in the home page      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("A priori - El usuario actualiza su nombre de autor", function () {
        //Given the user is logged as Admin and navigate to the profile
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToProfile(escenario, '3_profile');
        
        //When the user  gets a large name from priori data 
        const name = this.profiledata.slug_big;
        // and the user fill the form and save it
        this.page.updateProfileName(name, escenario, '4_updateprofile');

        //Then yhe user verify that gets an error message beacuse the name is too long
        this.page.verifyIGetTheErrorNameTooLong(escenario, '5_verify');
    });
});