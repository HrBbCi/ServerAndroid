'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var helper = require("../helpers/helper");
module.exports = {
    getAllCategory: (req, res) => {
        let sql = 'SELECT * FROM category'
        conn.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM category WHERE id = ?'
        conn.query(sql, [req.params.categoryId], (err, response) => {
            if (err) throw err
            res.json(response[0])
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