/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
const Page = require("../pageobjects/page");
const PostPage = require("../pageobjects/postpage");
const SitePage = require("../pageobjects/sitepage");

context("UpdatePost",function () {
    let escenario='escenario46';

    beforeEach(function () {
        this.page = new Page();
        this.postPage = new PostPage();
        this.SitePage = new SitePage();

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given the user is in the home page 
            this.page.visit(this.data.url,escenario,'1_home');
            });
        }
    });

    it("aleatorio - El usuario editor quiere cambiar el título de un post que había publicado anteriormente",function () {
        //Given the user identity the post to update
        this.page.getLastPostTitle();
        cy.get('@postTitle').then((title) => {
            //and the user is logged as Admin and navigate to the post
            cy.log('post a editar:'+title);
            this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
            this.page.navigateToPosts(escenario,'3_posts');
            //and the user navigate to the post to update
            this.postPage.navigateToSpecificPost(title, escenario,'4_post'); 

            //When the user get a random title and content
            const newTitle = faker.lorem.sentence();
            const newContent = faker.lorem.sentence();
            // and the user fill the form and save it
            this.postPage.fillandSavePostForm(newTitle, newContent,'5_fillform');
            this.postPage.editPost(escenario,'6_editpost');
            // and the user navigate to the posts
            this.page.navigateToPosts(escenario,'7_posts');
            // and the user logout
            this.page.logout(escenario,'8_logout');  

            //Then the user verify the post was updated
            this.SitePage.verifylastPostTitle(newTitle,escenario,'9_verify');
        });  
    });
});