/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");


context("CreateTag", function () {
    let escenario = 'escenario11';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();

        cy.viewport('iphone-6');

        cy.fixture("ghost_tag.json").then((data) => {
            this.tagdata = data[Math.floor(Math.random() * data.length)];;
        });

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given the user is in the home page      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it("El usuario crea un tag", function () {
        //Given the user logs in and navigates to new tag
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToNewTag(escenario, '3_newtag');
    
        //When the user fills and saves the tag form and goes back to tags
        const title = this.page.getRandomTagTitle(this.tagdata.tag);
        this.tagpage.fillandSaveTagForm(title, this.tagdata.color, escenario, '4_fillform');
        this.page.backtoTags(escenario, '5_backtotags');
    
        //Then the user verify the tag was created
        this.tagpage.verifyTagExists(title, escenario, '6_verify');
    });

});