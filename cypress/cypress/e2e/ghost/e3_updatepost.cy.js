/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("UpdatePost",function () {

    beforeEach(function () {
        this.page = new Page();
        this.postPage = new PostPage();
        this.SitePage = new SitePage();

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given
            this.page.visit(this.data.url);
            });
        }

    });

    it("El usuario editor quiere cambiar el título de un post que había publicado anteriormente",function () {
        //Given
        this.page.getLastPostTitle();
        cy.get('@postTitle').then((title) => {
            cy.log('post a editar:'+title);
            this.page.loginAdmin(this.data.username, this.data.password);
            this.page.navigateToPosts();
            this.postPage.navigateToSpecificPost(title); 

            //When
            const newTitle = this.page.getRandomPostTitle(this.data.post.title);
            this.postPage.editPostForm(newTitle, this.data.post.content);
            this.postPage.editPost();
            this.page.navigateToPosts();
            this.page.logout();  

            //Then
            this.SitePage.verifylastPostTitle(newTitle);
        });  
    });
});