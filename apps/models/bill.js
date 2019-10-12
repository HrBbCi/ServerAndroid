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
    },
    update: (req, res) => {
        let data = req.body;
        let categoryId = req.params.categoryId;
        let sql = 'UPDATE category SET ? WHERE id = ?'
        conn.query(sql, [data, categoryId], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Update success!'
            })
        })
    },
    save: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO category SET ?'
        conn.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM category WHERE id = ?'
        conn.query(sql, [req.params.categoryId], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Delete success!'
            })
        })
    },
    getHash: (req, res) => {
        res.json({
            message: helper.hash_password("123456")
        })
    }
}