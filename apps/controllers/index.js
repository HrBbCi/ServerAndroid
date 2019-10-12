var express = require('express');

var router = express.Router();

router.use("/admin", require(__dirname + "/home.js"));

router.get("/", function (req, res) {
	res.render("admin/index");
});
router.get("/log", function (req, res) {
	res.render("admin/log");
});

router.get("/logout", function (req, res) {
	res.render("signin");
});

module.exports = router;