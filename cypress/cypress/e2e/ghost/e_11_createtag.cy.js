/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");


context("CreateTag", function () {
    let escenario = 'escenario11';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it("El usuario crea un tag", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToNewTag(escenario, '3_newtag');
    
        //When
        const title = this.page.getRandomTagTitle(this.data.tag.name);
        this.tagpage.fillandSaveTagForm(title, this.data.tag.color, escenario, '4_fillform');
        this.page.backtoTags(escenario, '5_backtotags');
    
        //Then
        this.tagpage.verifyTagExists(title, escenario, '6_verify');
    });

});