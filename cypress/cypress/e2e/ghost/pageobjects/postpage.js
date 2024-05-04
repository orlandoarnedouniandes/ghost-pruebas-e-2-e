class PostPage {
    fillandSavePostForm(postTitle, postContent){
        cy.get('div.koenig-editor__editor').type(postContent);
        cy.get('textarea.gh-editor-title').type(postTitle);
        cy.wait(2000);
    }

    publishPost(){
        cy.get('button.gh-publish-trigger').click();
        cy.wait(1000);
        cy.get('button.gh-btn-black').click();
        cy.wait(1000);
        cy.get('button.gh-btn-pulse').click();
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
        cy.get('a.gh-editor-back-button').click();
    }
}

module.exports = PostPage;