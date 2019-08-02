'use strict';
var Category = require('../models/category');
exports.list_all_categories = function (req, res) {
  Category.getAllCategory(function (err, category) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', category);
    res.send(category);
  });
};
exports.list_five_categories = function (req, res) {
  Category.getFiveCategory(function (err, category) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', category);
    res.send(category);
  });
};
exports.create_a_category = function (req, res) {
  var new_category = new Category(req.body);
  if (!new_category.name) {
    res.status(400).send({
      error: true,
      message: 'Please provide name'
    });
  } else {
    Category.createCategory(new_category, function (err, category) {
      if (err)
        res.send(err);
      res.json(category);
    });
  }
};
exports.read_a_category = function (req, res) {
  Category.getCategoryById(req.params.categoryId, function (err, category) {
    if (err)
      res.send(err);
    res.json(category);
  });
};

exports.update_a_categpry = function (req, res) {
  Category.updateById(req.params.categoryId, new Category(req.body), function (err, category) {
    if (err)
      res.send(err);
    res.json(category);
  });
};
exports.delete_a_category = function (req, res) {
  Category.remove(req.params.categoryId, function (err, category) {
    if (err)
      res.send(err);
    res.json({
      message: 'Category successfully deleted'
    });
  });
};