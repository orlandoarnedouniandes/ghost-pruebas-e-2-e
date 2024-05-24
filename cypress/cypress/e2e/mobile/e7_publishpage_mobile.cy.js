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
      //Given: **Dado**  que soy un usuario de teléfono IPhone
      cy.viewport('iphone-se2');
      
      cy.fixture("ghost.json").then((data) => {
        cy.log('Data: '+data.url );
        this.data = data;   
        this.page.visit(this.data.url, escenario,'1_home');
      });
    });
  
    it("El usuario publica una página", function () {
      //...y que soy un usuario administrador del sitio e ingreso a la página de administradores, navego hasta el listado de páginas y busco una página en estado DRAFT
      this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
      this.page.navigateToPages(escenario,'3_pages');    
      this.pageObject.findDraftPage(); 
      cy.get('@pageTitle').then((title) => {
        this.pageObject.navigateToSpecificPage(title, escenario,'4_specificpage');

      //When: **Cuando** hago uso de la funcionalidad publicar, y voy al home del listado de páginas
      this.pageObject.publishPage(escenario,'5_publishpage');
      this.pageObject.backtoPages(escenario,'6_pages');

      //Then:  **Entonces** la página debe quedar en estado PUBLISHED
      this.pageObject.verifylastPageTitleandPublished(title,escenario,'6_verify');
      });
    });

  });