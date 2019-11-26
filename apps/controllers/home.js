var express = require('express');
var router = express.Router();
var news = require("../models/news")
var productCtrl = require("../models/product")
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');

router.get("/", function (req, res) {
  res.render("admin/index");
});
router.get("/employee", function (req, res) {
  res.render("admin/employee/index");
});
router.get("/about", function (req, res) {
  res.render("admin/about/index");
});
router.get("/order", function (req, res) {
  res.render("admin/order/index");
});
router.get("/news", function (req, res) {
  res.render("admin/post/index");
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
  res.render("admin/category/index");
});
router.get("/product", function (req, res) {
  res.render("admin/product/index");
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
  res.render("admin/notification/index");
});
router.get("/statistical", function (req, res) {
  res.render("admin/statistical/index");
});
router.get("/404", function (req, res) {
  res.render("error");
});

module.exports = router;