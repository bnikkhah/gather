const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items: items});
});

router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.get('/items/:itemId', async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  res.render('single', {item: item});
});

router.get('/items/update/:itemId', async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  res.render('update', {item: item});
});

router.post('/items/update/:itemId', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const item = new Item({title, description, imageUrl});
  item.validateSync();
  if (item.errors) {
    res.status(400).render('update', {item: item});
    item._id = req.params.itemId;
  } else {
    await Item.findByIdAndUpdate(
      req.params.itemId,
      {
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl
      }
    );
    res.redirect('/');
  }
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  }
});

router.post('/items/:itemId/delete', async (req, res, next) => {
  const item = await Item.findByIdAndRemove(req.params.itemId);
  res.redirect('/');
});

module.exports = router;
