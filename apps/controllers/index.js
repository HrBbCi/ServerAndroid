var express = require('express');
const path = require('path')
var fs = require('fs');
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
	let reqPath = path.join(__dirname, '../models/note.txt');
	fs.writeFile(reqPath, "", function (err) {
		if (err) {
			console.log('error');
			res.redirect("../");
		}else{		
			var mes = {
				'ok': 'ok'
			};
			res.redirect("../");
		}
	});
	
});
router.get("/up", function (req, res) {
	res.render("upload");
});
module.exports = router;