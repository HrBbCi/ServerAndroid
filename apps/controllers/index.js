var express = require('express');

var router = express.Router();

router.use("/admin", require(__dirname + "/home.js"));

router.get("/", function (req, res) {
	res.render("signin");
});
router.get("/log", function (req, res) {
	res.render("admin/log");
});
router.get("/404", function (req, res) {
	res.render("error");
});
router.get("/logout", function (req, res) {
	res.render("signin");
});
router.get("/up", function (req, res) {
	res.render("upload");
});
module.exports = router;