/// <reference types="cypress" />

const Page = require("../pageobjects/page");
const TagPage = require("../pageobjects/tagpage");


context("CreateTag", function () {
    let escenario = 'escenario11';
    beforeEach(function () {
        this.page = new Page();
        this.tagpage = new TagPage();

        cy.fixture("ghost_user.json").then((data) => {
            this.userdata = data[Math.floor(Math.random() * data.length)];
        });

        cy.fixture("ghost.json").then((data) => {
            cy.log('Data: '+data.url );
            this.data = data;
            //Given      
            
        });
    });
    
    it("El usuario crea un tag", function () {

        //Given
        this.page.visit(this.data.url, escenario, '1_home');
        this.page.gotoAdmin (escenario, '2_login');
        //When 
        let email = this.userdata.email;
        this.page.typeUsername(email, escenario, '2_typeusername');
        this.page.login(escenario, '3_login');
    
        //Then
        this.page.verifyFillOutError(escenario, '6_verify');
    });

});