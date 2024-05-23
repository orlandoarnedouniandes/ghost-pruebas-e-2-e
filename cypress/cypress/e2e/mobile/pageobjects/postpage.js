class PostPage {
    fillandSavePostForm(postTitle, postContent,escenario = 'escenario',imagen = 'imagen'){
        cy.get('textarea.gh-editor-title').clear().type(postTitle, {force: true});
        cy.get('div.koenig-editor__editor').clear().type(postContent, {force: true});
        cy.screenshot(escenario+'/'+imagen);
        cy.wait(2000);
    }

    editPost(escenario = 'escenario',imagen = 'imagen'){
        cy.get('button.gh-editor-save-trigger').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen);
   }

    unpublishPost(escenario = 'escenario',imagen = 'imagen'){
        cy.get('button.gh-unpublish-trigger').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('button.gh-revert-to-draft').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
    }

    publishPost(escenario = 'escenario',imagen = 'imagen'){
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

    backtoPosts(escenario = 'escenario',imagen = 'imagen'){
        cy.get('a[href="#/posts/"]').first().click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen);
    }

    verifylastPostTitleandDraft(expectedTitle, escenario = 'escenario',imagen = 'imagen'){
        cy.get('h3.gh-content-entry-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim());
        });
        cy.get('span.gh-badge').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq('Draft');
        });
        cy.screenshot(escenario+'/'+imagen);
    }    

    backtoDashBoard(escenario = 'escenario',imagen = 'imagen'){
        cy.get('button.gh-publish-back-button').click();
        cy.get('body').then(($body) => {
            if ($body.find('a.gh-editor-back-button').length > 0) {
                cy.get('a.gh-editor-back-button').click();
            }
        });
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
    }

    navigateToSpecificPost(postTitle,escenario = 'escenario',imagen = 'imagen'){
        cy.wait(1000);
        let foundPost = true;
        cy.get('h3.gh-content-entry-title').each(($el, index, $list) => {
            if (foundPost) {
                if ($el.text().trim() === postTitle.trim()) {
                    cy.wrap($el).click({force: true});
                    foundPost = false;
                }
            }
        });
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen);
    }

    deletePost(escenario = 'escenario',imagen = 'imagen'){
        cy.get('button.settings-menu-toggle').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
        cy.get('div.epm-modal-container button.gh-btn.gh-btn-red.gh-btn-icon').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_3');
    }

    findDraftPost(escenario = 'escenario',imagen = 'imagen'){
        cy.get('li.gh-posts-list-item').each(($el, index, $list) => {
            if ($el.find('span.gh-badge').text().trim() === 'Draft') {
                cy.wrap($el).find('h3.gh-content-entry-title').invoke('text').as('postTitle');
                return false;
            }
        });
    }

    selectTag(tag, escenario = 'escenario',imagen = 'imagen'){
        cy.get('button.settings-menu-toggle').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('input.ember-power-select-trigger-multiple-input').first().type(tag);
        cy.get('button.settings-menu-toggle').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
    }

    Preview(){
        cy.get('button.gh-editor-preview-trigger').click();
    }

    verifyTagExistsInPreview(title){
        cy.get('iframe').then(($iframe) => {
            const body = $iframe.contents().find('body');
            cy.wrap(body).find('div.article-tag').find('a').contains(title).should('exist');
        });
    }

    getLastPostTitle(){
        cy.get('h3.gh-content-entry-title').first().invoke('text').as('postTitle');
    }

    filterPublishedPosts(escenario = 'escenario',imagen = 'imagen'){
        cy.get('.ember-basic-dropdown-trigger').contains('All posts').click({force: true});
        cy.wait(1000);
        cy.get('ul.ember-power-select-options').contains('Published posts').click();
        cy.screenshot(escenario+'/'+imagen);
    }
}

module.exports = PostPage;