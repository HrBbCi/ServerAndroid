'use strict';
module.exports = function (app) {
    var categoryCtrl = require('../models/category');
    var adminCtrl = require('../models/admin');
    var customerCtrl = require('../models/customer');
    var accCustomerCtrl = require('../models/account_customer');
    var productCtrl = require('../models/product');
    var homeCtrl = require('../models/home');
    var newsCtrl = require('../models/news');
    var orderCtrl = require('../models/order');
    var billCtrl = require('../models/bill');

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
        .get(customerCtrl.getDetailCustomer);

    app.route('/api/customer/:CustomerId')
        .get(customerCtrl.getDetailCustomerById);

    app.route('/api/accCustomer')
        .get(accCustomerCtrl.getAllAccount)
        .post(accCustomerCtrl.save);
    app.route('/api/accCustomer/check')
        .post(accCustomerCtrl.checkAccount);
    //Product
    app.route('/api/product')
        .get(productCtrl.getAll);
        // .post(productCtrl.save);
    
    app.route('/api/product/getPById/:Id')
        .get(productCtrl.getProductById);
    app.route('/api/product/getPByName/:Id')
        .get(productCtrl.getProductByName);
    app.route('/api/product/getColorProduct/:Id/:Size')
        .get(productCtrl.getProductColorByIdAndSize);
    app.route('/api/product/category/:Id')
        .get(productCtrl.getProductCategory);

    //Home
    app.route('/api/home')
        .get(homeCtrl.getHome);

    //News
    app.route('/api/news')
        .get(newsCtrl.getNews);
       
        //Order
    app.route('/api/order')
        .get(orderCtrl.getOrder);
    app.route('/api/order/:CustomerId')
        .get(orderCtrl.getOrderByCusId);
    app.route('/api/order/:CustomerId/:statusId')
        .get(orderCtrl.getOrderByCusIdAndStId);

    //Bill
    app.route('/api/bill/:emplId')
    .get( billCtrl.getBillByEmpl);

    app.route('/api/bill')
    .get( billCtrl.getAllBill);
};