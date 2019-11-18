'use strict';
module.exports = function (app) {
    var categoryCtrl = require('../models/category');
    var customerCtrl = require('../models/customer');
    var accCustomerCtrl = require('../models/account_customer');
    var productCtrl = require('../models/product');
    var homeCtrl = require('../models/home');
    var newsCtrl = require('../models/news');
    var orderCtrl = require('../models/order');
    var billCtrl = require('../models/bill');
    var jsonCtrl = require('../models/jsons');
    var notiCtrl = require('../models/noti');
    var emplCtrl = require('../models/employee');
    var rwCtrl = require('../models/wirtefile');
    var testCtrl = require('../models/test');
    app.route('/api/test')
    .get(testCtrl.getOrder);
    // todoList Category
    app.route('/api/category')
        .get(categoryCtrl.getAllCategory);
    // .post(categoryCtrl.store);
    app.route('/api/category/:categoryId')
        .get(categoryCtrl.detail)
        .put(categoryCtrl.update)
        .delete(categoryCtrl.delete);

    //Customer
    app.route('/api/customer')
        .get(customerCtrl.getDetailCustomer)
        .delete(customerCtrl.removeAddress);

    app.route('/api/new/address')
        .post(customerCtrl.saveAddress);
    app.route('/api/update/info')
        .put(customerCtrl.updateInfo);
    app.route('/api/update/address')
        .put(customerCtrl.updateAddress);
    app.route('/api/customer/:CustomerId')
        .get(customerCtrl.getDetailCustomerById);
    app.route('/api/customer/findId/:Email')
        .get(customerCtrl.findIdCusByEmail);
    app.route('/api/accCustomer')
        .get(accCustomerCtrl.getAllAccount)
        .post(accCustomerCtrl.save);
    app.route('/api/accCustomer/check')
        .post(accCustomerCtrl.checkAccount);
    app.route('/api/changeP')
        .put(accCustomerCtrl.update);
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
    app.route('/api/product/categoryName/:Name')
        .get(productCtrl.getProductCategoryByName);
    //Home
    app.route('/api/home')
        .get(homeCtrl.getHome);
    //News
    app.route('/api/news')
        .get(newsCtrl.getNews);
    app.route('/api/news2')
        .get(newsCtrl.getNews2);
    //Order
    app.route('/api/order')
        .get(orderCtrl.getOrder)
        .post(orderCtrl.saveOrder);

    app.route('/api/order/:CustomerId')
        .get(orderCtrl.getOrderByCusId);
    app.route('/api/order/:CustomerId/:statusId')
        .get(orderCtrl.getOrderByCusIdAndStId);
    app.route('/api/status')
        .get(orderCtrl.getAllStatus);
    app.route('/api/orderv2')
        .get(orderCtrl.getOrderV2);
    //Bill
    app.route('/api/bill/:emplId')
        .get(billCtrl.getBillByEmpl);
    app.route('/api/bill')
        .get(billCtrl.getAllBill);
    app.route('/api/city')
        .get(jsonCtrl.getCity);
    app.route('/api/city/:id/district')
        .get(jsonCtrl.getDistrict);
    app.route('/api/city/:id/district/:name')
        .get(jsonCtrl.getWard);
    app.route('/api/notify')
        .get(notiCtrl.getAll);
    app.route('/api/notify/:CustomerId')
        .get(notiCtrl.getNotiByIdCustomer);
    app.route('/api/employee')
        .get(emplCtrl.getAll)
        .post(emplCtrl.save);
    app.route('/api/employee/check')
        .post(emplCtrl.checkAccount);
    app.route('/api/employee/:Id')
        .get(emplCtrl.getIdEmpl);
    app.route('/api/read')
        .get(rwCtrl.read);
    app.route('/api/write')
        .put(rwCtrl.write);
};