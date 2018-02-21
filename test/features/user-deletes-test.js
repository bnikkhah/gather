const {assert} = require('chai');
const {buildItemObject, seedItemToDatabase} = require('../test-utils');

describe('User visits the index page', () => {
    describe('deletes an image', () => {
      it('is deleted', async () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');

        browser.click('#delete-button');

        assert.notInclude(browser.getText('body'), itemToCreate.title);
      });
    });
  });