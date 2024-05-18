/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("UpdateProfileName", function () {
    let escenario = 'escenario16';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost_slug.json").then((data) => {
            this.profiledata = data[Math.floor(Math.random() * data.length)];
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
        
        //When the user  gets a name from priori data
        const name = this.profiledata.slug_naughty;
        // and the user fill the form and save it
        this.page.updateProfileName(name, escenario, '5_updateprofile');
        cy.get('@slug').then((slug) => {
            cy.log('Slug: '+slug);
            // and the user logout
            this.page.logout(escenario, '6_logout');
            
            //Then the user verify the name was updated and the user page is displayed
            this.page.visit(this.data.url+'author/'+slug, escenario, '7_authorpage');
            this.sitePage.verifyIfUserNameIsDisplayed(name, escenario, '8_verify');
        });
    });
});