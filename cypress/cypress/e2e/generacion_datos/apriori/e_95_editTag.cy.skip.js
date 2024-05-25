/// <reference types="cypress" />


const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");
const PostPage = require("../pageobjects/postpage");
const SitePage = require("../pageobjects/sitepage");

context("EditTag", function () {
    let escenario = 'escenario95';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();
        this.postPage = new PostPage();
        this.sitePage = new SitePage();

        
        cy.fixture("ghost_tag.json").then((data) => {
            this.tagdata = data[Math.floor(Math.random() * data.length)];
        });


        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given the user is in the home page    
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it("A priori - El usuario edita un tag usando pull de datos a priori", function () {
        //Given the user is in the home page and logs in and navigates to tags
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToTags(escenario, '3_tags');
        this.tagpage.getLastTag();
        cy.get('@tag').then((tag) => {
            //When the user navigates to a specific tag and updates the tag with priori data
            cy.log('tag a editar:'+tag);
            this.tagpage.navigateToSpecificTag(tag, escenario, '4_specifictag');
            const newTag = this.tagdata.tag;
            const newcolor = this.tagdata.color;
            const newslug = this.tagdata.tag;
            const newdescription = this.tagdata.description;
            this.tagpage.updateTagForm(newTag,newcolor,newslug,newdescription, escenario, '5_updateform');
            // and the user goes back to tags
            this.page.backtoTags(escenario, '6_backtotags');
    
            //Then the user verify the tag is updated
            this.tagpage.verifyTagExists(newTag, escenario, '7_verify');
        });
    });

});