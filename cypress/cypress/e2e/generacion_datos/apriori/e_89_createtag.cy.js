/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");


context("CreateTag", function () {
    let escenario = 'escenario11';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();

        cy.fixture("ghost_tag.json").then((data) => {
            this.tagdata = data[Math.floor(Math.random() * data.length)];;
        });

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
        const title = this.tagdata.tag;
        const color = this.tagdata.color;
        const slug = this.tagdata.tag;
        const description = this.tagdata.description;
        this.tagpage.fillandSaveTagForm(title, color,slug,description, escenario, '4_fillform');
        this.page.backtoTags(escenario, '5_backtotags');
    
        //Then
        this.tagpage.verifyTagExists(title, escenario, '6_verify');
    });

});