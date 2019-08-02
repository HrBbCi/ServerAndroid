var express = require('express');

var router  = express.Router();

router.use("/admin",require(__dirname+"/admin.js"));
router.use("/blog",require(__dirname+"/blog.js"));

router.get("/",function(req,res){
	//c1
	// res.writeHead(200,{"Content-Type":"text/html"});
	// res.write("<h1>Home Page</h1><br /> "
	// 	+"<a href='/admin'>AdminPage</a> <br />" 
	// 	+"<a href='/blog'>BlogPge</a>");
	// res.end();

	//C2
	// res.json({"message":"This is home page"});

	//C3 
	res.render("test");
});

module.exports = router;

