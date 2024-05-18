/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");


context("Login", function () {
    let escenario = 'escenario130';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();

        cy.fixture("ghost_user.json").then((data) => {
            this.userdata = data[Math.floor(Math.random() * data.length)];
        });

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
        });
    });
    
    it("A priori - El usuario intenta autenticarse con un email y password erroneo", function () {

        //Given the user is in the home page
        this.page.visit(this.data.url, escenario, '1_home');
        // and the user goes to the login page
        this.page.gotoAdmin (escenario, '2_login');

        //When the user gets an email and password from priori data and type it
        let password = this.userdata.password;
        let username = this.userdata.email;
        // and the users try to login
        this.page.loginAdmin(username, password, escenario, '2_login');
    
        //Then the user verify an error message is displayed
        this.page.verifyLoginWrongdata(escenario, '6_verify');
    });

});