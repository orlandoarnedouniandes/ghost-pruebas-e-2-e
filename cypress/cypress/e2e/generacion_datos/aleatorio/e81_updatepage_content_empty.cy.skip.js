/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PageObject = require("../pageobjects/pagepage");
const SitePage = require("../pageobjects/sitepage");

function generateEmptyData() {
    return ''; // Retorna una cadena vacía
}

context("UpdatePage", function () {
    let escenario = 'e_81_updatepage_content_empty';

    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();
        this.SitePage = new SitePage();

        if (this.data === undefined) {
            cy.fixture("ghost.json").then((data) => {
                this.data = data;
                // Given the user is in the home page
                this.page.visit(this.data.url, escenario, '1_home');
            });
        }
    });

    it("aleatorio - El usuario actualiza una página content empty - Aleatorio", function () {
        // Given the use is logged as Admin and navigate to the pages
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_empty_login');
        this.page.navigateToPages(escenario, '3_empty_pages');
        // and the user identity the page to update
        this.pageObject.findfirstpage();

        cy.get('@pageTitle').then((data) => {
            // and the user navigate to the page
            this.pageObject.navigateToSpecificPage(data, escenario, '4_empty_specificpage');

            // When the user gets a random title and empty content
            const newTitle = faker.lorem.sentence();
            const newContent = generateEmptyData();

            // and the user fill the form and save it and back to pages
            this.pageObject.fillandSavePageEmptyContent(newTitle, escenario, '5_empty_fillform');
            this.pageObject.backtoPages(escenario, '6_backtopages');

            // Then the user verify the page was updated as a draft
            this.pageObject.verifylastPageTitleandDraft(newTitle, escenario, '7_verify');
        });
    });
});

