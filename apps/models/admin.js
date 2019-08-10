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
        let data = req.body;
        let sql = 'SELECT password FROM admin where username = ?'
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
    save: (req, res) => {
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