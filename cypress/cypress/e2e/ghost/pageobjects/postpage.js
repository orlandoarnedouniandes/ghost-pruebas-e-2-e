class PostPage {
    fillandSavePostForm(postTitle, postContent){
        cy.get('div.koenig-editor__editor').type(postContent);
        cy.get('textarea.gh-editor-title').type(postTitle);
        cy.wait(2000);
    }

    editPostForm(postTitle, postContent){
        cy.get('div.koenig-editor__editor').clear().type(postContent);
        cy.get('textarea.gh-editor-title').clear().type(postTitle);
    }

    editPost(){
        cy.get('button.gh-editor-save-trigger').click();
   }

    unpublishPost(){
        cy.get('button.gh-unpublish-trigger').click();
        cy.wait(1000);
        cy.get('button.gh-revert-to-draft').click();
        cy.wait(1000);
    }

    publishPost(){
        cy.get('button.gh-publish-trigger').click();
        cy.wait(1000);
        cy.get('button.gh-btn-black').click();
        cy.wait(1000);
        cy.get('button.gh-btn-pulse').click();
        cy.wait(1000);
    }

    backtoPosts(){
        cy.get('a[href="#/posts/"]').first().click();
        cy.wait(1000);
    }

    verifylastPostTitleandDraft(expectedTitle){
        cy.get('h3.gh-content-entry-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim());
        });
        cy.get('span.gh-badge').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq('Draft');
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

    navigateToSpecificPost(postTitle){
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

    deletePost(){
        cy.get('button.settings-menu-toggle').click();
        cy.wait(1000);
        cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button').click();
        cy.wait(1000);
        cy.get('div.epm-modal-container button.gh-btn.gh-btn-red.gh-btn-icon').click();
    }

    findDraftPost(){
        cy.get('li.gh-posts-list-item').each(($el, index, $list) => {
            if ($el.find('span.gh-badge').text().trim() === 'Draft') {
                cy.wrap($el).find('h3.gh-content-entry-title').invoke('text').as('postTitle');
                return false;
            }
        });
    }
}

module.exports = PostPage;