/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");


context("CreateTag", function () {
    let escenario = 'escenario11';
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
    
    it("A priori - El usuario crea un tag con el color vacio", function () {
        //Given the user is in the home page and logs in
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        // and the user navigates to tags
        this.page.navigateToNewTag(escenario, '3_newtag');
    
        //When the user gets a tag data from priori data and fills the form with an empty color
        const title = this.tagdata.tag;;
        const color = '';
        const slug = this.tagdata.tag;
        const description = this.tagdata.description.substring(0, 499);
        this.tagpage.fillandSaveTagForm(title, color,slug,description, escenario, '4_fillform');
        // and the user goes back to tags
        this.page.backtoTags(escenario, '5_backtotags');
    
        //Then the user verify the tag is created
        this.tagpage.verifyTagExists(title, escenario, '6_verify');
    });

});