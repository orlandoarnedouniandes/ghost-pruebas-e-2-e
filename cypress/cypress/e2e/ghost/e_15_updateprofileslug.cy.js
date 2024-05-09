/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("UpdateProfileSlug", function () {
    let escenario = 'escenario15';

    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("El usuario actualiza su pagina de autor", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToProfile(escenario, '3_profile');
        
        //When
        const slug = this.page.getRandomSlug(this.data.profile.slug);
        this.page.updateProfileSlug(slug, escenario, '5_updateprofile');
        this.page.logout(escenario, '6_logout');
        
        //Then
        this.sitePage.verifyifPageExists(this.data.url, 'author/'+slug, escenario, '7_verify');
    });
});