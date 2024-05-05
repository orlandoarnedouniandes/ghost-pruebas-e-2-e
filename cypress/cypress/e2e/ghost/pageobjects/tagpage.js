class TagPage {
    fillandSaveTagForm(title,color) {        
        //cy.get('input[name="name"]').clear();
        cy.get('main.gh-main').scrollTo(0, 0);
        cy.get('input[name="name"]').type(title,{force: true});
        cy.get('input[name="accent-color"]').first().type(color,{force: true});
        cy.get('input[name="slug"]').clear().type(title,{force: true});
        cy.get('textarea[name="description"]').clear().type(title,{force: true});
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click();
        cy.wait(2000);
    }

    updateTagForm(title) {
        cy.get('main.gh-main').scrollTo(0, 0);
        cy.get('input[name="name"]').clear().type(title,{force: true});
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click();
        cy.wait(2000);
    }

    verifyTagExists(expectedTag) {
        cy.get('h3.gh-tag-list-name').each(($el, index, $list) => {
            const text = $el.text().trim();
            if (text === expectedTag.trim()) {
                expect(text).to.eq(expectedTag.trim());
                return false;
            }
        });
    }

    getLastTag() {
        cy.get('ol.tags-list')
            .find('li.gh-tags-list-item')
            .first()
            .find('h3.gh-tag-list-name')
            .invoke('text')
            .as('tag')
    }

    navigateToSpecificTag(tag) {
        let foundPost = true;
        cy.get('h3.gh-tag-list-name').each(($el, index, $list) => {
            if (foundPost) {
                if ($el.text().trim() === tag.trim()) {
                    cy.wrap($el).click();
                    cy.wait(2000);
                    foundPost = false;
                }
            }
        });
    }

    deleteTag(){
        cy.get('button.gh-btn-red').click();
        cy.wait(1000);
        cy.get('div.epm-modal-container button.gh-btn.gh-btn-red.gh-btn-icon').click();
        cy.wait(2000);
    }

    verifyTagNotExists(expectedTag) {
        cy.get('h3.gh-tag-list-name').each(($el, index, $list) => {
            expect($el.text().trim()).not.to.eq(expectedTag.trim());
        });
    }
}

module.exports = TagPage;