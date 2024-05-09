/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("UpdatePost",function () {
    let escenario='escenario3';

    beforeEach(function () {
        this.page = new Page();
        this.postPage = new PostPage();
        this.SitePage = new SitePage();

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given
            this.page.visit(this.data.url,escenario,'1_home');
            });
        }
    });

    it("El usuario editor quiere cambiar el título de un post que había publicado anteriormente",function () {
        //Given
        this.page.getLastPostTitle();
        cy.get('@postTitle').then((title) => {
            cy.log('post a editar:'+title);
            this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
            this.page.navigateToPosts(escenario,'3_posts');
            this.postPage.navigateToSpecificPost(title, escenario,'4_post'); 

            //When
            const newTitle = this.page.getRandomPostTitle(this.data.post.title);
            this.postPage.fillandSavePostForm(newTitle, this.data.post.content,escenario,'5_fillform');
            this.postPage.editPost(escenario,'6_editpost');
            this.page.navigateToPosts(escenario,'7_posts');
            this.page.logout(escenario,'8_logout');  

            //Then
            this.SitePage.verifylastPostTitle(newTitle,escenario,'9_verify');
        });  
    });
});