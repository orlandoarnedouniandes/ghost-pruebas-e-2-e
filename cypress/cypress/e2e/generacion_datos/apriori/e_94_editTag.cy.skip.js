/// <reference types="cypress" />


const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");
const PostPage = require("../pageobjects/postpage");
const SitePage = require("../pageobjects/sitepage");

context("EditTag", function () {
    let escenario = 'escenario94';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();
        this.postPage = new PostPage();
        this.sitePage = new SitePage();

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;

            cy.request('GET', this.data.api_tag_dinamico).then((response) => {
                this.tagdata = response.body;
            });

            //Given the user is in the home page      
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });
    
    it("A priori - El usuario edita un tag usando pull de datos a priori", function () {
        //Given the user is logged as Admin and navigate to the tags
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToTags(escenario, '3_tags');
        // and the user identity the tag to update
        this.tagpage.getLastTag();
        cy.get('@tag').then((tag) => {

            cy.log('tag a editar:'+tag);
            //When the user navigate to the tag and update it
            this.tagpage.navigateToSpecificTag(tag, escenario, '4_specifictag');
            //and the user gets data from priori
            const newTag = this.tagdata.tag;
            const newcolor = this.tagdata.color;
            const newslug = this.tagdata.tag;
            const newdescription = this.tagdata.description;
            // and the user fill the form and save it and back to tags
            this.tagpage.updateTagForm(newTag,newcolor,newslug,newdescription, escenario, '5_updateform');
            this.page.backtoTags(escenario, '6_backtotags');
    
            //Then the user verify the tag was updated
            this.tagpage.verifyTagExists(newTag, escenario, '7_verify');
        });
    });

});