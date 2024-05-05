
const Page = require("./pageobjects/page");
const Tags = require("./pageobjects/tags");

context("DeleteTag",function () {
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

  it("User wants to delete a tag",function (){   
    //Given      
    this.page.loginAdmin(this.data.username, this.data.password);
    this.tags.navigateToTagsAndSelectTag();

    //When
    let slug = this.tags.deleteTag();
    this.tags.backToTags();

    //Then
    this.tags.verifyTagNotExist(slug);
  });
});