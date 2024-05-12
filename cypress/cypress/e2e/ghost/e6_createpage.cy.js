/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");

context("CreatePage", function () {
  let escenario='escenario6';
  beforeEach(function () {
    this.page = new Page();
    this.pageObject = new PageObject();

    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      //Given      
      this.page.visit(this.data.url,escenario,'1_home');
    });
  });

  it("El usuario crea una página",function (){
    //Given
    this.page.loginAdmin(this.data.username, this.data.password, escenario,'2_login');
    this.page.navigateToNewPage(escenario,'3_newpage');

    //When
    const title = this.page.getRandomPostTitle(this.data.page.title);
    this.pageObject.fillandSavePageForm(title, this.data.page.content,escenario,'4_fillform');
    this.pageObject.backtoPages(escenario,'5_backtopages');

    //Then
    this.pageObject.verifylastPageTitleandDraft(title,escenario,'6_verify');
  });
});
