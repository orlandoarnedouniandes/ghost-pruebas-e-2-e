/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const PageObject = require("../pageobjects/pagepage");

context("CreatePage", function () {
  let escenario='escenario97';
  beforeEach(function () {
    this.page = new Page();
    this.pageObject = new PageObject();

    cy.fixture("ghost_post_naughty.json").then((data) => {
      this.postdata = data[12];
    });
    
    
    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      //Given the user is in the home page     
      this.page.visit(this.data.url,escenario,'1_home');
    });
  });

  it("A priori - El usuario crea una página",function (){
    //Given the user is in the home page and logs in and navigates to new page
    this.page.loginAdmin(this.data.username, this.data.password, escenario,'2_login');
    this.page.navigateToNewPage(escenario,'3_newpage');

    //When the user fills the form with a title and content from priori data and back to pages
    const title = this.postdata.post_title;
    const content = this.postdata.post_content;
    this.pageObject.fillandSavePageForm(title, content,'4_fillform');
    this.pageObject.backtoPages(escenario,'5_backtopages');

    //Then the user verify the page is created with naughty words
    this.pageObject.verifylastPageTitleandDraft(title,escenario,'6_verify');
  });
});
