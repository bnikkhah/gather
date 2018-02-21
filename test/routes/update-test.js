const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('renders the update page', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
          .get(`/items/update/${item._id}`);

      assert.include(parseTextFromHTML(response.text, '.form-title'), 'Update');
    });
  });

  describe('POST', () => {
    it('updates an item', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
        .post(`/items/update/${item._id}`)
        .type('form')
        .send({
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl
        });

      assert.equal(response.status, 302);
    });

    it('redirects home', async () => {
      const item = await seedItemToDatabase();
      const response = await request(app)
        .post(`/items/update/${item._id}`)
        .type('form')
        .send({
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl
        });
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
    
    it('displays an error message when supplied with an empty title', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
        .post(`/items/update/${item._id}`)
        .type('form')
        .send({
          description: item.description,
          imageUrl: item.imageUrl
        });

      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

    it('displays an error message when supplied with an empty description', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
        .post(`/items/update/${item._id}`)
        .type('form')
        .send({
          title: item.title,
          imageUrl: item.imageUrl
        });

      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

    it('displays an error message when supplied with an empty imageUrl', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
        .post(`/items/update/${item._id}`)
        .type('form')
        .send({
          title: item.title,
          description: item.description
        });

      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
  });
});
