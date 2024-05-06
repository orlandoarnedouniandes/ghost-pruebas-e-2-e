/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");

context("CreatePage", function () {
  beforeEach(function () {
    this.page = new Page();
    this.pageObject = new PageObject();

    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      //Given      
      this.page.visit(this.data.url);
    });
  });

  it("El usuario crea una página",function (){
    //Given
    this.page.loginAdmin(this.data.username, this.data.password);
    this.page.navigateToNewPage();

    //When
    const title = this.page.getRandomPostTitle(this.data.page.title);
    this.pageObject.fillandSavePageForm(title, this.data.page.content);
    this.pageObject.backtoPages();

    //Then
    this.pageObject.verifylastPageTitleandDraft(title);
  });
});
