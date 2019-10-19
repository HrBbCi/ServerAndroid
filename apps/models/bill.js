'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var helper = require("../helpers/helper");
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
    }
}