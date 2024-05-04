class PostPage {
    fillPostForm(postTitle, postContent){
        cy.get('div.koenig-editor__editor').type(postContent);
        cy.get('textarea.gh-editor-title').type(postTitle);
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
}

module.exports = PostPage;