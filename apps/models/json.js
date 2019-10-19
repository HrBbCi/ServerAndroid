const path = require('path')
var fs = require('fs');
module.exports = {
    getCity: (req, res) => {
		let reqPath = path.join(__dirname, 'local.json');

		fs.readFile(reqPath , 'utf8', function (err, data) {
		   if(!err) {
			  var jsonObj = JSON.parse(data);
	
			  var list =[];
			  for(let i = 0 ;i<jsonObj.length;i++){
				  list.push( {
					  "id": jsonObj[i].id,
					  "name":jsonObj[i].name
				  });
			  }
			  res.json(list)
			}else {
			   //Handle Error
			   res.end("Error: "+err )
			}
	   });
	},
	getDistrict: (req, res) => {
		let data1 = req.params;
		var id = data1.id;
		
		let reqPath = path.join(__dirname, 'local.json');

		fs.readFile(reqPath , 'utf8', function (err, data) {
		   if(!err) {
				var jsonObj = JSON.parse(data);
				var districts = [];
			
				for(let i = 0 ; i < jsonObj.length;i++){
					var result_city = jsonObj[i].id;
					result_city = result_city.toString('utf-8').trim();
					if(result_city===id){
						districts = jsonObj[i].districts;
						break;
					}
				}	
			
				res.json(districts)
			
			}else {
			   //Handle Error
			   res.json({
					"Err": "error"
				})
			}
	   });
	},
	getWard: (req, res) => {
		let data1 = req.params;
		
		var id = data1.id;
		var name =  data1.name;
		
		let reqPath = path.join(__dirname, 'local.json');

		fs.readFile(reqPath , 'utf8', function (err, data) {
		   if(!err) {
				var jsonObj = JSON.parse(data);
				var districts = [];
				var wards = [];
				for(let i = 0 ; i < jsonObj.length;i++){
					var id1 = jsonObj[i].id;	
					var districts = [];
					if(id1 === id ){	
						districts = jsonObj[i].districts;
					
						for(let j = 0 ; j < districts.length;j++){
							if(districts[j].name === name){
								wards = districts[j].wards;
								break;
							}
						}
					}
				}	

				res.json(wards)
			
			}else {
			   //Handle Error
			   res.json({
					"Err": "error"
				})
			}
	   });
	}
}
