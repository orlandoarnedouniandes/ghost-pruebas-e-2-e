/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("UpdateProfileSlug", function () {
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given      
            this.page.visit(this.data.url);
        });
    });

    it("El usuario actualiza su pagina de autor", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password);
        this.page.navigateToProfile();
        
        //When
        const slug = this.page.getRandomSlug(this.data.profile.slug);
        this.page.navigateToProfile();
        this.page.updateProfileSlug(slug);
        this.page.logout();
        
        //Then
        this.sitePage.verifyifPageExists(this.data.url, 'author/'+slug);
    });
});