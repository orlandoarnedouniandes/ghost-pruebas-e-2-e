/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PageObject = require("../pageobjects/pagepage");
const SitePage = require("../pageobjects/sitepage");

context("UpdatePage", function () {
    let escenario = 'e_80_updatepage';

    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();
        this.SitePage = new SitePage();

        if (this.data === undefined) {
            cy.fixture("ghost.json").then((data) => {
                this.data = data;
                //Given the user is in the home page
                this.page.visit(this.data.url, escenario, '1_home');
            });
        }
    });

    it("aleatorio - El usuario actualiza una página (title, content) - faker", function () {
        //Given the user is a logged as Admin and navigate to the pages
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToPages(escenario, '3_pages');
        this.pageObject.findfirstpage();

        cy.get('@pageTitle').then((data) => {
            this.pageObject.navigateToSpecificPage(data, escenario, '4_specificpage');

            //When the user get a random title and content
            const newTitle = faker.lorem.sentence();
            const newContent = faker.lorem.sentence();
            // and the user fill the form and save it
            this.pageObject.fillandSavePageForm(newTitle, newContent, escenario, '5_fillform');
            this.pageObject.backtoPages(escenario, '6_backtopages');

            //Then the user verify the post was created as a draft
            this.pageObject.verifylastPageTitleandDraft(newTitle, escenario, '7_verify');
        });
    });

});