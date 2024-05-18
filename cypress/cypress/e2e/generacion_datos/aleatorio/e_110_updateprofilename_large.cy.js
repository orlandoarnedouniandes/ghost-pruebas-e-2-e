/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");

context("Profile", function () {
    let escenario = 'escenario16';
    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given the user is in the home page      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("aleatorio - El usuario actualiza su nombre de autor con un texto muy largo", function () {
        //Given the user is logged as Admin and navigate to the profile
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToProfile(escenario, '3_profile');
        
        //When the user get a random name
        const name = faker.lorem.paragraphs(5).substring(0, 1000);
        // and the user fill the form and save it
        this.page.updateProfileName(name, escenario, '4_updateprofile');

        //Then the user gets an error message due to the name is too long
        this.page.verifyIGetTheErrorNameTooLong(escenario, '5_verify');
    });
});