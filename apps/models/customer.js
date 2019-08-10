'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var helper = require("../helpers/helper");
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
                    "response": [{
                        "message": "null"
                    }]
                });
            } else {
                console.log(data.password,response[0].password);
                console.log(helper.compare_password(data.password,response[0].password));
                if(helper.compare_password(data.password,response[0].password)){
                    res.json({
                        "message": "success"
                    })
                }else{
                    res.json({
                        "response": [{
                            "message": "fail"
                        }]
                    });
                }
            }
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM accountcustomer WHERE id = ?'
        conn.query(sql, [req.params.customerId], (err, response) => {
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
        let sql = 'INSERT INTO accountcustomer(Username,Password,Enabled) VALUES(?,?,?)'
        conn.query(sql, [data.email, helper.hash_password(data.password), 1], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
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