/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");


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
        const title = faker.lorem.sentence();
        const color = faker.internet.color();
        this.tagpage.fillandSaveTagForm(title, color, escenario, '4_fillform');
        this.page.backtoTags(escenario, '5_backtotags');
    
        //Then
        this.tagpage.verifyTagExists(title, escenario, '6_verify');
    });

});