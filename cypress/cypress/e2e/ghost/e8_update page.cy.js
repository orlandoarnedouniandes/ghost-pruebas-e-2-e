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
            //Given
            this.page.visit(this.data.url,escenario,'1_home');
            });
        }

    });

    it("El usuario actualiza una página",function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario,'2_login');
        this.page.navigateToPages(escenario,'3_pages');
        this.pageObject.findfirstpage(); 
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title, escenario,'4_specificpage');

            //When
            const newTitle = this.page.getRandomPostTitle(this.data.page.title);
            this.pageObject.fillandSavePageForm(newTitle, this.data.post.content, escenario,'5_fillform');
            this.pageObject.editPage(escenario,'6_editpage');
            this.page.navigateToPages(escenario,'7_pages');

            //Then
            this.pageObject.verifylastPageTitle(newTitle, escenario,'8_verify');
        }); 
    });
});