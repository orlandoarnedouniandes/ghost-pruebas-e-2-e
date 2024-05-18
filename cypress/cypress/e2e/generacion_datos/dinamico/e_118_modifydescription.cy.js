
const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");

context("ModifyDescription",function () {
  let escenario = 'escenario18';

  beforeEach(function () {
    this.page = new Page();
    this.tags = new TagPage();

    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      
      cy.request('GET', this.data.api_ghost).then((response) => {
        this.ghostdata = response.body;
      });
      //Given      
      this.page.visit(this.data.url,escenario,'1_home');
    });  
  });

  it("User wants to modify description of General information",function (){         
    //Given
    this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
    this.tags.navigateToSettingsAndSelectGeneral(escenario, '3_settings');

    //When
    let description = this.ghostdata.descripcion_large;
    this.tags.editDescriptionAndSave(description,escenario, '4_editdescription');

    //Then
    this.page.verifyDescriptionIsTooLong(description, escenario, '6_verify');
  });
});