
const Page = require("./pageobjects/page");
const Tags = require("./pageobjects/tags");

context("ModifyTag",function () {
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

  it("User wants to modify a tag",function (){         
    //Given
    this.page.loginAdmin(this.data.username, this.data.password);
    this.tags.navigateToTagsAndSelectTag();

    //When
    let nameTitle = this.tags.editTitleAndSaveTag();
    this.tags.backToTags();

    //Then
    this.tags.verifyTag(nameTitle);
  });
});