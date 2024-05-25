/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");

context("CreatePage", function () {
  let escenario='escenario6';
  beforeEach(function () {
    this.page = new Page();
    this.pageObject = new PageObject();
    //Given **Dado** que soy un usuario de teléfono IPhone
    cy.viewport('iphone-se2');

    cy.fixture("ghost_post.json").then((data) => {
      this.postdata = data[Math.floor(Math.random() * data.length)];;
    });

    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;   
      this.page.visit(this.data.url,escenario,'1_home');
    });
  });

  it("El usuario crea una página",function (){
    //...y que como soy usuario administrador requiero la creación de una nueva página y navego hasta creación de páginas
    this.page.loginAdmin(this.data.username, this.data.password, escenario,'2_login');
    this.page.navigateToNewPage(escenario,'3_newpage');

    //When:  **Cuando** al ingresar, diligencio una nueva página ingresando título y contenido, al finalizar navego a lista de páginas
    const title = this.page.getRandomPostTitle(this.postdata.post_title.substring(0, 200));
    this.pageObject.fillandSavePageForm(title, this.postdata.post_content.substring(0,1000),'4_fillform');
    this.pageObject.backtoPages(escenario,'5_backtopages');

    //Then: **Entonces** debería ver la página en la lista de páginas en estado DRAFT
    this.pageObject.verifylastPageTitleandDraft(title,escenario,'6_verify');
  });
});
