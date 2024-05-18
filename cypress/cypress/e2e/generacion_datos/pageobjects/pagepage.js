class PageObject {
    fillandSavePageForm(postTitle, postContent, escenario='escenario',imagen='imagen'){
        cy.get('textarea.gh-editor-title').clear().type(postTitle,  { parseSpecialCharSequences: false });
        cy.get('div.koenig-editor__editor').clear().type(postContent,  { parseSpecialCharSequences: false });
        cy.get('body').click(); 
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen);
    }

    fillandSavePageEmptyForm(escenario = 'escenario', imagen = 'imagen') {
        cy.get('textarea.gh-editor-title').clear();
        cy.get('div.koenig-editor__editor').clear();
        cy.wait(2000);
        cy.screenshot(escenario + '/' + imagen);
    }
    fillandSavePageEmptyContent(postTitle, escenario = 'escenario', imagen = 'imagen') {
        cy.get('textarea.gh-editor-title').clear().type(postTitle);;
        cy.get('div.koenig-editor__editor').clear();
        cy.wait(2000);
        cy.screenshot(escenario + '/' + imagen);
    }

    backtoPages(escenario='escenario',imagen='imagen'){
        cy.get('a[href="#/pages/"]').first().click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen);
    }

    verifylastPageTitleandDraft(expectedTitle, escenario='escenario',imagen='imagen'){
        cy.get('h3.gh-content-entry-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim());
        });
        cy.get('span.gh-badge').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq('Draft');
        });
        cy.screenshot(escenario+'/'+imagen);
    }  
    
    findDraftPage(){
        cy.get('li.gh-posts-list-item').each(($el, index, $list) => {
            if ($el.find('span.gh-badge').text().trim() === 'Draft') {
                cy.wrap($el).find('h3.gh-content-entry-title').invoke('text').as('pageTitle');
                return false;
            }
        });
    }

    navigateToSpecificPage(postTitle, escenario='escenario',imagen='imagen'){
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
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen);
    }

    backtoDashBoard(escenario='escenario',imagen='imagen'){
        cy.get('button.gh-publish-back-button').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('body').then(($body) => {
            if ($body.find('a.gh-editor-back-button').length > 0) {
                cy.get('a.gh-editor-back-button').click();
            }
        });
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
    }

    publishPage(escenario='escenario',imagen='imagen'){
        cy.get('button.gh-publish-trigger').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('button.gh-btn-black').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
        cy.get('button.gh-btn-pulse').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_3');
    }

    findfirstpage(){
        cy.get('h3.gh-content-entry-title').first().invoke('text').as('pageTitle');
    }

    editPage(escenario='escenario',imagen='imagen'){
        cy.get('body').then((body) => {
            if (body.find('button.gh-editor-save-trigger').length > 0) {
                cy.get('button.gh-editor-save-trigger').click();
            }
        });
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen);
    }

    verifylastPageTitle(expectedTitle, escenario='escenario',imagen='imagen'){
        cy.get('h3.gh-content-entry-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim());
        });
        cy.screenshot(escenario+'/'+imagen);
    }

    findPublishedPage(){
        cy.get('li.gh-posts-list-item').each(($el, index, $list) => {
            if ($el.find('span.gh-content-status-published').text().trim() === 'Published') {
                cy.wrap($el).find('h3.gh-content-entry-title').invoke('text').as('pageTitle');
                return false;
            }
        });
    }

    unpublishPage(escenario='escenario',imagen='imagen'){
        cy.get('button.gh-unpublish-trigger').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('button.gh-revert-to-draft').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
    }

    verifyPageIsDraft(expectedTitle, escenario='escenario',imagen='imagen'){
        cy.get('h3.gh-content-entry-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim());
        });
        cy.get('span.gh-badge').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq('Draft');
        });
        cy.screenshot(escenario+'/'+imagen);
    }

    deletePage(escenario='escenario',imagen='imagen'){
        cy.get('button.settings-menu-toggle').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
        cy.get('div.epm-modal-container button.gh-btn.gh-btn-red.gh-btn-icon').click();
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen+'_3');
    }

    verifyPageTitleDoesNotExist(expectedTitle, escenario='escenario',imagen='imagen'){
        cy.get('body').then(($body) => {
            if ($body.find('h3.gh-content-entry-title').length > 0) {
                cy.get('h3.gh-content-entry-title').each(($el, index, $list) => {
                    expect($el.text().trim()).not.to.eq(expectedTitle.trim());
                });
            }
        });
        cy.screenshot(escenario+'/'+imagen);
    }
}

module.exports = PageObject;