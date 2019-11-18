'use strict';
const path = require('path')
var fs = require('fs');
var async = require('async');
module.exports = {
	read: (req, res) => {
		var arrayOfFuncs = [];
		var func_1 = function (callback) {
			let reqPath = path.join(__dirname, 'note.txt');
			fs.readFile(reqPath, 'utf8', function(err, data) {
				if (err) {
                    console.log('error');
                    callback(error, null);
                }else{
					var data = {
						'data': data
					};
					callback(null, data);
				}
			});
		}
		arrayOfFuncs.push(func_1);
        async.waterfall(arrayOfFuncs, function (errString, finalResult) {
            if (errString) {
                return res.send(errString);
            } else {
                return res.send(finalResult);
            }
        });	
	},
	write:(req, res) => {
		console.log(req.body.note);
		var arrayOfFuncs = [];
		var func_1 = function (callback) {
			let reqPath = path.join(__dirname, 'note.txt');
			fs.writeFile(reqPath, req.body.note, function (err) {
				if (err) {
                    console.log('error');
                    callback(error, null);
                }else{
					console.log('ok');
					var mes = {
						'ok': 'ok'
					};
					callback(null, mes);
				}
			});
		}
		arrayOfFuncs.push(func_1);
        async.waterfall(arrayOfFuncs, function (errString, finalResult) {
            if (errString) {
                return res.send(errString);
            } else {
                return res.send(finalResult);
            }
        });	
		
	}
}

