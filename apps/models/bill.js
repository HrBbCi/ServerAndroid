'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var helper = require("../helpers/helper");
var async = require('async');
module.exports = {
    getAllBill: (req, res) => {
        let sql = "SELECT distinct  bl.ShopkeeperEmplId as employee, ep.fullname , bl.OrderId, bl.DatePayments, sum(bl.Total) as btTotal "+
        " from bill as bl, `order` as od, employee as ep " +
        " where od.Id = bl.OrderId and ep.Id =  bl.ShopkeeperEmplId " +
        " group by employee";
        conn.query(sql, (err, response) => {
            if (err) throw err
            if(response === null){
                res.json([])
            }else{
                res.json(response)
            }
        })
    },
    getAllBillV1: (req, res) => {
        let sql = "SELECT * FROM " +
        " bill as b1 , (SELECT distinct  bl.ShopkeeperEmplId as employee, sum(bl.Total) as btTotal " +
        " from bill as bl, `order` as od, employee as ep where od.Id = bl.OrderId and ep.Id =  bl.ShopkeeperEmplId " +
        " group by employee) as b2, (select Id, Fullname from employee ) as b3" +
        " where b1.ShopkeeperEmplId = b2. employee and b3.Id =  b1.ShopkeeperEmplId";
        conn.query(sql, (err, response) => {
            if (err) throw err
            if(response === null){
                res.json([])
            }else{
                res.json(response)
            }
        })
    },
    getBillByEmpl: (req, res) => {
        let sql = "SELECT distinct  bl.ShopkeeperEmplId as employee, ep.fullname , bl.OrderId, bl.DatePayments, sum(bl.Total) as btTotal "+
        " from bill as bl, `order` as od, employee as ep " +
        " where od.Id = bl.OrderId and ep.Id =  bl.ShopkeeperEmplId and bl.ShopkeeperEmplId = ? " +
        " group by employee ";
        conn.query(sql, [req.params.emplId], (err, response) => {
            if (err) throw err
            if(response === null){
                res.json([])
            }else{
                res.json(response[0])
            }
        })
    },
    saveBill: (req, res) => {
        let data = req.body;
        var arrayOfFuncs = [];
        let sqlAcc = "INSERT INTO bill(ShopkeeperEmplId,OrderId,Total,DatePayments) VALUES(?,?,?,?)";
        //Save saveBill
        var func_1 = function (callback) {
            conn.query(sqlAcc, [data.ShopkeeperEmplId, data.OrderId, data.Total, data.DatePayments], (error, response) => {
                if (error) {
                    console.log('saveBill');
                    callback(null, {
                        "mes": "null"
                    });
                } else {
                    var mes = {
                        'mes': 'Insert saveBill!'
                    };
                    console.log(mes);
                    callback(null, mes);
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