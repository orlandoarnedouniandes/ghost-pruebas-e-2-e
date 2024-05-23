class TagPage {
    fillandSaveTagForm(title,color,escenario = 'escenario',imagen = 'imagen') {        
        //cy.get('input[name="name"]').clear();
        cy.get('main.gh-main').scrollTo(0, 0);
        cy.get('input[name="name"]').click().type(title,{force: true});
        cy.get('input[name="accent-color"]').first().type(color,{force: true});
        cy.get('input[name="slug"]').clear().type(title,{force: true});
        cy.get('textarea[name="description"]').clear().type(title,{force: true});
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click();
        cy.wait(2000);
        cy.get('main.gh-main').scrollTo(0, 0);
        cy.screenshot(escenario+'/'+imagen);
    }

    updateTagForm(title, escenario = 'escenario', imagen = 'imagen') {
        cy.get('main.gh-main').scrollTo(0, 0);
        cy.get('input[name="name"]').clear().type(title,{force: true});
        cy.wait(1000);
        cy.get('main.gh-main').scrollTo(0, 0);
        cy.screenshot(escenario+'/'+imagen+'_1before');
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click();
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen+'_2after');
    }

    verifyTagExists(expectedTag, escenario = 'escenario', imagen = 'imagen') {
        cy.get('h3.gh-tag-list-name').each(($el, index, $list) => {
            const text = $el.text().trim();
            if (text === expectedTag.trim()) {
                expect(text).to.eq(expectedTag.trim());
                return false;
            }
        });
        cy.screenshot(escenario+'/'+imagen);
    }

    getLastTag() {
        cy.get('ol.tags-list')
            .find('li.gh-tags-list-item')
            .first()
            .find('h3.gh-tag-list-name')
            .invoke('text')
            .as('tag')
    }

    navigateToSpecificTag(tag, escenario = 'escenario', imagen = 'imagen') {
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
        cy.get('main.gh-main').scrollTo(0, 0);
        cy.screenshot(escenario+'/'+imagen);
    }

    navigateToSettingsAndSelectGeneral(escenario = 'escenario',imagen = 'imagen'){
        this.clickmenu(escenario,imagen);
        cy.wait(2000);
        cy.get('a[href="#/settings/"]').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1')
        //this.tagSelect = cy.get('ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name').first().text();
        cy.get('a[href="#/settings/general/').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2')
        cy.get('div.gh-expandable-header button.gh-btn').first().click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_3')
    }

    editDescriptionAndSave(escenario = 'escenario',imagen = 'imagen'){
        const description = "Description Cypress General";
        cy.get('div.description-container input.ember-text-field').first().should('be.visible').invoke('val', '').type(description);
        //cy.get('input[id="tag-name"]').first().type(name);
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('div.gh-canvas-header button.gh-btn span').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_2');
        return description;
    }

    deleteTag(escenario = 'escenario',imagen = 'imagen'){
        cy.get('button.gh-btn-red').click();
        cy.wait(1000);
        cy.screenshot(escenario+'/'+imagen+'_1');
        cy.get('div.epm-modal-container button.gh-btn.gh-btn-red.gh-btn-icon').click();
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen+'_2');
    }

    verifyTagNotExists(expectedTag, escenario = 'escenario', imagen = 'imagen') {
        cy.get('h3.gh-tag-list-name').each(($el, index, $list) => {
            expect($el.text().trim()).not.to.eq(expectedTag.trim());
        });
        cy.screenshot(escenario+'/'+imagen);
    }

    verifyDescription(description, escenario = 'escenario', imagen = 'imagen'){
        //cy.log('Texto Objetnido: '+nameTitle );
        cy.wait(1000);
        cy.get('div.site-header-inner p.site-description').then((descr) => {
            if(description !== descr.text()){
                throw new Error(
                    `Expected Description is different`
                );
            }
        });
        cy.screenshot(escenario+'/'+imagen);
    }

    clickmenu(escenario='escenario',imagen='imagen'){
        cy.get('.gh-mobile-nav-bar-more').first().click();
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen);
    }
}

module.exports = TagPage;