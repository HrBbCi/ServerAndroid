'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var helper = require("../helpers/helper");
var async = require('async');
function generateIdCustomer(string) {
	var string2 = string;
	string = string.substring(2,string.length);
	var id = string2.substring(0,2);
	var lent = string.length;
	var num = parseInt(string) + 1;
	var string_num = num+"";
	var lent2 = lent-string_num.length
	var result = id;
	if(lent2 < 0){
	  result += num;
	}
	else if(lent2 === 0 ){
		result += num;
	}
	else{
	  for(var i  = 0 ; i<lent2;i++){
		result += "0";
	  }
	  result+=num;
	}
	return result;
}

module.exports = {
    getAllAccount: (req, res) => {
        let sql = 'SELECT * FROM accountcustomer'
        conn.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    checkAccount: (req, res) => {
        let data = req.body;
        let sql = 'SELECT password FROM accountcustomer where username = ?'
        conn.query(sql, [data.email], (err, response) => {
            if (err) throw err
            if (response[0] == null) {
                res.json({
					"message": "null"
                });
            } else {
                // console.log(data.password,response[0].password);
                // console.log(helper.compare_password(data.password,response[0].password));
                if(helper.compare_password(data.password,response[0].password)){
                    res.json({
                        "message": "success"
                    })
                }else{
                    res.json({
                       "message": "fail"
                    });
                }
            }
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM accountcustomer WHERE Id = ?'
        conn.query(sql, [req.params.Username], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let customerId = req.params.customerId;
        let sql = 'UPDATE accountcustomer SET ? WHERE id = ?'
        conn.query(sql, [data, customerId], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },
    save: (req, res) => {
		let data = req.body;
		let sqlCheck = 'SELECT username FROM accountcustomer where username = ?'
		var arrayOfFuncs = [];
		var func_sqlCheck = function (callback) {		
			conn.query(sqlCheck, [data.email], (error, response) => {
				if (error) {
					console.log('error');
					callback(error, null);
				} else {	
					var mes  ={};
					
					if(response == null || response.length ==0){
						mes = {
							'mes':'null'
						};
					}else{
						mes = {
							'mes':'ok'
						};
					} 
					
					callback(null, mes);
				}
			})		
		}
		arrayOfFuncs.push(func_sqlCheck);
		
        let sqlAcc = "INSERT INTO accountcustomer(Username,Password,Enabled) VALUES(?,?,'1')";
		//Save AccountCustomer
		var func_1 = function (prevData,callback) {		
			if(prevData.mes === "null"){
				conn.query(sqlAcc, [data.email, helper.hash_password(data.password)], (error, response) => {
					if (error) {
						console.log('sqlAcc');
						callback(null, {"mes1":"null"});
					} else {		
						var mes1 = {
							'mes1':'Insert acc success!'
						};
						callback(null, mes1);
					}
				})
			}else{
				console.log("{'mes1':'null'}");
				callback(null, {"mes1":"null"});
			}
		}
		arrayOfFuncs.push(func_1);
		
		//Get Id Customer
		let sqlIdCustomer = "SELECT * FROM Customer ORDER BY ID DESC LIMIT 1";
		var func_2 = function (prevData,callback) {
			if(prevData.mes1 !== "null"){
				conn.query(sqlIdCustomer, (error, response) => {
					if (error) {
						console.log('sqlIdCustomer');
						callback(null, {"mes1":"null"});
					} else {
						console.log(response[0].Id)
						var result = generateIdCustomer(response[0].Id);
						var final1 = {
							"mes1": prevData.mes1,
							"result": result   
						};
						callback(null, final1);
					}
				})
			}else{
				console.log("hello");
				callback(null, {"mes1":"null"});
			}
		}
		arrayOfFuncs.push(func_2);
		// //Save Customer 
        var sqlCus = "INSERT INTO customer(Id,AccountUn,Fullname, Level, Email) VALUES(?,?,?,'1',?)";
        var func_3 = function (prevData,callback) {
			if(prevData.mes1 !== "null"){
				conn.query(sqlCus, [prevData.result, data.email, data.fullname,data.email], (error, response) => {
					if (error) {
						console.log('error');
						callback(null, {"mes1":"null"});
					} else {
						var final = {
							"mes1": "ok"
						};
						callback(null, final);
					}
					
				})
			}else{
				console.log("hello");
				callback(null, {"mes1":"null"});
			}
		}
		arrayOfFuncs.push(func_3);
		async.waterfall(arrayOfFuncs, function (errString, finalResult) {
			if (errString) {
				return res.send(errString);
			} else {
				return res.send(finalResult);
			}
		});
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM accountcustomer WHERE id = ?'
        conn.query(sql, [req.params.customerId], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Delete success!'
            })
        })
    }
}