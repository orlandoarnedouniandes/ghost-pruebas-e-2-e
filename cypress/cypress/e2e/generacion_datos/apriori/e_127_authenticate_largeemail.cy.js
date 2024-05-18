/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");


context("Login", function () {
    let escenario = 'escenario127';
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
    
    it("A priori - El usuario intenta login con username largo", function () {

        //Given the user is in the home page
        this.page.visit(this.data.url, escenario, '1_home');
        // and the user goes to the login page
        this.page.gotoAdmin (escenario, '2_login');
        
        //When the suers gets a email large from priori data and type it
        let email = this.userdata.email_large;
        this.page.typeUsername(email, escenario, '3_typeusername');
        // and the user tries to login
        this.page.login(escenario, '4_login');
    
        //Then the user verify an error message is displayed
        this.page.verifyFillOutError(escenario, '5_verify');
    });

});