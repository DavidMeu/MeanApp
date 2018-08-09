var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');
var OrderedBook = require('../models/OrderedBook.js');

/* Purchase Book*/
router.get('/purchase/:book/:user', async function (req, res, next) {
  var orderedbook = await OrderedBook.findOne( /*{ $and: [*/
    { book_id: req.params.book, user_id: req.params.user } /*]
  }*/).exec();
  if (orderedbook == null) {
    //console.log(orderedbook.book_id+',,'+orderedbook.user_id)
    console.log('book: ' + req.params.book + ', user: ' + req.params.user);
    OrderedBook.create({ book_id: req.params.book, user_id: req.params.user });
    res.json('true');
  }
  else {
    //console.log(orderedbook.book_id+',,'+orderedbook.user_id+'::'+orderedbook)
    console.log('add book failed')
    res.json('false');
  }
});

/* GET USER BOOKS */
router.get('/userbooks/:user', async function (req, res, next) {
  var userBooks = await OrderedBook.find({ user_id: req.params.user }, { _id: 0, book_id: 1 }).exec();
  var arr = [];
  for (i = 0; i < userBooks.length; i++) arr[i] = userBooks[i].book_id;
  console.log(arr)
  Book.find({ _id: { $in: arr } }, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET ALL BOOKS */
router.get('/', function (req, res, next) {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function (req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id', function (req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function (req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
