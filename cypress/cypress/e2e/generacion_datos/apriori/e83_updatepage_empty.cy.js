/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PageObject = require("../pageobjects/pagepage");
const SitePage = require("../pageobjects/sitepage");

context("UpdatePage", function () {
    let escenario = 'e_83_updatepage_empty';

    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();
        this.SitePage = new SitePage();

        if (this.data === undefined) {
            cy.fixture("ghost.json").then((data) => {
                this.data = data;
                //Given
                this.page.visit(this.data.url, escenario, '1_home');
            });
        }
    });

    it("El usuario actualiza una página title y content empty - Apriori", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_empty_login');
        this.page.navigateToPages(escenario, '3_empty_pages');
        this.pageObject.findfirstpage();

        cy.get('@pageTitle').then((data) => {
            this.pageObject.navigateToSpecificPage(data, escenario, '4_empty_specificpage');

            //When
            this.pageObject.fillandSavePageEmptyForm(escenario, '5_empty_fillform');
            this.pageObject.backtoPages(escenario, '6_empty_backtopages');

            //Then
            this.pageObject.verifylastPageTitleandDraft('(Untitled)', escenario, '7_empty_verify');
        });
    });
});