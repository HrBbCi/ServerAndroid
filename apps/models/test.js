'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');

module.exports = {
	deleteEmpl: (req, res) => {
		let data = req.body;
		console.log(data.Username+";;"+data)		
		var arrayOfFuncs = [];
		let sqldeleteEmpl = 'UPDATE accountemployee SET Enabled =  ? WHERE Username = ? ';
		var func_1 = function (callback) {
			conn.query(sqldeleteEmpl, [0,data.Username], (error, response) => {
				if (error) {
					console.log('sqldeleteEmpl' +error);
					callback(null, {
						"mes": "null"
					});
				} else {
					var mes = {
						'mes': 'ok'
					};
					callback(null, mes);
				}
			})
		}
		arrayOfFuncs.push(func_1);
		var func_2 = function (prevData, callback) {
			let sql_2 = "UPDATE employee SET Status = ? WHERE Email = ?";
			conn.query(sql_2, [0,data.Username], (err, response) => {
				if (err) {
					console.log(sql_2);
					callback(null, {
						"mes": "null"
					});
				} else {
					var mes = {
						'mes': 'Ok'
					};
					callback(null, mes);
				}
			})
		}
		arrayOfFuncs.push(func_2);

		async.waterfall(arrayOfFuncs, function (errString, finalResult) {
			if (errString) {
				return res.send(errString);
			} else {
				return res.send(finalResult);
			}
		});
	}
}