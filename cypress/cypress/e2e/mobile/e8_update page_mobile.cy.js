/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const PageObject = require("./pageobjects/pagepage");

context("UpdatePage",function () {
    let escenario='escenario8';
    beforeEach(function () {
        this.page = new Page();
        this.pageObject = new PageObject();
        //Given: **Dado** que soy un usuario de teléfono IPhone
        cy.viewport('iphone-se2');

        cy.fixture("ghost_post.json").then((data) => {
            this.postdata = data[Math.floor(Math.random() * data.length)];;
          });

        if(this.data === undefined){
            cy.fixture("ghost.json").then((data) => {
            this.data = data;
            this.page.visit(this.data.url,escenario,'1_home');
            });
        }

    });

    it("El usuario actualiza una página",function () {
        //...y que soy un usuario administrador e ingreso a la página de administradores y navego hasta el listado de páginas y busco la página que quiero actualizar
        this.page.loginAdmin(this.data.username, this.data.password, escenario,'2_login');
        this.page.navigateToPages(escenario,'3_pages');
        this.pageObject.findfirstpage(); 
        cy.get('@pageTitle').then((title) => {
            this.pageObject.navigateToSpecificPage(title, escenario,'4_specificpage');

            //When **Cuando** al ingresar actualizo la página, guardo y luego voy al home del listado de páginas,
            const newTitle = this.postdata.post_title.substring(0, 200);
            this.pageObject.fillandSavePageForm(newTitle, this.postdata.post_content.substring(0,1000), escenario,'5_fillform');
            this.pageObject.editPage(escenario,'6_editpage');
            this.page.backToPages(escenario,'7_pages');

            //Then **Entonces** la página debe haber actualizado su información
            this.pageObject.verifylastPageTitle(newTitle, escenario,'8_verify');
        }); 
    });
});