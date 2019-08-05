'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM admin'
        conn.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    checkAccount: (req, res) => {
        let sql = 'SELECT * FROM admin where username = ? and password = ?'
        conn.query(sql, [req.params.email, req.params.password], (err, response) => {
            if (err) throw err
            if (response[0] == null) {
                res.json({
                    "response": [{
                        "username": "null"
                    }]
                });
            } else {
                res.json({
                    response
                })
            }

        })
    },

    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO admin SET ?'
        conn.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Success!'
            })
        })
    },
}