'use strict';
module.exports = function (app) {
    var categoryCtrl = require('../models/category');
    var adminCtrl = require('../models/admin');
    // todoList Category
    app.route('/api/admin/category')
        .get(categoryCtrl.getAllCategory)
        .post(categoryCtrl.store);
    app.route('/api/admin/category/:categoryId')
        .get(categoryCtrl.detail)
        .put(categoryCtrl.update)
        .delete(categoryCtrl.delete);

    //Admin
    app.route('/api/admin')
        .get(adminCtrl.get)
        .post(adminCtrl.store);
    app.route('/api/admin/:email/:password')
        .get(adminCtrl.checkAccount);
};