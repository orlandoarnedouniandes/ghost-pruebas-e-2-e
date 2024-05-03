class Page {
    baseUrl = '';

    visit(url) {
        console.log('Visiting: '+url);
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

    navigateToPosts(){
        cy.get('a[href="#/posts/"]').click();
    }

    getLastPostTitle() {
        cy.get('div.post-feed')
            .find('article.post-card')
            .first()
            .find('h2.post-card-title')
            .invoke('text')
            .as('postTitle')
    }

    getRandomPostTitle(title) {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        return  title + randomNum;
    }

}

module.exports = Page;