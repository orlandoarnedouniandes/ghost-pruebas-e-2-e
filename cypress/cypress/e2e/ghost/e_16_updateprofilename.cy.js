/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("UpdateProfileName", function () {
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given      
            this.page.visit(this.data.url);
        });
    });

    it("El usuario actualiza su nombre de autor", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password);
        this.page.navigateToProfile();
        
        //When
        const name = this.page.getRandomName(this.data.profile.name);
        this.page.updateProfileName(name);
        cy.get('@slug').then((slug) => {
            cy.log('Slug: '+slug);
            this.page.logout();
            
            //Then
            this.page.visit(this.data.url+'author/'+slug);
            this.sitePage.verifyIfUserNameIsDisplayed(name);
        });
    });
});