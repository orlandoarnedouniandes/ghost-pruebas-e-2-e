/// <reference types="cypress" />


const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("UseTag", function () {
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
    
    it("El usuario usa un tag", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password);
        this.page.navigateToTags();
        this.tagpage.getLastTag();
        cy.get('@tag').then((tag) => {
            //When
            cy.log('tag a usar:'+tag);
            this.page.navigateToNewPost();
            const title = this.page.getRandomPostTitle(this.data.post.title);
            this.postPage.selectTag(tag);
            this.postPage.fillandSavePostForm(title, this.data.post.content);           
            this.postPage.publishPost();
            this.postPage.backtoDashBoard();
            this.page.logout();  
            this.page.visit(this.data.url);

            //Then
            this.sitePage.verifyTagExistsInPost(tag      );
        });
    });

});