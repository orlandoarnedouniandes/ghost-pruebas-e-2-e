/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");
const SitePage = require("./pageobjects/sitepage");

context("PublishPage", function () {
    let escenario='escenario7';

    beforeEach(function () {
      this.page = new Page();
      this.pageObject = new PageObject();
      this.sitePage = new SitePage();
      cy.viewport('iphone-6');
      cy.fixture("ghost.json").then((data) => {
        cy.log('Data: '+data.url );
        this.data = data;
        //Given  the user is in the home page     
        this.page.visit(this.data.url, escenario,'1_home');
      });
    });
  
    it("El usuario publica una página", function () {
      //Given the user logs in and navigates to a specific drafted page
      this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
      this.page.navigateToPages(escenario,'3_pages');    
      this.pageObject.findDraftPage(); 
      cy.get('@pageTitle').then((title) => {
        this.pageObject.navigateToSpecificPage(title, escenario,'4_specificpage');

      //When the user publishes the page and goes back to dashboard and logs out
      this.pageObject.publishPage(escenario,'5_publishpage');
      this.pageObject.backtoPages(escenario,'6_pages');

      //Then the user verify the page is published
      this.pageObject.verifylastPageTitleandPublished(title,escenario,'6_verify');
      });
    });

  });