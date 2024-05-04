/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");
const SitePage = require("./pageobjects/sitepage");

context("Ghost",function () {

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

  it("El usuario quiere crear y publicar un nuevo post",function () {
    //Given
    this.page.loginAdmin(this.data.username, this.data.password);
    this.page.navigateToNewPost();

    //When
    const title = this.page.getRandomPostTitle(this.data.post.title);
    this.postPage.fillPostForm(title, this.data.post.content);
    this.postPage.publishPost();
    this.postPage.backtoDashBoard();
    this.page.logout();

    //Then
    this.SitePage.verifylastPostTitle(title);
  });

  it("User wants to edit a post",function () {
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

  it("User wants to publish and unpublish a post",function () {

    this.page.getLastPostTitle();
    cy.get('@postTitle').then((title) => {
        
      //Given Escenario unpublish post
      cy.log('post a publicar:'+title);
      this.page.loginAdmin(this.data.username, this.data.password);
      this.page.navigateToPosts();
      this.postPage.navigateToSpecificPost(title); 

      //When
      this.postPage.unpublishPost();
      this.page.navigateToPosts();
      this.page.logout();  

      //Then
      this.SitePage.verifyPostTitleDoesNotExist(title);
      
      //Escenario: publish post
      //Given
      this.page.loginAdmin(this.data.username, this.data.password);
      this.page.navigateToPosts();
      this.postPage.navigateToSpecificPost(title);

      //When 
      this.postPage.publishPost();
      this.postPage.backtoDashBoard();
      this.page.logout();  
      this.page.visit(this.data.url);

      //Then
      this.SitePage.verifylastPostTitle(title);
    });  
  });

  it("User wants to delete a post",function (){
    //Given
    this.page.getLastPostTitle();
    cy.get('@postTitle').then((title) => {
      cy.log('post a eliminar:'+title);
      this.page.loginAdmin(this.data.username, this.data.password);
      this.page.navigateToPosts();
      this.postPage.navigateToSpecificPost(title); 

      //When
      this.postPage.deletePost();
      this.page.logout();  

      //Then
      this.SitePage.verifyPostTitleDoesNotExist(title);
    });
  });
});
