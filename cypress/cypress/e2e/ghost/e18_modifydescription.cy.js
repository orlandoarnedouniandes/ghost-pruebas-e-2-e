
const Page = require("./pageobjects/page");
const Tags = require("./pageobjects/tags");

context("ModifyDescription",function () {
  beforeEach(function () {
    this.page = new Page();
    this.tags = new Tags();

    cy.fixture("ghost.json").then((data) => {
      cy.log('Data: '+data.url );
      this.data = data;
      //Given      
      this.page.visit(this.data.url);
    });  
  });

  it("User wants to modify description of General information",function (){         
    //Given
    this.page.loginAdmin(this.data.username, this.data.password);
    this.tags.navigateToSettingsAndSelectGeneral();

    //When
    let description = this.tags.editDescriptionAndSave();
    this.page.visit(this.data.url);

    //Then
    this.tags.verifyDescription(description);
  });
});