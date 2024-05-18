/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PageObject = require("../pageobjects/pagepage");

context("CreatePage", function () {
  let escenario='escenario47';
  beforeEach(function () {
    this.page = new Page();
    this.pageObject = new PageObject();

    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      //Given the user is in the home page
      this.page.visit(this.data.url,escenario,'1_home');
    });
  });

  it.skip("aleatorio - El usuario crea una página",function (){
    //Given the user is logged as Admin and navigate to the pages
    this.page.loginAdmin(this.data.username, this.data.password, escenario,'2_login');
    this.page.navigateToNewPage(escenario,'3_newpage');

    //When the user get a random title and content
    const title = faker.lorem.sentence();
    const content = faker.lorem.sentence();
    // and the user fill the form and save it and back to pages
    this.pageObject.fillandSavePageForm(title, content,'4_fillform');
    this.pageObject.backtoPages(escenario,'5_backtopages');

    //Then the user verify the page was created as a draft
    this.pageObject.verifylastPageTitleandDraft(title,escenario,'6_verify');
  });
});
