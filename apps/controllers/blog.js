var express = require('express');

var router  = express.Router();

router.get("/",function(req,res){
	res.writeHead(200,{"Content-Type":"text/html"});
	res.write("<h1>BlogPage</h1>")
	res.end();


	// res.json({"message":"This is blog page"});

});

module.exports = router;

