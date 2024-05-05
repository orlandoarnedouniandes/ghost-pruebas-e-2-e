/// <reference types="cypress" />


const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("EditTag", function () {
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();
        this.postPage = new PostPage();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given      
            this.page.visit(this.data.url);
        });
    });
    
    it("El usuario edita un tag", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password);
        this.page.navigateToTags();
        this.tagpage.getLastTag();
        cy.get('@tag').then((tag) => {
            //When
            cy.log('tag a editar:'+tag);
            this.tagpage.navigateToSpecificTag(tag);
            const newTag = this.page.getRandomTagTitle(this.data.tag.name);
            this.tagpage.updateTagForm(newTag);
            this.page.backtoTags();
    
            //Then
            this.tagpage.verifyTagExists(newTag);
        });
    });

});