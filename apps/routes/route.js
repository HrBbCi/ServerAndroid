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
    var multipleUploadController = require('../controllers/multipleUploadController');

	//Upload
    app.route("/multiple-upload")
        .post(multipleUploadController.multipleUpload);

	//Test
    app.route('/api/test')
        .put(testCtrl.deleteEmpl);
		
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

	app.route('/api/customer/listID')
        .get(customerCtrl.listIDCustomer);
        
		
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
		
    app.route('/api/checkMail')
        .post(accCustomerCtrl.checkEmail);
		
    app.route('/api/changeP')
        .put(accCustomerCtrl.update);
		
    //Product 
    app.route('/api/product')
        .get(productCtrl.getAll)
        .post(productCtrl.saveProduct)
		.put(productCtrl.updateProduct)
        .delete(productCtrl.deleteProduct);

    app.route('/api/product/saveValue')
        .post(productCtrl.saveValueImage)
		.delete(productCtrl.deleteValue);

    app.route('/api/lastestId/:id')
        .get(productCtrl.getLastestIdByName);

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
        .get(newsCtrl.getNews)
        .post(newsCtrl.saveNews)
		.put(newsCtrl.updateNews)
        .delete(newsCtrl.deleteNews);
		
    app.route('/api/news2')
        .get(newsCtrl.getNews2);
		
	app.route('/api/getNewsById/:id')
        .get(newsCtrl.getNewsById);
		
    //Order
    app.route('/api/order')
        .get(orderCtrl.getOrder)
        .post(orderCtrl.saveOrder);

    app.route('/api/order/:CustomerId')
        .get(orderCtrl.getOrderByCusId);
		
    app.route('/api/order/:CustomerId/:statusId')
        .get(orderCtrl.getOrderByCusIdAndStId);
		
    app.route('/api/orderv2/:CustomerId/:statusId')
        .get(orderCtrl.getOrderByCusIdAndStIdV2);
		
    app.route('/api/status')
        .get(orderCtrl.getAllStatus);
		
    app.route('/api/orderv3')
        .get(orderCtrl.getOrderV2);
		
    app.route('/api/orderv2')
        .get(orderCtrl.getOrderV3);
		
    app.route('/api/order/update')
        .put(orderCtrl.updateOrder);
		
    app.route('/api/order/delete')
        .put(orderCtrl.deleteOrder);

    app.route('/api/orderf/:stId')
        .get(orderCtrl.filterv1);
		
    //Bill
    app.route('/api/bill/:emplId')
        .get(billCtrl.getBillByEmpl);
		
    app.route('/api/bill')
        .get(billCtrl.getAllBill)
        .post(billCtrl.saveBill);
		
    app.route('/api/billv1')
        .get(billCtrl.getAllBillV1);

	//Notify
    app.route('/api/notify')
        .get(notiCtrl.getAll)
        .post(notiCtrl.saveNoti)
		.put(notiCtrl.updateNoti)
		.delete(notiCtrl.deleteNotify)
		;
		
    app.route('/api/notify/:CustomerId')
        .get(notiCtrl.getNotiByIdCustomer);
	
	//Employee
    app.route('/api/employee')
        .get(emplCtrl.getAll)
        .post(emplCtrl.save)
		.put(emplCtrl.deleteEmpl);
	app.route('/api/employee/update2')
		.put(emplCtrl.updateEmployee);

		
    app.route('/api/employee/check')
        .post(emplCtrl.checkAccount);
		
	app.route('/api/employee/findLast')
        .get(emplCtrl.getLastestId);
		
    app.route('/api/employee/:Id')
        .get(emplCtrl.getIdEmpl);
	app.route('/api/employee/findEmail/:Id')
        .get(emplCtrl.getEmailEmpl);
		
	app.route('/api/employee/findEmpl/:Id')
        .get(emplCtrl.getEmplById);
	
	//Read write
    app.route('/api/read')
        .get(rwCtrl.read);
		
    app.route('/api/write')
        .put(rwCtrl.write);
		
	app.route('/api/city')
        .get(jsonCtrl.getCity);
		
    app.route('/api/city/:id/district')
        .get(jsonCtrl.getDistrict);
		
    app.route('/api/city/:id/district/:name')
        .get(jsonCtrl.getWard);
};