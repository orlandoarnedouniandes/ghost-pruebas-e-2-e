class Page {
    baseUrl = '';

    visit(url) {
        cy.log('Visiting: '+url);
        if (!this.baseUrl) this.baseUrl = url;        
        cy.visit(url);
    }

    loginAdmin(username, password) {
        this.visit(this.baseUrl+'ghost/');

        cy.get('input[name="identification"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button.login').click();

    }

    navigateToNewPost(){
        cy.wait(2000);
        cy.get('a[href="#/editor/post/"]').click();
    }

    logout(){
        cy.wait(2000);
        cy.get('div.gh-user-avatar').click();
        cy.get('a.user-menu-signout').click();
        this.visit(this.baseUrl);
    }

    getRandomPostTitle(title){
        const randomInteger = Math.floor(Math.random() * 999);
        return title + '_' + randomInteger;
    }
}

module.exports = Page;