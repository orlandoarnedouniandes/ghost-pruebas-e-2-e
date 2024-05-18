/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");


context("DeleteTag", function () {
    let escenario = 'escenario14';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given  the user is in the home page     
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it.skip("El usuario elimina un tag", function () {
        //Given the user logs in and navigates to new tag
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToNewTag(escenario, '3_newtag');
        const title = this.page.getRandomTagTitle(this.data.tag.name);
        this.tagpage.fillandSaveTagForm(title, this.data.tag.color,escenario, '4_fillform');
        this.page.backtoTags(escenario, '5_backtotags');
        //When the user navigates to the tag and deletes it
        this.tagpage.navigateToSpecificTag(title, escenario, '6_specifictag');
        this.tagpage.deleteTag(escenario, '7_deletetag');

        //Then the user verify the tag was deleted
        this.tagpage.verifyTagNotExists(title, escenario, '8_verify');
    });

});