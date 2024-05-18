/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PageObject = require("../pageobjects/pagepage");
const SitePage = require("../pageobjects/sitepage");

function generateSpecialCharactersTitle(length) {
    const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';
    let result = '';
    const charactersLength = specialCharacters.length;
    for (let i = 0; i < length; i++) {
        result += specialCharacters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

context("UpdatePage", function () {
    let escenario = 'e_100_updatepage_title_especial';

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

    it("El usuario actualiza una página (title, content) - faker", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToPages(escenario, '3_pages');
        this.pageObject.findfirstpage();

        cy.get('@pageTitle').then((data) => {
            this.pageObject.navigateToSpecificPage(data, escenario, '4_specificpage');

            //When
            const newTitle = generateSpecialCharactersTitle(100); 
            const newContent = faker.lorem.sentence();

            this.pageObject.fillandSavePageForm(newTitle, newContent, escenario, '5_fillform');
            this.pageObject.backtoPages(escenario, '6_backtopages');

            //Then
            this.pageObject.verifylastPageTitleandDraft(newTitle, escenario, '7_verify');
        });
    });

});
