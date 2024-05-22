
const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");

context("ModifyDescription",function () {
  let escenario = 'escenario112';

  beforeEach(function () {
    this.page = new Page();
    this.tags = new TagPage();

    cy.fixture("ghost_general.json").then((data) => {
      this.contentdata = data[Math.floor(Math.random() * data.length)];
    });

    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      //Given the user is in the home page    
      this.page.visit(this.data.url,escenario,'1_home');
    });  
  });

  it("A priori - User wants to modify description of General information",function (){         
    //Given the user is logged as Admin and navigate Settings and General
    this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
    this.tags.navigateToSettingsAndSelectGeneral(escenario, '3_settings');

    //When the user gets a description from priori data
    let description = this.contentdata.descripcion.substring(0, 200);
    // and the user fill the form and save it
    this.tags.editDescriptionAndSave(description,escenario, '4_editdescription');
    // and the user goes to the home page
    this.page.visit(this.data.url, escenario, '5_home');

    //Then the user verify the description was updated
    this.tags.verifyDescription(description, escenario, '6_verify');
  });
});