const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the create page', () => {
    describe('creates a new image', () => {
      it('renders the single page', () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');

        browser.click('#view-button');

        assert.include(browser.getText('body'), itemToCreate.title);
      });
    });
  });