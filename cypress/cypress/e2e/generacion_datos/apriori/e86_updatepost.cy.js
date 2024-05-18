/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const PostPage = require("../pageobjects/postpage");
const SitePage = require("../pageobjects/sitepage");

context("UpdatePost",function () {
    let escenario='escenario86';

    beforeEach(function () {
        this.page = new Page();
        this.postPage = new PostPage();
        this.SitePage = new SitePage();

        cy.fixture("ghost_post.json").then((data) => {
            this.postdata = data[Math.floor(Math.random() * data.length)];;
          });
    
          
        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            //Given the user is in the home page
            this.page.visit(this.data.url,escenario,'1_home');
            });
        }
    });

    it("A priori - El usuario editor quiere cambiar el título de un post que había publicado anteriormente",function () {
        //Given the user gets the last post title
        this.page.getLastPostTitle();
        cy.get('@postTitle').then((title) => {
            cy.log('post a editar:'+title);
            //and the user logs in and navigates to posts
            this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
            this.page.navigateToPosts(escenario,'3_posts');
            // and the user navigates to the post
            this.postPage.navigateToSpecificPost(title, escenario,'4_post'); 

            //When the user updates the title and content with priori data and back to posts
            const newTitle = this.postdata.post_title.substring(0,249);
            const newContent = this.postdata.post_content;
            this.postPage.fillandSavePostForm(newTitle, newContent,'5_fillform');
            this.postPage.editPost(escenario,'6_editpost');
            this.page.navigateToPosts(escenario,'7_posts');
            // and the user logs out
            this.page.logout(escenario,'8_logout');  

            //Then the user verify the post is updated
            this.SitePage.verifylastPostTitle(newTitle,escenario,'9_verify');
        });  
    });
});