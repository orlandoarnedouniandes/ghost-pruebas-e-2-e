/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");
const SitePage = require("./pageobjects/sitepage");

context("PublishPage", function () {
    beforeEach(function () {
      this.page = new Page();
      this.pageObject = new PageObject();
      this.sitePage = new SitePage();
  
      cy.fixture("ghost.json").then((data) => {
        cy.log('Data: '+data.url );
        this.data = data;
        //Given      
        this.page.visit(this.data.url);
      });
    });
  
    it("El usuario publica una página", function () {
      //Given
      this.page.loginAdmin(this.data.username, this.data.password);
      this.page.navigateToPages();    
      this.pageObject.findDraftPage(); 
      cy.get('@pageTitle').then((title) => {
        this.pageObject.navigateToSpecificPage(title);

      //When 
      this.pageObject.publishPage();
      this.pageObject.backtoDashBoard();
      this.page.logout();  
      this.page.visit(this.data.url);

      //Then
      this.sitePage.verifyifPageExists(this.data.url, title);
      });
    });

  });