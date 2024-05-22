/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("UpdateProfileSlug", function () {
    let escenario = 'escenario133';

    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given  the user is in the home page     
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("A priori - El usuario actualiza su pagina de autor", function () {
        //Given the user is in the home page and navigates to profile
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToProfile(escenario, '3_profile');
        
        //When the user updates the slug with an empty value
        const slug = '';
        this.page.updateProfileSlug(slug, escenario, '5_updateprofile');
        // and the user goes to the profile page
        this.page.navigateToProfile(escenario, '3_profile');
        
        //Then the user verify the profile is not updated
        this.page.profileisNotEmpty(escenario, '7_verify');
    });
});