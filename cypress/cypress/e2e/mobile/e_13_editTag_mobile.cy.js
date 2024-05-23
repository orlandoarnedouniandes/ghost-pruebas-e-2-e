/// <reference types="cypress" />


const Page = require("./pageobjects/page");
const TagPage = require("./pageobjects/tagpage");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("EditTag", function () {
    let escenario = 'escenario13';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();
        this.postPage = new PostPage();
        this.sitePage = new SitePage();

        cy.viewport('iphone-6');

        cy.fixture("ghost_tag.json").then((data) => {
            this.tagdata = data[Math.floor(Math.random() * data.length)];;
        });

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given  the user is in the home page     
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it("El usuario edita un tag", function () {
        //Given the user logs in and navigates to last tag
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToTags(escenario, '3_tags');
        this.tagpage.getLastTag();
        cy.get('@tag').then((tag) => {
            //When the user navigates to the tag and updates the form and goes back to tags
            cy.log('tag a editar:'+tag);
            this.tagpage.navigateToSpecificTag(tag, escenario, '4_specifictag');
            const newTag = this.tagdata.tag;
            this.tagpage.updateTagForm(newTag, escenario, '5_updateform');
            this.page.backtoTags(escenario, '6_backtotags');
    
            //Then the user verify the tag was updated
            this.tagpage.verifyTagExists(newTag, escenario, '7_verify');
        });
    });

});