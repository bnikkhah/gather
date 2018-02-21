const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the update page', () => {
    describe('updates the info', () => {
      it('is updated', () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');

        browser.click('#view-button');
        browser.click('#update-button');

        browser.setValue('#title-input', 'updatedTitle');
        browser.setValue('#description-input', 'updatedDescription');
        browser.setValue('#imageUrl-input', 'updatedImage');

        browser.click('#submit-button');

        assert.include(browser.getText('body'), 'updatedTitle');
      });
    });
});