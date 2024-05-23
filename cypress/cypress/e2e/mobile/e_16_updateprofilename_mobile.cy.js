/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("UpdateProfileName", function () {
    let escenario = 'escenario16';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.viewport('iphone-6');

        cy.fixture("ghost_slug.json").then((data) => {
            this.slug = data[Math.floor(Math.random() * data.length)];;
        });

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given the user is in the home page      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("El usuario actualiza su nombre de autor", function () {
        //Given the user logs in and navigates to profile
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToProfile(escenario, '3_profile');
        
        //When the user updates the name with a random value and logs out
        const name = this.slug.slug_normal;
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