class SitePage {
    verifylastPostTitle(expectedTitle) {
        cy.get('h2.post-card-title').first().invoke('text').then((text) => {
            expect(text.trim()).to.eq(expectedTitle.trim()); 
          });
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
}

module.exports = SitePage;