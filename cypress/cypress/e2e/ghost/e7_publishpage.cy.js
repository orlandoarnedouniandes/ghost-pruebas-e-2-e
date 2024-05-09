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
        //Given      
        this.page.visit(this.data.url, escenario,'1_home');
      });
    });
  
    it("El usuario publica una página", function () {
      //Given
      this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
      this.page.navigateToPages(escenario,'3_pages');    
      this.pageObject.findDraftPage(); 
      cy.get('@pageTitle').then((title) => {
        this.pageObject.navigateToSpecificPage(title, escenario,'4_specificpage');

      //When 
      this.pageObject.publishPage(escenario,'5_publishpage');
      this.pageObject.backtoDashBoard(escenario,'6_dashboard');
      this.page.logout(escenario,'7_logout');

      //Then
      this.sitePage.verifyifPageExists(this.data.url, title, escenario,'8_verify');
      });
    });

  });