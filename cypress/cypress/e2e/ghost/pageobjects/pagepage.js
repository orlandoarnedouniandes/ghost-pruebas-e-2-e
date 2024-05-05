class PageObject {
    fillandSavePageForm(postTitle, postContent){
        cy.get('textarea.gh-editor-title').clear().type(postTitle);
        cy.get('div.koenig-editor__editor').clear().type(postContent);
        cy.wait(2000);
    }

    backtoPages(){
        cy.get('a[href="#/pages/"]').first().click();
        cy.wait(1000);
    }

    verifylastPageTitleandDraft(expectedTitle){
        cy.get('h3.gh-content-entry-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim());
        });
        cy.get('span.gh-badge').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq('Draft');
        });
    }  
    
    findDraftPage(){
        cy.get('li.gh-posts-list-item').each(($el, index, $list) => {
            if ($el.find('span.gh-badge').text().trim() === 'Draft') {
                cy.wrap($el).find('h3.gh-content-entry-title').invoke('text').as('pageTitle');
                return false;
            }
        });
    }

    navigateToSpecificPage(postTitle){
        cy.wait(1000);
        let foundPost = true;
        cy.get('h3.gh-content-entry-title').each(($el, index, $list) => {
            if (foundPost) {
                if ($el.text().trim() === postTitle.trim()) {
                    cy.wrap($el).click();
                    foundPost = false;
                }
            }
        });
    }

    backtoDashBoard(){
        cy.get('button.gh-publish-back-button').click();
        cy.wait(1000);
        cy.get('body').then(($body) => {
            if ($body.find('a.gh-editor-back-button').length > 0) {
                cy.get('a.gh-editor-back-button').click();
            }
        });
    }

    publishPage(){
        cy.get('button.gh-publish-trigger').click();
        cy.wait(1000);
        cy.get('button.gh-btn-black').click();
        cy.wait(1000);
        cy.get('button.gh-btn-pulse').click();
        cy.wait(1000);
    }

    findfirstpage(){
        cy.get('h3.gh-content-entry-title').first().invoke('text').as('pageTitle');
    }

    editPage(){
        cy.wait(2000);
    }

    verifylastPageTitle(expectedTitle){
        cy.get('h3.gh-content-entry-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim());
        });
    }

    findPublishedPage(){
        cy.get('li.gh-posts-list-item').each(($el, index, $list) => {
            if ($el.find('span.gh-content-status-published').text().trim() === 'Published') {
                cy.wrap($el).find('h3.gh-content-entry-title').invoke('text').as('pageTitle');
                return false;
            }
        });
    }

    unpublishPage(){
        cy.get('button.gh-unpublish-trigger').click();
        cy.wait(1000);
        cy.get('button.gh-revert-to-draft').click();
        cy.wait(1000);
    }

    verifyPageIsDraft(expectedTitle){
        cy.get('h3.gh-content-entry-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim());
        });
        cy.get('span.gh-badge').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq('Draft');
        });
    }

    deletePage(){
        cy.get('button.settings-menu-toggle').click();
        cy.wait(1000);
        cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button').click();
        cy.wait(1000);
        cy.get('div.epm-modal-container button.gh-btn.gh-btn-red.gh-btn-icon').click();
        cy.wait(2000);
    }

    verifyPageTitleDoesNotExist(expectedTitle){
        cy.get('body').then(($body) => {
            if ($body.find('h3.gh-content-entry-title').length > 0) {
                cy.get('h3.gh-content-entry-title').each(($el, index, $list) => {
                    expect($el.text().trim()).not.to.eq(expectedTitle.trim());
                });
            }
        });
    }
}

module.exports = PageObject;