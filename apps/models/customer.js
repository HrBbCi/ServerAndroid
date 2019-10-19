'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var helper = require("../helpers/helper");
var async = require('async');

function element_obj_f(arr) {
    var element_obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] in element_obj) {
            element_obj[arr[i]].push(i);
        } else {
            element_obj[arr[i]] = [i];
        }
    }
    return element_obj;
}

function convertToArr(resultsQuery, arr1) {
    var element_obj = element_obj_f(arr1);
    var k11 = [];
    //K11
    for (const [key, value] of Object.entries(element_obj)) {
        var result = "";
        for (var i = 0; i < value.length; i++) {
            result += value[i] + ":";
        }
        k11.push({
            result,
            value
        });
    }
    return k11;
}
//Product ID
function getCus1(resultsQuery) {
    var arr1 = [];
    for (var i = 0; i < resultsQuery.length; i++) {
        arr1[i] = resultsQuery[i].ctId;
    }
    var k11 = convertToArr(resultsQuery, arr1);

    //Tách ProductID
    var result2 = "";
    for (let index = 0; index < k11.length; index++) {
        result2 += k11[index].result + ";";
    }
    result2 = result2.substring(0, result2.length - 1);
    var item = result2.split(";");

    var item2 = [];
    for (let index = 0; index < item.length; index++) {
        var x = item[index] + "";
        x = x.substring(0, x.length - 1);
        item2[index] = x.split(":");
    }
    return item2;
}
module.exports = {
    getDetailCustomer: (req, res) => {
        let sql = "SELECT ct.Id as ctId, ct.AccountUn as acc, ct.FullName , ct.Email, ct.Phone, " +
            " ct.Level, ct.Image, ac.NumApartment, ac.Ward , ac.District, ac.City " +
            " FROM customer as ct, addresscustomer as ac " +
            " where ct.Id = ac.CustomerId";
        var arrayOfFuncs = [];
        var func_1 = function (callback) {
            conn.query(sql, (error, resultsQuery) => {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var customer = getCus1(resultsQuery);
                    console.log(customer)
                    for (var i = 0; i < customer.length; i++) {
                        var Location = [];
                        var itemID = parseInt(customer[i]);
                        var k_cus = resultsQuery[itemID];

                        for (let j = 0; j < customer[i].length; j++) {
                            Location[j] = {
                                "NumApartment": resultsQuery[customer[i][j]].NumApartment,
                                "Ward": resultsQuery[customer[i][j]].Ward,
                                "District": resultsQuery[customer[i][j]].District,
                                "City": resultsQuery[customer[i][j]].City
                            }
                        }
                        customer[i] = {
                            Id: k_cus.ctId,
                            Acc: k_cus.acc,
                            FullName: k_cus.FullName,
                            Email: k_cus.Email,
                            Phone: k_cus.Phone,
                            Level: k_cus.Level,
                            Image: k_cus.Image,
                            Location
                        };
                    }
                    var final = {
                        customer
                    }
                    callback(null, final);
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
    getDetailCustomerById: (req, res) => {
        let sql = "SELECT ct.Id as ctId, ct.AccountUn as acc, ct.FullName , ct.Email, ct.Phone, " +
            " ct.Level, ct.Image, ac.NumApartment, ac.Ward, ac.District, ac.City " +
            " FROM customer as ct, addresscustomer as ac " +
            " where ct.Id = ac.CustomerId and ct.Id = ?";
        var arrayOfFuncs = [];
        var func_1 = function (callback) {
            conn.query(sql, [req.params.CustomerId], (error, resultsQuery) => {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var customer = [];
                    if (resultsQuery === null || resultsQuery.length === 0) {
                        customer = [];
                    } else {
                        customer = getCus1(resultsQuery);
                        console.log(customer)
                        for (var i = 0; i < customer.length; i++) {
                            var Location = [];
                            var itemID = parseInt(customer[i]);
                            var k_cus = resultsQuery[itemID];

                            for (let j = 0; j < customer[i].length; j++) {
                                Location[j] = {
                                    "NumApartment": resultsQuery[customer[i][j]].NumApartment,
                                    "Ward": resultsQuery[customer[i][j]].Ward,
                                    "District": resultsQuery[customer[i][j]].District,
                                    "City": resultsQuery[customer[i][j]].City
                                }
                            }
                            customer[i] = {
                                Id: k_cus.ctId,
                                Acc: k_cus.acc,
                                FullName: k_cus.FullName,
                                Email: k_cus.Email,
                                Phone: k_cus.Phone,
                                Level: k_cus.Level,
                                Image: k_cus.Image,
                                Location
                            };
                        }
                    }
                    callback(null, customer);
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
    saveAddress: (req, res) => {
        let data = req.body;
        var arrayOfFuncs = [];
        let sql = "INSERT INTO addresscustomer(CustomerId,NumApartment,Ward,District,City) VALUES(?,?,?,?,?)";
        var func_sql = function (callback) {
            conn.query(sql, [data.CustomerId, data.NumApartment, data.Ward, data.District, data.City], (error, response) => {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var mes = {
                        'mes': 'ok'
                    };
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
    updateInfo: (req, res) => {
        let data = req.body;
        var arrayOfFuncs = [];
        let sqlLocation = "UPDATE addresscustomer SET NumApartment = ? , Ward = ? , District = ?, City = ? WHERE CustomerId = ?";
        var func_sql = function (callback) {
            conn.query(sqlLocation, [data.NumApartment, data.Ward, data.District, data.City, data.CustomerId], (error, response) => {
                if (error) {
                    console.log('error');
                    callback(null, {
                        "mes": "null"
                    });
                } else {
                    var mes = {
                        'mes': 'ok1'
                    };
                    callback(null, mes);
                }
            })
        }
        arrayOfFuncs.push(func_sql);
        let sqlCustomer = "UPDATE customer SET Fullname = ? , Email = ? , Phone = ?, Image = ? WHERE Id = ?";
        var func_2 = function (prevData, callback) {
            if (prevData.mes !== "null") {
                conn.query(sqlCustomer, [data.Fullname, data.Email, data.Phone, data.Image, data.CustomerId], (error, response) => {
                    if (error) {
                        console.log('sqlCustomer');
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
            } else {
                callback(null, {
                    "mes": "null"
                });
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
    removeAddress: (req, res) => {
        let data = req.body;
        var arrayOfFuncs = [];

        //Must find before removes
        let sql = "DELETE from addresscustomer WHERE CustomerId = ? AND NumApartment = ? AND Ward = ? AND District = ? AND City = ? ";
        var func_sql = function (callback) {
            conn.query(sql, [data.CustomerId, data.NumApartment, data.Ward, data.District, data.City], (error, response) => {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var mes = {
                        'mes': 'ok'
                    };
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
}