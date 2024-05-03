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
}

module.exports = PostPage;