/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PostPage = require("./pageobjects/postpage");


context("CreatePost", function () {
  let escenario='escenario1';

  beforeEach(function () {
    this.page = new Page();
    this.postPage = new PostPage();
    //Given: **Dado** que soy un usuario de teléfono IPhone
    cy.viewport('iphone-se2');

    cy.fixture("ghost_post.json").then((data) => {
      this.postdata = data[Math.floor(Math.random() * data.length)];;
    });
    
    cy.fixture("ghost.json").then((data) => {
      this.data = data;
      this.page.visit(this.data.url,escenario,'1_home');
    });  
  });

  it("El usuario editor quiere crear un nuevo post", function () {
    //... y que soy un usuario administrador del sitio e ingreso a la página de administradores y navego hasta la creación de posts
    this.page.loginAdmin(this.data.username, this.data.password,escenario,'2_login');
    this.page.navigateToNewPost(escenario,'3_newpost');

    //When: **Cuando** ingreso nuevos datos como título y contenido al post, lo guardo y navego a la lista de posts
    const title = this.page.getRandomPostTitle(this.postdata.post_title.substring(0, 200));
    this.postPage.fillandSavePostForm(title, this.postdata.post_content.substring(0,1000),escenario,'4_fillform');
    this.postPage.backtoPosts(escenario,'5_backtoposts');

    //Then: **Entonces** debería ver el post en la lista de post en estado DRAFT
    this.postPage.verifylastPostTitleandDraft(title,escenario,'6_verify');
  });
});