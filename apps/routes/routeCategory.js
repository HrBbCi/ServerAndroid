'use strict';
module.exports = function(app) {
  var categoryCtrl = require('../controllers/categoryController');

  // todoList Routes
  app.route('/categories')
    .get(categoryCtrl.list_all_categories)
    .post(categoryCtrl.create_a_category);

    app.route('/categories5')
    .get(categoryCtrl.list_five_categories)
    .post(categoryCtrl.create_a_category);
   
};
