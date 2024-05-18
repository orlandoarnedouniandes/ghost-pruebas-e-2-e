/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");


context("CreateTag", function () {
    let escenario = 'escenario84';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given the user is in the home page      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it.skip("aleatorio -El usuario crea un tag", function () {
        //Given the user is logged as Admin and navigate to the tags
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToNewTag(escenario, '3_newtag');
    
        //When the user get a random tag and color
        const tag = faker.lorem.sentence();
        const color = faker.internet.color();
        const colorWithoutHash = color.replace('#', '');
        // and the user fill the form and save it
        this.tagpage.fillandSaveTagForm(tag, colorWithoutHash, escenario, '4_fillform');
        this.page.backtoTags(escenario, '5_backtotags');
    
        //Then the user verify the tag was created
        this.tagpage.verifyTagExists(tag, escenario, '6_verify');
    });

});