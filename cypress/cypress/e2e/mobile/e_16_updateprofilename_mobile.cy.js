/// <reference types="cypress" />

const Page = require("./pageobjects/page");
const SitePage = require("./pageobjects/sitepage");

context("UpdateProfileName", function () {
    let escenario = 'escenario16';
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

    it("El usuario actualiza su nombre de autor", function () {
        //...y que soy un administrador del sistema e ingreso a la página de inicio de sesión
        this.page.loginAdmin(this.data.username, this.data.password, escenario, '2_login');
        this.page.navigateToProfile(escenario, '3_profile');
        
        //When  **cuando** inicio sesión, y navego hasta mi perfil para modificar el nombre completo, y guardo los cambios
        const name = this.slug.slug_normal;
        this.page.updateProfileName(name, escenario, '5_updateprofile');
        cy.get('@slug').then((slug) => {
            cy.log('Slug: '+slug);
            this.page.logout(escenario, '6_logout');
            
            //Then **entonces** debería ver el nuevo nombre completo en el perfil actualizado
            this.page.visit(this.data.url+'author/'+slug, escenario, '7_authorpage');
            this.sitePage.verifyIfUserNameIsDisplayed(name, escenario, '8_verify');
        });
    });
});