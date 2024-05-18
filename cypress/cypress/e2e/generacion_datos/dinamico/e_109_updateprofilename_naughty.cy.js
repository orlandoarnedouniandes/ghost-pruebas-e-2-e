/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("UpdateProfileName", function () {
    let escenario = 'escenario1609';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;

            cy.request('GET', this.data.api_slug_dinamico).then((response) => {
                this.profiledata = response.body;
            });

            //Given the user is in the home page     
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("Dinamico - El usuario actualiza su nombre de autor", function () {
        //Given the user is in the home page and navigates to profile
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToProfile(escenario, '3_profile');
        
        //When the user updates the name with a dynamic value and logs out
        const name = this.profiledata.slug_naughty;
        this.page.updateProfileName(name, escenario, '5_updateprofile');
        cy.get('@slug').then((slug) => {
            cy.log('Slug: '+slug);
            this.page.logout(escenario, '6_logout');
            
            //Then the user verify the author page and the name is updated
            this.page.visit(this.data.url+'author/'+slug, escenario, '7_authorpage');
            this.sitePage.verifyIfUserNameIsDisplayed(name, escenario, '8_verify');
        });
    });
});