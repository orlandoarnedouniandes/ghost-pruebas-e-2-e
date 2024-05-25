/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("UpdateProfileSlug", function () {
    let escenario = 'escenario15';

    beforeEach(function () {
        this.page = new Page();
        this.sitePage = new SitePage();
        //Given **Dado** que soy un usuario de teléfono IPhone 
        cy.viewport('iphone-se2');

        cy.fixture("ghost_slug.json").then((data) => {
            this.slug = data[Math.floor(Math.random() * data.length)];;
        });
          
        cy.fixture("ghost.json").then((data) => {
            this.data = data;   
            this.page.visit(this.data.url, escenario, '1_home');
        });
    });

    it("El usuario actualiza su pagina de autor", function () {
        //.. y que soy un administrador del sistema e ingreso a la página de inicio de sesión, 
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToProfile(escenario, '3_profile');
        
        //When **cuando** inicio sesión, y navego hasta mi perfil para modificar el slug de usuario, y guardo los cambios
        const slug = this.slug.slug_normal;
        this.page.updateProfileSlug(slug, escenario, '5_updateprofile');
        this.page.logout(escenario, '6_logout');
        
        //Then **entonces** debería ver el nuevo slug o nombre de usuario en el perfil actualizado y disponible para navegar en el sitio
        this.sitePage.verifyifPageExists(this.data.url, 'author/'+slug, escenario, '7_verify');
    });
});