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
      //Given  the user is in the home page     
      this.page.visit(this.data.url,escenario,'1_home');
    });
  });

  it.skip("El usuario crea una página",function (){
    //Given the user logs in and navigates to new page
    this.page.loginAdmin(this.data.username, this.data.password, escenario,'2_login');
    this.page.navigateToNewPage(escenario,'3_newpage');

    //When the user fills and saves the page form and goes back to pages
    const title = this.page.getRandomPostTitle(this.data.page.title);
    this.pageObject.fillandSavePageForm(title, this.data.page.content,escenario,'4_fillform');
    this.pageObject.backtoPages(escenario,'5_backtopages');

    //Then the user verify the page was created and is in draft
    this.pageObject.verifylastPageTitleandDraft(title,escenario,'6_verify');
  });
});
