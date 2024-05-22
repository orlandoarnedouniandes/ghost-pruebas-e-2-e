/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");


context("CreateTag", function () {
    let escenario = 'escenario89';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();

        cy.fixture("ghost_tag.json").then((data) => {
            this.tagdata = data[Math.floor(Math.random() * data.length)];
        });

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given the user is in the home page     
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it("A priori - El usuario crea un tag", function () {
        //Given the user is logged as Admin and navigate to the tags
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToNewTag(escenario, '3_newtag');
    
        //When the user get a title, color, slug and description from priori data
        const title = this.tagdata.tag;
        const color = this.tagdata.color;
        const slug = this.tagdata.tag;
        const description = this.tagdata.description;
        // and the user fill the form and save it and back to tags
        this.tagpage.fillandSaveTagForm(title, color,slug,description, escenario, '4_fillform');
        this.page.backtoTags(escenario, '5_backtotags');
    
        //Then the user verify the tag was created
        this.tagpage.verifyTagExists(title, escenario, '6_verify');
    });

});