var express = require('express');
var router = express.Router();
var news = require("../models/news")
var productCtrl = require("../models/product")
var emplCtrl = require("../models/employee")
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');
const path = require('path')
var fs = require('fs');
router.get("/", function (req, res) {
	let reqPath = path.join(__dirname, '../models/note.txt');
	fs.readFile(reqPath, 'utf8', function(err, data) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{
			if(data === null || data.length ===0){
				res.redirect("../");
			}else{
				res.render("admin/index");
			}		
		}
	});
});
router.get("/employee", function (req, res) {
	let reqPath = path.join(__dirname, '../models/note.txt');
	fs.readFile(reqPath, 'utf8', function(err, data) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{
			if(data === null || data.length ===0){
				res.redirect("../");
			}else{
				var result = data.split(";");
				if(result[2] === "admin"){
                    res.render("admin/employee/index");
                }else{
                    res.redirect(".");
                }
				 
			}		
		}
	});
  
});

router.get("/employee/save", function (req, res) {
  res.render("admin/employee/add");
});
router.get("/employee/edit/:id", function (req, res) {
  let sql = 'SELECT employee.*, ae.password FROM employee, accountemployee as ae where status  = 1 and ae.Username = employee.Email AND employee.Id  = ? '
  conn.query(sql, [req.params.id],(error, response) => {
	if (error) {
		console.log('/employee/edit/:id');
		res.redirect("../../employee");
	}else{
		var employee = [];
		if (response == null || response.length == 0) {
			res.redirect("../../employee");
		} else {
			for(let i = 0 ; i<response.length;i++){
				employee.push({
					"Id": response[i].Id,
					"Fullname": response[i].Fullname,
					"StartWork": response[i].StartWork,
					"Email": response[i].Email,
					"Role": response[i].Role,
					"Phone": response[i].Phone,
					"Salary": response[i].Salary,
					"Image": response[i].Image,
					"NumApartment": response[i].NumApartment,
					"Ward": response[i].Ward,
					"District": response[i].District,
					"City": response[i].City,
					"Password": response[i].password,
					"Status" : response[i].Status
				});
			}
			res.render("admin/employee/edit",{employee: employee[0]})
		}	
	}
  })

});
router.get("/about", function (req, res) {
  res.render("admin/about/index");
});
router.get("/profile", function (req, res) {
  res.render("admin/about/index");
});
router.get("/order", function (req, res) {
	let reqPath = path.join(__dirname, '../models/note.txt');
	fs.readFile(reqPath, 'utf8', function(err, data) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{
			if(data === null || data.length ===0){
				res.redirect("../");
			}else{
				 res.render("admin/order/index");
			}		
		}
	});
  
});
router.get("/news", function (req, res) {
	let reqPath = path.join(__dirname, '../models/note.txt');
	fs.readFile(reqPath, 'utf8', function(err, data) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{
			if(data === null || data.length ===0){
				res.redirect("../");
			}else{
				 res.render("admin/post/index");
			}		
		}
	});
 
});

router.get("/news/save", function (req, res) {
  res.render("admin/post/add");
});
router.get("/news/edit/:id", function (req, res) {
  let sqlNews = 'SELECT * FROM news where id = ?';
	conn.query(sqlNews,[req.params.id], function (error, resultsQuery, fields) {
		if (error) {
			console.log('/news/edit/:id');
			res.redirect("../../news");
		} else {
			
			if(resultsQuery === null || resultsQuery.length ===0){
				res.redirect("../../news");
			}else{
				var k = resultsQuery[0];
				res.render("admin/post/edit",
					{
						id: req.params.id,
						title: k.title,
						emplID: k.emplID,
						description: k.description,
						image: k.image,
						link: k.link
					}
				);
			}
			
		}
	})
});
router.get("/category", function (req, res) {
	let reqPath = path.join(__dirname, '../models/note.txt');
	fs.readFile(reqPath, 'utf8', function(err, data) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{
			if(data === null || data.length ===0){
				res.redirect("../");
			}else{
				var result = data.split(";");
				if(result[2] === "admin"){
                    res.render("admin/category/index");
                }else{
                    res.redirect(".");
                }
				
			}		
		}
	});
  
});
router.get("/product", function (req, res) {
  let reqPath = path.join(__dirname, '../models/note.txt');
	fs.readFile(reqPath, 'utf8', function(err, data) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{
			if(data === null || data.length ===0){
				res.redirect("../");
			}else{
				res.render("admin/product/index");
			}		
		}
	});
  
});
router.get("/product/save", function (req, res) {
  res.render("admin/product/add");
});

router.get("/product/edit/:id", function (req, res) {
	let sql = "SELECT distinct pd.Id as pdId, pd.Figure as TotalFigure, pd.Description," +
            " pd.Rate, pd.Material,pd.Type, dp.Size, dp.Tittle, dp.Name as dpName, dp.CoverPrice,dp.OriginPrice,dp.Figure as DpFirgure, " +
            " cl.Id as clId, cl.Name as clName, ct.Id as ctId, ct.Name as ctName, " +
            " vu.Id as vuId ,vu.UrlImage as vuImage ,vu.UrlVideo as vuVideo" +
            " from product as pd, detailproduct as dp, color as cl, category as ct," +
            " valueurl as vu where pd.Id = dp.ProductId and cl.Id = dp.ColorId" +
            " AND ct.Id = pd.CategoryId AND vu.ProductsId = pd.Id AND pd.Id  = ?";
	conn.query(sql,[req.params.id], function (error, resultsQuery, fields) {
		if (error) {
			console.log('/product/edit/:id');
			res.redirect("../../product");
		} else {
			 var arr = [];
			if(resultsQuery === null || resultsQuery.length ===0){
				res.redirect("../../product");
			}else{
				var products = productCtrl.getPById(resultsQuery);
				// var kk = products[0];
				res.render("admin/product/edit",
					{
						products: products[0]
					}
				);
			}
			
		}
	})

});
router.get("/notification", function (req, res) {
	let reqPath = path.join(__dirname, '../models/note.txt');
	fs.readFile(reqPath, 'utf8', function(err, data) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{
			if(data === null || data.length ===0){
				res.redirect("../");
			}else{
				res.render("admin/notification/index");
			}		
		}
	});
  
});
router.get("/notification/save", function (req, res) {
  res.render("admin/notification/add");
});
router.get("/notification/edit/:id", function (req, res) {
   let sqlNoti = "SELECT nt.Key, nt.Id, nt.CustomerId, nt.Notify, nt.TypeO, nt.Date from notify as nt where nt.Key = ?";
	conn.query(sqlNoti,[req.params.id],function (error, resultsQuery, fields) {
		if (error) {
			console.log('error');
			res.redirect("../../notification");
		} else {
			var notify = [];
			if(resultsQuery === null || resultsQuery.length ===0){
				res.redirect("../../notification");
			}else{
				for(let i = 0 ; i < resultsQuery.length ; i++){
					var abc = {
						"Key": resultsQuery[i].Key,
						"Id": resultsQuery[i].Id,
						"CustomerId": resultsQuery[i].CustomerId,
						"Notify": resultsQuery[i].Notify,
						"TypeO": resultsQuery[i].TypeO,
						"Date": resultsQuery[i].Date
					}
					notify.push(abc);
				} 
				res.render("admin/notification/edit",
					{
						notification: notify[0]
					}
				);
			}	
		}
	})   

});
router.get("/customer", function (req, res) {
	let reqPath = path.join(__dirname, '../models/note.txt');
	fs.readFile(reqPath, 'utf8', function(err, data) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{
			if(data === null || data.length ===0){
				res.redirect("../");
			}else{
				
				res.render("admin/customer/index");
			}		
		}
	});
 
});
router.get("/statistical", function (req, res) {
	let reqPath = path.join(__dirname, '../models/note.txt');
	fs.readFile(reqPath, 'utf8', function(err, data) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{
			if(data === null || data.length ===0){
				res.redirect("../");
			}else{
				res.render("admin/statistical/index");
			}		
		}
	});
  
});
router.get("/404", function (req, res) {
  let reqPath = path.join(__dirname, '../models/note.txt');
	fs.readFile(reqPath, 'utf8', function(err, data) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{
			if(data === null || data.length ===0){
				res.redirect("../");
			}else{
				 res.render("error");
			}		
		}
	});
 
});

module.exports = router;