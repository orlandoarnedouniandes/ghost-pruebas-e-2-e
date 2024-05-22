/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PageObject = require("../pageobjects/pagepage");
const SitePage = require("../pageobjects/sitepage");

function generateEmptyData() {
    return ''; // Retorna una cadena vacía
}

context("UpdatePage", function () {
    let escenario = 'e_82_updatepage_title_empty';

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

    it("aleatorio - El usuario actualiza una página title empty - Aleatorio", function () {
        // Given the use is logged as Admin and navigate to the pages
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_empty_login');
        this.page.navigateToPages(escenario, '3_empty_pages');
        // and the user identity the page to update
        this.pageObject.findfirstpage();

        cy.get('@pageTitle').then((data) => {
            // and the user navigate to the page
            this.pageObject.navigateToSpecificPage(data, escenario, '4_empty_specificpage');

            // When the user gets a empty title and random content
            const newTitle = generateEmptyData();
            const newContent = faker.lorem.sentence();

            // and the user fill the form and save it and back to pages
            this.pageObject.fillandSavePageEmptyTitle(newContent, escenario, '5_empty_fillform');
            this.pageObject.backtoPages(escenario, '6_backtopages');

            // Then the user verify the page was updated as a draft and as untlitled
            this.pageObject.verifylastPageTitleandDraft('(Untitled)', escenario, '7_verify');
        });
    });
});

