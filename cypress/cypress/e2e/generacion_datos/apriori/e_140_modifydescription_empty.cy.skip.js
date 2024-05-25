
const Page = require("../pageobjects/page");
const SitePage = require("../pageobjects/sitepage");
const TagPage = require("../pageobjects/tagpage");

context("ModifyDescription",function () {
  let escenario = 'escenario140';

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
      //Given the user is in the home page      
      this.page.visit(this.data.url,escenario,'1_home');
    });  
  });

  it("A priori - User wants to modify description of General information with an empty value",function (){         
    //Given the user is in the home page and logs in and navigates to settings
    this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
    this.tags.navigateToSettingsAndSelectGeneral(escenario, '3_settings');

    //When the user updates the description with an empty value
    let description = '';
    this.tags.editDescriptionAndSave(description,escenario, '4_editdescription');
    // and the user goes back to the home page
    this.page.visit(this.data.url, escenario, '5_home');

    //Then the user verify the description doesn't exist
    this.sitepage.verifyDescriptionDoesntExist(description, escenario, '6_verify');
  });
});