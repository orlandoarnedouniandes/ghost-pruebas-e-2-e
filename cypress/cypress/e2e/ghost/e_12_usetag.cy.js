/// <reference types="cypress" />


const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("UseTag", function () {
    let escenario = 'escenario12';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();
        this.postPage = new PostPage();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it("El usuario usa un tag", function () {
        //Given
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToTags(escenario, '3_tags');
        this.tagpage.getLastTag();
        cy.get('@tag').then((tag) => {
            //When
            cy.log('tag a usar:'+tag);
            this.page.navigateToNewPost(escenario, '4_newpost');
            const title = this.page.getRandomPostTitle(this.data.post.title);
            this.postPage.selectTag(tag, escenario, '5_selecttag');
            this.postPage.fillandSavePostForm(title, this.data.post.content, escenario, '6_fillform');           
            this.postPage.publishPost(escenario, '7_publishpost');
            this.postPage.backtoDashBoard(escenario, '8_backtodashboard');
            this.page.logout(escenario, '9_logout'); 

            //Then
            this.sitePage.verifyTagExistsInPost(tag, escenario, '10_verify');
        });
    });

});