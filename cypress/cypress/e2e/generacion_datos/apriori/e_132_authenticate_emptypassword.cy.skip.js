/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");


context("Login", function () {
    let escenario = 'escenario132';
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
    
    it("A priori - El usuario intenta autenticarse solo con el email", function () {

        //Given the user is in the home page
        this.page.visit(this.data.url, escenario, '1_home');
        // and the user goes to the login page
        this.page.gotoAdmin (escenario, '2_login');

        //When the user gets an email from priori data and type it
        let email = this.userdata.email;
        this.page.typeUsername(email, escenario, '2_typeusername');
        // and the users try to login
        this.page.login(escenario, '3_login');
    
        //Then the user verify an error message is displayed
        this.page.verifyFillOutError(escenario, '6_verify');
    });

});