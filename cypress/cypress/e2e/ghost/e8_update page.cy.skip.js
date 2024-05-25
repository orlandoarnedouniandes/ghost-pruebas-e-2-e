/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");

context("UpdatePage",function () {
    let escenario='escenario8';
    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given the user is in the home page
            this.page.visit(this.data.url,escenario,'1_home');
            });
        }

    });

    it.skip("El usuario actualiza una página",function () {
        //Given the user logs in and navigates to a specific page
        this.page.loginAdmin(this.data.username, this.data.password, escenario,'2_login');
        this.page.navigateToPages(escenario,'3_pages');
        this.pageObject.findfirstpage(); 
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title, escenario,'4_specificpage');

            //When the user updates the page and goes back to pages
            const newTitle = this.page.getRandomPostTitle(this.data.page.title);
            this.pageObject.fillandSavePageForm(newTitle, this.data.post.content, escenario,'5_fillform');
            this.pageObject.editPage(escenario,'6_editpage');
            this.page.navigateToPages(escenario,'7_pages');

            //Then the user verify the page was updated
            this.pageObject.verifylastPageTitle(newTitle, escenario,'8_verify');
        }); 
    });
});