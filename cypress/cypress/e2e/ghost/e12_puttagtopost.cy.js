
const Page = require("./pageobjects/page");
const Tags = require("./pageobjects/tags");

context("PutTagToPost",function () {
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
});