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
        cy.get('a[href="#/editor/post/"]').first().click();
        cy.wait(2000);
    }

    navigateToNewPage(){
        cy.wait(2000);
        cy.get('a[href="#/pages/"]').first().click();
        cy.wait(1000);
        cy.get('a[href="#/editor/page/"]').first().click();
    }

    navigateToNewTag(){
        cy.wait(2000);
        cy.get('a[href="#/tags/"]').first().click();
        cy.wait(1000);
        cy.get('a[href="#/tags/new/"]').first().click();
    }

    logout(){
        cy.wait(2000);        
        cy.get('div.gh-user-avatar').click();
        cy.get('a.user-menu-signout').click();
        cy.wait(2000);
        this.visit(this.baseUrl);
    }

    navigateToPosts(){
        cy.get('a[href="#/posts/"]').first().click();
        cy.wait(2000);
    }

    navigateToPages(){
        cy.get('a[href="#/pages/"]').first().click();
        cy.wait(2000);
    }

    navigateToTags(){
        cy.get('a[href="#/tags/"]').first().click();
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

    getRandomTagTitle(title) {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        return  title + randomNum;
    }

    getRandomSlug(slug) {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        return  slug + randomNum;
    }

    getRandomName(name) {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        return  name + randomNum;
    }

    getRandomTitle(title) {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        return  title + randomNum;
    }

    getRandomLink(title) {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        return  title + randomNum;
    }

    backtoTags(){
        cy.get('a[href="#/tags/"]').first().click();
        cy.wait(1000);
    }

    navigateToProfile(){
        cy.get('div.gh-user-avatar').first().click();
        cy.get('a[href*="#/settings/staff/"]').first().click();
        cy.wait(2000);
    }

    updateProfileSlug(slug){
        cy.get('input[name="user"]').clear().type(slug, {force: true});
        cy.get('button.gh-btn-primary').click();
        cy.wait(2000);
    }

    updateProfileName(name){
        cy.get('input#user-name').clear().type(name, {force: true});
        
        cy.get('input#user-slug')
        .invoke('val')
        .as('slug')

        cy.get('button.gh-btn-primary').click();
        cy.wait(2000);
    }

    updateTitle(title){
        cy.get('a[href="#/settings/"]').click();
        cy.wait(1000);
        cy.get('a[href="#/settings/general/"]').click();
        cy.wait(1000);
        cy.get('div.gh-main-section').find('button.gh-btn').first().click();
        cy.get('input.ember-text-field').first().clear().type(title, {force: true});
        cy.wait(1000);
        cy.get('button.gh-btn-primary').click();
    }


    addLink(title){
        cy.get('a[href="#/settings/"]').click();
        cy.wait(1000);
        cy.get('a[href="#/settings/navigation/"]').click();
        cy.wait(1000);
        cy.get('div.gh-blognav-item').eq(2).find('input.ember-text-field').first().clear().type(title, {force: true});
        cy.wait(1000);
        cy.get('button.gh-btn-primary').click();
    }

    removeLink(){
        cy.get('a[href="#/settings/"]').click();
        cy.wait(1000);
        cy.get('a[href="#/settings/navigation/"]').click();
        cy.wait(1000);
    
        return cy.get('div.gh-blognav-item').eq(2).find('input.ember-text-field')
        .invoke('val')
        .then((link) => {
            cy.get('div.gh-blognav-item').eq(2).find('button.gh-blognav-delete').click();
            cy.wait(1000);
            cy.get('button.gh-btn-primary').click();
            cy.wait(2000);
            return cy.wrap(link);
        });
    }

}

module.exports = Page;