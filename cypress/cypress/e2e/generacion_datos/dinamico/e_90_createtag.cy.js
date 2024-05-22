/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");


context("CreateTag", function () {
    let escenario = 'escenario90';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            
            cy.request('GET', this.data.api_tag_dinamico).then((response) => {
                this.tagdata = response.body;
            });
            
            //Given the user is in the home page     
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it("Dinamico - El usuario crea un tag", function () {
        //Given the user logs in and navigates to new tag
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToNewTag(escenario, '3_newtag');
    
        //When the user fills the form with a title and color from dynamic data and back to tags
        const title = this.tagdata.tag;
        const color = this.tagdata.color.replace('#', '');
        const slug = this.tagdata.tag;
        const description = this.tagdata.description;
        this.tagpage.fillandSaveTagForm(title, color,slug,description, escenario, '4_fillform');
        this.page.backtoTags(escenario, '5_backtotags');
    
        //Then the user verify the tag is created
        this.tagpage.verifyTagExists(title, escenario, '6_verify');
    });

});