const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, buildItemObject, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:itemId/delete', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('POST', () => {
    it('deletes the item', async () => {
        const item = await seedItemToDatabase();

        const response = await request(app)
          .post(`/items/${item._id}/delete`)
          .type('form')
          .send({
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl
          });

        console.log(response.text);

        assert.equal(response.status, 302);
    });

    it('redirects home', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
        .post(`/items/${item._id}/delete`)
        .type('form')
        .send({
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl
        });

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
  });
});
