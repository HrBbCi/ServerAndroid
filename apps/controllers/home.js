var express = require('express');
var router = express.Router();
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
router.get("/category", function (req, res) {
  res.render("admin/category/index");
});
router.get("/product", function (req, res) {
  res.render("admin/product/index");
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