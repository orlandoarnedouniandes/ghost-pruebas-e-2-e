class SitePage {
    verifylastPostTitle(expectedTitle, escenario = 'escenario', imagen = 'imagen') {
        cy.get('h2.post-card-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim()); 
          });
          cy.screenshot(escenario+'/'+imagen);
    }

    verifyPostTitleDoesNotExist(expectedTitle, escenario = 'escenario', imagen = 'imagen') {
        cy.get('body').then(($body) => {
            if ($body.find('h2.post-card-title').length > 0) {
                cy.get('h2.post-card-title').each(($el, index, $list) => {
                    expect($el.text().trim()).not.to.eq(expectedTitle.trim());
                });
            }
        });
        cy.screenshot(escenario+'/'+imagen);
    }

    verifyifPageExists(url, title, escenario = 'escenario', imagen = 'imagen') {
        let titleModified = title.trim().replace(/\s/g, '-').toLowerCase();
        cy.log('Title modified: '+titleModified);
        cy.visit(url + titleModified,escenario,imagen);     
        cy.wait(2000);
        cy.screenshot(escenario+'/'+imagen);   
        cy.location('pathname').should('eq', '/'+titleModified+'/');
    }

    verifyTagExistsInPost(expectedTag, escenario = 'escenario', imagen = 'imagen') {
        cy.get('h2.post-card-title').first().click();
        cy.wait(2000);
        cy.get('div.article-tag').find('a').invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTag.trim());
        });
        cy.screenshot(escenario+'/'+imagen);
    }

    verifyIfUserNameIsDisplayed(expectedName, escenario = 'escenario', imagen = 'imagen') {
        cy.get('h2').first().invoke('text').then((text) => {
            expect(text.trim().replace(/\n/g, '')).to.eq(expectedName);
        });
        cy.screenshot(escenario+'/'+imagen);
    }

    verifyTitle(expectedTitle, escenario = 'escenario', imagen = 'imagen') {
        cy.get('h1').invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle);
        });
        cy.screenshot(escenario+'/'+imagen);
    }

    verifyLink(expectedLink, escenario = 'escenario', imagen = 'imagen') {
        cy.get('div.gh-head-menu').find('a').contains(expectedLink).should('exist');
        cy.screenshot(escenario+'/'+imagen);
    }

    verifyLinkNotExists(expectedLink,escenario = 'escenario', imagen = 'imagen') {
        cy.get('div.gh-head-menu').find('a').contains(expectedLink).should('not.exist');
        cy.screenshot(escenario+'/'+imagen);
    }

}

module.exports = SitePage;