'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');

function generateIdNews(IDD) {
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
    getNews: (req, res) => {
        let sqlNews = 'SELECT ns.*, el.fullname, el.image as avatar FROM news as ns, employee as el where ' +
            ' ns.emplID = el.Id';
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {
            var arr = [];
            conn.query(sqlNews, function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    for (var i = 0; i < resultsQuery.length; i++) {
                        arr[i] = resultsQuery[i].title;
                    }
                    var element_obj = {};
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] in element_obj) {
                            element_obj[arr[i]].push(i);
                        } else {
                            element_obj[arr[i]] = [i];
                        }
                    }
                    var k11 = [];
                    for (const [key, value] of Object.entries(element_obj)) {
                        var result = "";
                        for (var i = 0; i < value.length; i++) {
                            result += value[i] + ":";
                        }
                        k11.push({
                            result,
                            key
                        });
                    }
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
                    var news = [];
                    for (let h = 0; h < item2.length; h++) {
                        var itemID = parseInt(item2[h]);
                        var comment = [];
                        for (let j = 0; j < item2[h].length; j++) {
                            comment[j] = {
                                "comment": resultsQuery[item2[h][j]].comment
                            }
                        }
                        var k = resultsQuery[itemID];
                        var abc = {
                            id: k.id,
                            title: k.title,
                            link: k.link,
                            description: k.description,
                            dateRelease: k.dateRelease,
                            image: k.image,
                            countShare: k.countShare,
                            employee: k.fullname,
                            avatar: k.avatar,
                            comment
                        };
                        news.push(abc);
                    }
                    callback(null, {
                        "news": news
                    });
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
    getNews2: (req, res) => {
        let sqlNews = 'SELECT * FROM news ';
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {
            conn.query(sqlNews, function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var news = [];
                    for (let h = 0; h < resultsQuery.length; h++) {
                        var k = resultsQuery[h];
                        var abc = {
                            id: k.id,
                            emplID: k.emplID,
                            title: k.title,
                            link: k.link,
                            description: k.description,
                            dateRelease: k.dateRelease,
                            image: k.image,
                            employee: k.fullname,
                            avatar: k.avatar,
                        };
                        news.push(abc);
                    }
                    callback(null, news);
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
	getNewsById: (req, res) => {
        let sqlNews = 'SELECT * FROM news where id = ?';
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {
            conn.query(sqlNews, [req.params.id],function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var news = [];
                    for (let h = 0; h < resultsQuery.length; h++) {
                        var k = resultsQuery[h];
                        var abc = {
                            id: k.id,
                            emplID: k.emplID,
                            title: k.title,
                            link: k.link,
                            description: k.description,
                            dateRelease: k.dateRelease,
                            image: k.image,
                            employee: k.fullname,
                            avatar: k.avatar,
                        };
                        news.push(abc);
                    }
                    callback(null, news);
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
    saveNews: (req, res) => {
        let data = req.body;
        var arrayOfFuncs = [];
        //Get Id Customer
        let sqlIdNew = "SELECT * FROM news ORDER BY Id DESC LIMIT 1";
        var func_2 = function (callback) {
            conn.query(sqlIdNew, (error, response) => {
                if (error) {
                    console.log('sqlIdNew');
                    callback(null, {
                        "result": "null"
                    });
                } else {
                    if (response.length === 0 || response === null) {
                        callback(null, {
                            "result": "null"
                        });
                    } else {
                        var result = generateIdNews(response[0].id);
                        var final1 = {
                            "result": result
                        };
                        callback(null, final1);
                    }

                }
            })
        }
        arrayOfFuncs.push(func_2);

        let sqlAcc = "INSERT INTO news(id,emplID,title,description,dateRelease,image,link) VALUES(?,?,?,?,?,?,?)";
        //Save AccountCustomer
        var func_1 = function (prevData, callback) {
            if (prevData.result === "null") {
                conn.query(sqlAcc, ["NS0000", data.emplID, data.title, data.description, data.dateRelease, data.image, data.link], (error, response) => {
                    if (error) {
                        console.log('saveNews');
                        callback(null, {
                            "mes": "null"
                        });
                    } else {
                        var mes = {
                            'mes': 'Insert saveNews!'
                        };
                        console.log(mes);
                        callback(null, mes);
                    }
                })
            } else {
                conn.query(sqlAcc, [prevData.result, data.emplID, data.title, data.description, data.dateRelease, data.image, data.link], (error, response) => {
                    if (error) {
                        console.log('saveNews');
                        callback(null, {
                            "mes": "null"
                        });
                    } else {
                        var mes = {
                            'mes': 'Insert saveNews!'
                        };
                        console.log(mes);
                        callback(null, mes);
                    }
                })
            }

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
	updateNews: (req, res) => {
        let data = req.body;
        var arrayOfFuncs = [];
        //Get Id Customer
        let sqlUpdateNew = "UPDATE news SET emplID = ?, title = ?, description = ?, image =?, link = ? WHERE id = ? ";
        var func_2 = function (callback) {
            conn.query(sqlUpdateNew,[data.emplID,data.title,data.description,data.image,data.link,data.id], (error, response) => {
                if (error) {
                    console.log('sqlUpdateNew');
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
    deleteNews: (req, res) => {
        let data = req.body;
        let id = data.id;
        let sql = 'DELETE FROM news WHERE id = ?'
        console.log(id)
        conn.query(sql, [id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Delete success!'
            })
        })
    }
}