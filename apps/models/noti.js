'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');

module.exports = {
    getNotiByIdCustomer: (req, res) => {
        let sqlNoti = "SELECT * from shoes.notify where TypeO = ? OR (customerId = ? AND TypeO = ?)";
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
        let sqlNoti = "SELECT nt.Id, nt.CustomerId, nt.Notify, nt.TypeO, nt.Date from shoes.notify as nt";
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
    }
}