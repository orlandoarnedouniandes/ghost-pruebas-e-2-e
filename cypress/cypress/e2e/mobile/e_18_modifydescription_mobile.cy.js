
const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");

context("ModifyDescription",function () {
  let escenario = 'escenario18';

  beforeEach(function () {
    this.page = new Page();
    this.tags = new TagPage();
    cy.viewport('iphone-6');
    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      //Given the user is in the home page      
      this.page.visit(this.data.url,escenario,'1_home');
    });  
  });

  it("User wants to modify description of General information",function (){         
    //Given the user logs in and navigates to settings
    this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
    this.tags.navigateToSettingsAndSelectGeneral(escenario, '3_settings');

    //When the user updates the description with a random value and visits the page
    let description = this.tags.editDescriptionAndSave(escenario, '4_editdescription');
    this.page.visit(this.data.url, escenario, '5_home');

    //Then the user verify the description is updated
    this.tags.verifyDescription(description, escenario, '6_verify');
  });
});