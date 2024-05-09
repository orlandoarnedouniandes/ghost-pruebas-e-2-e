class Page {
    baseUrl = '';

    visit(url,escenario ='escenario', imagen='imagen') {
        cy.log('Visiting: '+url);
        if (!this.baseUrl) this.baseUrl = url;        
        cy.visit(url);
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen);
    }

    loginAdmin(username, password, escenario='escenario', imagen='imagen') {
        this.visit(this.baseUrl+'ghost/',escenario,imagen+'_1before');        
        cy.get('input[name="identification"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.screenshot(escenario+'/'+imagen+'_2after');
        cy.get('button.login').click();
        cy.wait(2000);        
    }

    navigateToNewPost(escenario='escenario',imagen='imagen') {
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen+'_dashboard');
        cy.get('a[href="#/editor/post/"]').first().click();
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen+'_newpost');
    }

    navigateToNewPage(escenario='escenario',imagen='imagen') {
        cy.wait(2000);
        cy.get('a[href="#/pages/"]').first().click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('a[href="#/editor/page/"]').first().click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
    }

    navigateToNewTag(escenario='escenario',imagen='imagen'){
        cy.wait(2000);
        cy.get('a[href="#/tags/"]').first().click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('a[href="#/tags/new/"]').first().click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
    }

    logout(escenario='escenario',imagen='imagen'){
        cy.wait(2000);        
        cy.get('div.gh-user-avatar').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1_avatar');
        cy.get('a.user-menu-signout').click();
        cy.wait(2000);
        this.visit(this.baseUrl,escenario,imagen+'_2_home');        
    }

    navigateToPosts(escenario='escenario',imagen='imagen'){
        cy.get('a[href="#/posts/"]').first().click();
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen);
    }

    navigateToPages(escenario='escenario',imagen='imagen'){
        cy.get('a[href="#/pages/"]').first().click();
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen);
    }

    navigateToTags(escenario='escenario',imagen='imagen'){
        cy.get('a[href="#/tags/"]').first().click();
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen);
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

    backtoTags(escenario='escenario',imagen='imagen'){
        cy.get('a[href="#/tags/"]').first().click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen);
    }

    navigateToProfile(escenario='escenario',imagen='imagen'){
        cy.get('div.gh-user-avatar').first().click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('a[href*="#/settings/staff/"]').first().click();
        cy.screenshot(escenario+'/'+imagen+'_2');
        cy.wait(2000);
    }

    updateProfileSlug(slug, escenario='escenario',imagen='imagen'){
        cy.get('input[name="user"]').clear().type(slug, {force: true});
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1before');
        cy.get('button.gh-btn-primary').click();
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen+'_2after');
    }

    updateProfileName(name,escenario='escenario',imagen='imagen'){
        cy.get('input#user-name').clear().type(name, {force: true});
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1update');
        cy.get('input#user-slug')
        .invoke('val')
        .as('slug')

        cy.get('button.gh-btn-primary').click();
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen+'_2after');
    }

    updateTitle(title, escenario='escenario',imagen='imagen'){
        cy.get('a[href="#/settings/"]').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('a[href="#/settings/general/"]').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
        cy.get('div.gh-main-section').find('button.gh-btn').first().click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_3');
        cy.get('input.ember-text-field').first().clear().type(title, {force: true});
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_4');
        cy.get('button.gh-btn-primary').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_5');
    }


    addLink(title, escenario='escenario',imagen='imagen'){
        cy.get('a[href="#/settings/"]').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('a[href="#/settings/navigation/"]').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
        cy.get('div.gh-blognav-item').eq(2).find('input.ember-text-field').first().clear().type(title, {force: true});
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_3');
        cy.get('button.gh-btn-primary').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_4');
    }

    removeLink(escenario='escenario',imagen='imagen'){
        cy.get('a[href="#/settings/"]').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');   
        cy.get('a[href="#/settings/navigation/"]').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
    
        return cy.get('div.gh-blognav-item').eq(2).find('input.ember-text-field')
        .invoke('val')
        .then((link) => {
            cy.get('div.gh-blognav-item').eq(2).find('button.gh-blognav-delete').click();
            cy.wait(1000);
            cy.screenshot(escenario+'/'+imagen+'_3');
            cy.get('button.gh-btn-primary').click();
            cy.wait(2000);
            cy.screenshot(escenario+'/'+imagen+'_4');
            return cy.wrap(link);
        });
    }

}

module.exports = Page;