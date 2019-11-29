'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');
function generateId(IDD) {
    console.log(IDD);
    var string2 = IDD;
    IDD = IDD.substring(2, IDD.length);
    var id = string2.substring(0, 2);
    var lent = IDD.length;
    var num = parseInt(IDD) + 1;
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
    getNotiByIdCustomer: (req, res) => {
        let sqlNoti = "SELECT * from notify where TypeO = ? OR (customerId = ? AND TypeO = ?)";
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {
            var arr = [];
            conn.query(sqlNoti,['all',req.params.CustomerId,'1'],function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, []);
                } else {
                    var notify = [];
                    for(let i = 0 ; i < resultsQuery.length ; i++){
						var abc = {
							"key": resultsQuery[i].Key,
							"Id": resultsQuery[i].Id,
							"CustomerId": resultsQuery[i].CustomerId,
							"Notify": resultsQuery[i].Notify,
							"TypeO": resultsQuery[i].TypeO,
							"Date": resultsQuery[i].Date
						}
						notify.push(abc);
					} 
                    callback(null, notify);
                }
            })
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
    getAll: (req, res) => {
        let sqlNoti = "SELECT nt.Key, nt.Id, nt.CustomerId, nt.Notify, nt.TypeO, nt.Date from notify as nt";
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {
            var arr = [];
            conn.query(sqlNoti,function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, []);
                } else {
                    var notify = [];
                    for(let i = 0 ; i < resultsQuery.length ; i++){
						var abc = {
							"key": resultsQuery[i].Key,
							"Id": resultsQuery[i].Id,
							"CustomerId": resultsQuery[i].CustomerId,
							"Notify": resultsQuery[i].Notify,
							"TypeO": resultsQuery[i].TypeO,
							"Date": resultsQuery[i].Date
						}
						notify.push(abc);
					} 
                    callback(null, notify);
                }
            })
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
	updateNoti: (req, res) => {
        let data = req.body;
        var arrayOfFuncs = [];
        //Get Id Customer
        let sqlupdateNoti = "UPDATE notify SET CustomerId = ?, Notify = ?, TypeO = ? WHERE `Key` = ? ";
        var func_2 = function (callback) {
            conn.query(sqlupdateNoti,[data.CustomerId,data.Notify,data.TypeO,data.Key], (error, response) => {
                if (error) {
                    console.log('sqlupdateNoti');
                    callback(null, {
                        "result": "null"
                    });
                } else {
                    if (response.length === 0 || response === null) {
                        callback(null, {
                            "result": "null"
                        });
                    } else {                   
                        var final1 = {
                            "result": 'ok'
                        };
						console.log(final1);
                        callback(null, final1);
                    }

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
    },
    getNotiByKey: (req, res) => {
        let sqlNoti = "SELECT nt.Key, nt.Id, nt.CustomerId, nt.Notify, nt.TypeO, nt.Date from notify as nt where nt.Key = ?";
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {
            var arr = [];
            conn.query(sqlNoti,[req.body.Key],function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, []);
                } else {
                    var notify = [];
                    for(let i = 0 ; i < resultsQuery.length ; i++){
						var abc = {
							"key": resultsQuery[i].Key,
							"Id": resultsQuery[i].Id,
							"CustomerId": resultsQuery[i].CustomerId,
							"Notify": resultsQuery[i].Notify,
							"TypeO": resultsQuery[i].TypeO,
							"Date": resultsQuery[i].Date
						}
						notify.push(abc);
					} 
                    callback(null, notify);
                }
            })
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
	deleteNotify: (req, res) => {
        let data = req.body;
        let id = data.id;
        let sql = 'DELETE FROM `notify` WHERE `Key` = ?'
       
        conn.query(sql, [id], (err, response) => {
            if (err) {
				console.log(sql)
				throw err	
			}
            res.json({
                message: 'Delete success!'
            })
        })
    },
    saveNoti: (req, res) => {
        let data = req.body;
        var arrayOfFuncs = [];

        //Get Id Customer
        let sqlIdNoti = "SELECT * FROM notify ORDER BY Id DESC LIMIT 1";
        var func_2 = function (callback) {
            conn.query(sqlIdNoti, (error, response) => {
                if (error) {
                    console.log('sqlIdOrder');
                    callback(null, {
                        "mes": "null"
                    });
                } else {
                    if (response.length === 0 || response === null) {
                        callback(null, {
                            "mes": "null"
                        });
                    } else {
                        var result = generateId(response[0].Id);
                        var final1 = {
                            "mes": result
                        };
                        callback(null, final1);
                    }

                }
            })
        }
        arrayOfFuncs.push(func_2);

        let sql = 'INSERT INTO notify(Id,CustomerId,Notify,TypeO,Date) ' +
            ' VALUES(?,?,?,?,?)';
        var func_sql = function (prevData, callback) {
            if (prevData.mes !== "null") {
                conn.query(sql, [prevData.mes, data.CustomerId, data.Notify, data.TypeO, data.Date],
                    (error, response) => {
                        if (error) {
                            console.log('error' + error);
                            callback(error, null);
                        } else {
                            var mes = {
                                'mes': 'ok'
                            };
                            callback(null, mes);
                        }
                    })
            } else {
                conn.query(sql, ["NT0000",data.CustomerId, data.Notify,'', data.Date],
                    (error, response) => {
                        if (error) {
                            console.log('error' + error);
                            callback(error, null);
                        } else {
                            var mes = {
                                'mes': 'ok'
                            };
                            callback(null, mes);
                        }
                    })
            }

        }
        arrayOfFuncs.push(func_sql);
        async.waterfall(arrayOfFuncs, function (errString, finalResult) {
            if (errString) {
                return res.send(errString);
            } else {
                return res.send(finalResult);
            }
        });
    }
}