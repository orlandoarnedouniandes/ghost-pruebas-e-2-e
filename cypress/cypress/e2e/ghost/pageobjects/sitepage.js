class SitePage {
    verifylastPostTitle(expectedTitle, escenario = 'escenario', imagen = 'imagen') {
        cy.get('h2.post-card-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim()); 
          });
          cy.screenshot(escenario+'/'+imagen);
    }

    verifyPostTitleDoesNotExist(expectedTitle) {
        cy.get('body').then(($body) => {
            if ($body.find('h2.post-card-title').length > 0) {
                cy.get('h2.post-card-title').each(($el, index, $list) => {
                    expect($el.text().trim()).not.to.eq(expectedTitle.trim());
                });
            }
        });
    }

    verifyifPageExists(url, title) {
        let titleModified = title.trim().replace(/\s/g, '-').toLowerCase();
        cy.log('Title modified: '+titleModified);
        cy.visit(url + titleModified);
        cy.location('pathname').should('eq', '/'+titleModified+'/');
    }

    verifyTagExistsInPost(expectedTag) {
        cy.get('h2.post-card-title').first().click();
        cy.wait(2000);
        cy.get('div.article-tag').find('a').invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTag.trim());
        });
    }

    verifyIfUserNameIsDisplayed(expectedName) {
        cy.get('h2').first().invoke('text').then((text) => {
            expect(text.trim().replace(/\n/g, '')).to.eq(expectedName);
        });
    }

    verifyTitle(expectedTitle) {
        cy.get('h1').invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle);
        });
    }

    verifyLink(expectedLink) {
        cy.get('div.gh-head-menu').find('a').contains(expectedLink).should('exist');
    }

    verifyLinkNotExists(expectedLink) {
        cy.get('div.gh-head-menu').find('a').contains(expectedLink).should('not.exist');
    }

}

module.exports = SitePage;