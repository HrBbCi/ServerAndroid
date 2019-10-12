'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');

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
    }
}