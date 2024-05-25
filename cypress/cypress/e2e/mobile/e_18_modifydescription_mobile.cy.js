
const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");

context("ModifyDescription",function () {
  let escenario = 'escenario18';

  beforeEach(function () {
    this.page = new Page();
    this.tags = new TagPage();
    
    //Given **Dado** que soy un usuario de teléfono IPhone
    cy.viewport('iphone-se2');

    cy.fixture("ghost_general.json").then((data) => {
      this.contentdata = data[Math.floor(Math.random() * data.length)];
    });

    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      this.page.visit(this.data.url,escenario,'1_home');
    });  
  });

  it("User wants to modify description of General information",function (){         
    //...y que soy un usuario administrador del sitio e ingreso a la página de administradores y navego hasta por las configuraciones hasta la sección General
    this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
    this.tags.navigateToSettingsAndSelectGeneral(escenario, '3_settings');

    //When **Cuando** ingreso, modifico la descripción del sitio y guardo
    let description = this.contentdata.descripcion.substring(0, 200);
    cy.log('Description: '+description);
    this.tags.editDescriptionAndSave(description,escenario, '4_editdescription');
    this.page.visit(this.data.url, escenario, '5_home');

    //Then **Entonces** navego al home de la página y debería estar cambiada la descripción
    this.tags.verifyDescription(description, escenario, '6_verify');
  });
});