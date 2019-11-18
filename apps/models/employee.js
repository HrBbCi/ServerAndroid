'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var helper = require("../helpers/helper");
var async = require('async');

function generateIdEmployee(string) {
	var string2 = string;
	string = string.substring(2, string.length);
	var id = string2.substring(0, 2);
	var lent = string.length;
	var num = parseInt(string) + 1;
	var string_num = num + "";
	var lent2 = lent - string_num.length
	var result = id;
	if (lent2 < 0) {
		result += num;
	} else if (lent2 === 0) {
		result += num;
	} else {
		for (var i = 0; i < lent2; i++) {
			result += "0";
		}
		result += num;
	}
	return result;
}
module.exports = {
	getAll: (req, res) => {
		let sql = 'SELECT employee.*, ae.password FROM employee, accountemployee as ae where status  = 1 and ae.Username = employee.Email '
		var arrayOfFuncs = [];
		var func_sql = function (callback) {
			conn.query(sql, (error, response) => {
				if (error) {
					console.log('error');
					callback(error, null);
				} else {
					var mes = [];
					if (response == null || response.length == 0) {
						mes =[];
					} else {
						for(let i = 0 ; i<response.length;i++){
							mes.push({
								"Id": response[i].Id,
								"Fullname": response[i].Fullname,
								"StartWork": response[i].StartWork,
								"Email": response[i].Email,
								"Role": response[i].Role,
								"Phone": response[i].Phone,
								"Phone": response[i].Phone,
								"Salary": response[i].Salary,
								"Salary": response[i].Salary,
								"Image": response[i].Image,
								"NumApartment": response[i].NumApartment,
								"Ward": response[i].Ward,
								"District": response[i].District,
								"City": response[i].City,
								"Password": response[i].password,
							});
						}
					}

					callback(null, mes);
				}
			})
		}
		arrayOfFuncs.push(func_sql);
		async.waterfall(arrayOfFuncs, function (errString, finalResult) {
			if (errString) {
				return res.send(errString);
			} else {
				return res.send(finalResult);
			}
		});
	},
	getIdEmpl: (req, res) => {
		let sql = 'SELECT * FROM employee where status  = 1 and email = ?'
		conn.query(sql, [req.params.Id],(err, response) => {
			if (err) throw err
			res.json(response)
		})
	},
	checkAccount: (req, res) => {
		let data = req.body;
		let sql = 'SELECT password FROM accountemployee where username = ?';
		var arrayOfFuncs = [];
		var func_sqlCheck = function (callback) {
			conn.query(sql, [data.Email], (err, response) => {
				if (err) {
					callback(null, {
						"mes": "null"
					});
				}
				if (response[0] == null) {
					callback(null, {
						"mes": "null"
					});
				} else {
					if (helper.compare_password(data.Password, response[0].password)) {
						callback(null, {
							"mes": data.Email
						});
					} else {
						callback(null, {
							"mes": "null"
						});
					}
				}
			})
		}
		arrayOfFuncs.push(func_sqlCheck);
		let sqlAcc = 'SELECT Role FROM employee where status  = 1 AND Email = ?';
		var func_1 = function (prevData, callback) {
			if (prevData.mes !== "null") {
				conn.query(sqlAcc, [prevData.mes], (error, response) => {
					if (error) {
						console.log('sqlAcc');
						callback(null, {
							"mes": "null"
						});
					} else {
						var mes1 = {
							'mes': response[0].Role
						};
						callback(null, mes1);
					}
				})
			} else {
				callback(null, {
					"mes": "null"
				});
			}
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
	save: (req, res) => {
		let data = req.body;
		let sqlCheck = 'SELECT username FROM accountemployee where username = ?'
		var arrayOfFuncs = [];
		var func_sqlCheck = function (callback) {
			conn.query(sqlCheck, [data.Email], (error, response) => {
				if (error) {
					console.log('error');
					callback(error, null);
				} else {
					var mes = {};

					if (response == null || response.length == 0) {
						mes = {
							'mes': 'null'
						};
					} else {
						mes = {
							'mes': 'ok'
						};
					}

					callback(null, mes);
				}
			})
		}
		arrayOfFuncs.push(func_sqlCheck);

		let sqlAcc = "INSERT INTO accountemployee(Username,Password,Enabled) VALUES(?,?,'1')";
		//Save AccountEmployee
		var func_1 = function (prevData, callback) {
			if (prevData.mes === "null") {
				conn.query(sqlAcc, [data.Email, helper.hash_password(data.Password)], (error, response) => {
					if (error) {
						console.log('sqlAcc');
						callback(null, {
							"mes": "null"
						});
					} else {
						var mes1 = {
							'mes': 'Insert acc success!'
						};
						callback(null, mes1);
					}
				})
			} else {
				callback(null, {
					"mes": "null"
				});
			}
		}
		arrayOfFuncs.push(func_1);

		//Get Id Employee
		let sqlIdEmpl = "SELECT * FROM Employee ORDER BY ID DESC LIMIT 1";
		var func_2 = function (prevData, callback) {
			if (prevData.mes !== "null") {
				conn.query(sqlIdEmpl, (error, response) => {
					if (error) {
						console.log('sqlIdEmpl');
						callback(null, {
							"mes": "null"
						});
					} else {
						var result = generateIdEmployee(response[0].Id);
						var final1 = {
							"mes": prevData.mes,
							"result": result
						};
						callback(null, final1);
					}
				})
			} else {
				callback(null, {
					"mes": "null"
				});
			}
		}
		arrayOfFuncs.push(func_2);
		//Save Employee
		var sqlCus = "INSERT INTO employee(Id,AccountUn,Fullname, StartWork, Email,Role,Phone,Salary,Image, NumApartment,Ward, District, City, Status) " +
			"VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		var func_3 = function (prevData, callback) {
			if (prevData.mes1 !== "null") {
				conn.query(sqlCus, [prevData.result, data.Email, data.Fullname, data.StartWork, data.Email, data.Role, data.Phone, data.Salary,
					data.Image, data.NumApartment, data.Ward, data.District, data.City, '1'
				], (error, response) => {
					if (error) {
						console.log('error');
						callback(null, {
							"mes": "null"
						});
					} else {
						var final = {
							"mes": "ok"
						};
						callback(null, final);
					}

				})
			} else {
				callback(null, {
					"mes": "null"
				});
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
	updateAccount: (req, res) => {
		let data = req.body;
		let sql = 'UPDATE accountemployee SET password = ? WHERE Username = ?'
		conn.query(sql, [helper.hash_password(data.Password), data.Username], (err, response) => {
			if (err) throw err
			res.json({
				mes: 'Update!'
			})
		})
	},
	updateInfo: (req, res) => {

		let data = req.body;
		var arrayOfFuncs = [];
		let sqlAcc = 'SELECT Role FROM employee where status  = 1 AND Email = ?';
		var func_1 = function (callback) {
			conn.query(sqlAcc, data.Username, (error, response) => {
				if (error) {
					console.log('sqlAcc');
					callback(null, {
						"mes": "null"
					});
				} else {
					var mes1 = {
						'mes': response[0].Role
					};
					callback(null, mes);
				}
			})
		}
		arrayOfFuncs.push(func_1);
		var func_2 = function (prevData, callback) {
			if (prevData.mes === "admin") {
				let sql_2 = "UPDATE employee SET AccountUn = ? , Fullname = ?, StartWork =? , Email = ?, Role =?,Phone=?,Salary=?, " +
					"Image=?,NumApartment=?,Ward=?,District=?,City=? WHERE Username = ?";
				conn.query(sql_2, [data.Email, data.Fullname, data.StartWork, data.Email, data.Role, data.Phone, data.Salary,
					data.Image, data.NumApartment, data.Ward, data.District, data.City, data.Username
				], (err, response) => {
					if (error) {
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
			} else {
				let sql_2 = "UPDATE employee SET AccountUn = ? , Fullname = ? , Email = ? ,Phone=?, " +
					"Image=?,NumApartment=?,Ward=?,District=?,City=? WHERE Username = ?";
				conn.query(sql_2, [data.Email, data.Fullname, data.Email, data.Phone, data.Salary,
					data.Image, data.NumApartment, data.Ward, data.District, data.City, data.Username
				], (err, response) => {
					if (error) {
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
		}
		arrayOfFuncs.push(func_2);

		async.waterfall(arrayOfFuncs, function (errString, finalResult) {
			if (errString) {
				return res.send(errString);
			} else {
				return res.send(finalResult);
			}
		});
	},
	delete: (req, res) => {
		let data = req.body;
		let sql = 'UPDATE accountemployee SET Enabled =  0 WHERE Username = ?'
		conn.query(sql, [data.Username], (err, response) => {
			if (err) throw err
			res.json({
				message: 'ok'
			})
		})
	}
}