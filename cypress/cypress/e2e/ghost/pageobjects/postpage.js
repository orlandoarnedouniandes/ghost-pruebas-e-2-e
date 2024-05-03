class PostPage {
    fillPostForm(postTitle, postContent){
        cy.get('div.koenig-editor__editor').type(postContent);
        cy.get('textarea.gh-editor-title').type(postTitle);
    }

    publishPost(){
        cy.get('button.gh-publish-trigger').click();
        cy.wait(1000);
        cy.get('button.gh-btn-black').click();
        cy.wait(1000);
        cy.get('button.gh-btn-pulse').click();
    }

    backtoDashBoard(){
        cy.get('button.gh-publish-back-button').click();
        cy.wait(1000);
        cy.get('a.gh-editor-back-button').click();
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