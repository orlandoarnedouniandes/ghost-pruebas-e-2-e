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
  
      cy.fixture("ghost.json").then((data) => {
        cy.log('Data: '+data.url );
        this.data = data;
        //Given  the user is in the home page     
        this.page.visit(this.data.url, escenario,'1_home');
      });
    });
  
    it.skip("El usuario publica una página", function () {
      //Given the user logs in and navigates to a specific drafted page
      this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
      this.page.navigateToPages(escenario,'3_pages');    
      this.pageObject.findDraftPage(); 
      cy.get('@pageTitle').then((title) => {
        this.pageObject.navigateToSpecificPage(title, escenario,'4_specificpage');

      //When the user publishes the page and goes back to dashboard and logs out
      this.pageObject.publishPage(escenario,'5_publishpage');
      this.pageObject.backtoDashBoard(escenario,'6_dashboard');
      this.page.logout(escenario,'7_logout');

      //Then the user verify the page was published
      this.sitePage.verifyifPageExists(this.data.url, title, escenario,'8_verify');
      });
    });

  });