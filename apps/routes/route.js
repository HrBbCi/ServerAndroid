'use strict';
module.exports = function (app) {
    var categoryCtrl = require('../models/category');
    var adminCtrl = require('../models/admin');
    var customerCtrl = require('../models/customer');
    var productCtrl = require('../models/product');
    var homeCtrl = require('../models/home');

    var test2 = require('../models/product_model');
    // todoList Category
    app.route('/api/category')
        .get(categoryCtrl.getAllCategory);
    // .post(categoryCtrl.store);
    app.route('/api/category/:categoryId')
        .get(categoryCtrl.detail)
        .put(categoryCtrl.update)
        .delete(categoryCtrl.delete);
    //Admin
    app.route('/api/admin')
        .get(adminCtrl.get)
        .post(adminCtrl.save);
    app.route('/api/admin/check')
        .get(adminCtrl.checkAccount);
    //Customer
    app.route('/api/customer')
        .get(customerCtrl.getAllAccount)
        .post(customerCtrl.save);
    app.route('/api/customer/check')
        .post(customerCtrl.checkAccount);
    //Product
    app.route('/api/product')
        .get(productCtrl.getAll)
        .post(productCtrl.save);
        // Sam sung
    app.route('/api/product/:Id')
        .get(productCtrl.getProductCategory)
        .post(productCtrl.save);
         //Product
    // app.route('/api/test2')
    // .get(test2.getAll)
    // .post(test2.save);

    //Home
    app.route('/api/home')
        .get(homeCtrl.getHome);
};