/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");

context("UpdatePage",function () {
    
    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given
            this.page.visit(this.data.url);
            });
        }

    });

    it("El usuario actualiza una página",function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password);
        this.page.navigateToPages();
        this.pageObject.findfirstpage(); 
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title);

            //When
            const newTitle = this.page.getRandomPostTitle(this.data.page.title);
            this.pageObject.fillandSavePageForm(newTitle, this.data.post.content);
            this.pageObject.editPage();
            this.page.navigateToPages();

            //Then
            this.pageObject.verifylastPageTitle(newTitle);
        }); 
    });
});