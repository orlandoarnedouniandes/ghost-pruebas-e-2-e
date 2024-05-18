
const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");
const TagPage = require("../pageobjects/tagpage");

context("ModifyDescription",function () {
  let escenario = 'escenario18';

  beforeEach(function () {
    this.page = new Page();
    this.tags = new TagPage();
    this.sitepage = new SitePage();

    cy.fixture("ghost_general.json").then((data) => {
      this.contentdata = data[Math.floor(Math.random() * data.length)];
    });

    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      //Given      
      this.page.visit(this.data.url,escenario,'1_home');
    });  
  });

  it("User wants to modify description of General information",function (){         
    //Given
    this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
    this.tags.navigateToSettingsAndSelectGeneral(escenario, '3_settings');

    //When
    let description = '';
    this.tags.editDescriptionAndSave(description,escenario, '4_editdescription');
    this.page.visit(this.data.url, escenario, '5_home');

    //Then
    this.sitepage.verifyDescriptionDoesntExist(description, escenario, '6_verify');
  });
});