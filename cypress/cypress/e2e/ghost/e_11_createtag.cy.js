/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");


context("CreateTag", function () {
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given      
            this.page.visit(this.data.url);
        });
    });
    
    it("El usuario crea un tag", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password);
        this.page.navigateToNewTag();
    
        //When
        const title = this.page.getRandomTagTitle(this.data.tag.name);
        this.tagpage.fillandSaveTagForm(title, this.data.tag.color);
        this.page.backtoTags();
    
        //Then
        this.tagpage.verifyTagExists(title);
    });

});