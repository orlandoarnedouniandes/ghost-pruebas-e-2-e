//Pages Object for Tags
class Tags {

    /**Navegation*/
    navigateToNewTag(){
        cy.wait(2000);
        cy.get('a[href="#/tags/"]').click();
        cy.wait(2000);
        cy.get('a[href="#/tags/new/"]').click();
    }

    navigateToTagsAndSelectTag(){
        cy.wait(2000);
        cy.get('a[href="#/tags/"]').click();
        cy.wait(1000);
        //this.tagSelect = cy.get('ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name').first().text();
        cy.get('ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name').first().click();
    }

    navigateToPostsAndSelectPost(){
        cy.wait(2000);
        cy.get('a[href="#/posts/"]').first().click();
        cy.wait(1000);
        //this.tagSelect = cy.get('ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name').first().text();
        cy.get('ol li.gh-list-row.gh-posts-list-item a h3.gh-content-entry-title').first().click();
        cy.wait(1000);
        cy.get('button.settings-menu-toggle').click();        
    }

    navigateToSettingsAndSelectGeneral(){
        cy.wait(2000);
        cy.get('a[href="#/settings/"]').click();
        cy.wait(1000);
        //this.tagSelect = cy.get('ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name').first().text();
        cy.get('a[href="#/settings/general/').click();
        cy.wait(1000);
        cy.get('div.gh-expandable-header button.gh-btn').first().click();
    }

    backToTags(){
        cy.wait(1000);
        cy.get('a[href="#/tags/"]').first().click();
    }

    verifyTag(nameTitle){
        //cy.log('Texto Objetnido: '+nameTitle );
        let flag = false;
        cy.wait(1000);
        cy.get('ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name').each(input => {             
            cy.log('input: '+input.text() + "texto "+nameTitle+" bool"+flag);
            if (input.text().trim() === nameTitle.trim() ) {                
                flag = true;
                return false;
            }
        }).then(() => {
            if(flag === false){
                throw new Error("The Tag isn't created");
            }
        });
    }

    verifyTagNotExist(nameTitle){
        //cy.log('Texto Objetnido: '+nameTitle );
        this.flag = true;
        cy.wait(1000);
        cy.get('ol li.gh-list-row.gh-tags-list-item a span').each(input => { 
            //cy.log('input: '+input.text() );
            if (input.text() === nameTitle ) {
                this.flag = false;
            }
        }).then(() => {
            if(this.flag === false){
                throw new Error("The Tag exist");
            }
        });   
    }

    verifyDescription(description){
        //cy.log('Texto Objetnido: '+nameTitle );
        cy.wait(1000);
        cy.get('div.site-header-inner p.site-description').then((descr) => {
            if(description !== descr.text()){
                throw new Error(
                    `Expected Description is different`
                );
            }
        });
    }

    /*navigateAndChoiceLastTag(){
        cy.wait(1000);
        cy.get('a[href="#/tags/"]').first().click();
        cy.get('ol li.gh-list-row.gh-tags-list-item a h3.gh-tag-list-name').then($inputs => {
            var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
            if (!Cypress.dom.isHidden(randomInput)) {
                cy.wrap(randomInput).type(texto,{force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomEvent(monkeysLeft);
        });
    }*/


    /**Events*/
    fillAndSaveTag(){
        const name = "Cypress Tag";
        const color = "ee6d6d";
        const slug = "cypress-tag";
        const description = "description text";
        cy.get('input[id="tag-name"]').first().type(name);
        cy.get('input[placeholder="15171A"]').first().type(color);
        cy.get('input[id="tag-slug"]').first().type(slug);
        cy.get('textarea[id="tag-description"]').first().type(description);
        cy.wait(1000);
        cy.get('div.gh-canvas-header button.gh-btn span').click();
        return name;
    }

    editTitleAndSaveTag(){
        const name = "Cypress Tag Modified";
        cy.get('input[id="tag-name"]').first().should('be.visible').invoke('val', '').type(name);
        //cy.get('input[id="tag-name"]').first().type(name);
        cy.wait(1000);
        cy.get('div.gh-canvas-header button.gh-btn span').click();
        return name;
    }

    deleteTag(){
        var slug = cy.get('input[id="tag-slug"]').text;
        cy.wait(1000);
        cy.get('div button.gh-btn-red span').click();
        cy.wait(1000);
        cy.get('div.modal-footer button.gh-btn-red span').click();
        return slug;
    }

    editDescriptionAndSave(){
        const description = "Description Cypress General";
        cy.get('div.description-container input.ember-text-field').first().should('be.visible').invoke('val', '').type(description);
        //cy.get('input[id="tag-name"]').first().type(name);
        cy.wait(1000);
        cy.get('div.gh-canvas-header button.gh-btn span').click();
        return description;
    }
}

module.exports = Tags;