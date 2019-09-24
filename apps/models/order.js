'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');

module.exports = {
    getOrder: (req, res) => {
        let sqlOrder = "SELECT distinct od.Id as OdId, od.CustomerId, od.ShippingId as shippingid, st.Id as statusid, " +
            " st.`Status`, od.PaymentMethodId, od.Number, od.Discount, od.DateOrder, pd.*,ct.Id as CategoryId, " +
            " ct.Name as CategoryName , cl.id as ColorId,cl.Name as ColorName,os.Id as OsId, os.Name as OsName, " +
            " ra.Id as RamId, ra.Name as RamName, ro.Id as RomId,ro.Name as RomName, vu.Id as vuId, " +
            " vu.UrlImage as vuImage,vu.UrlVideo as vuVideo " +
            " from ram as ra,category as ct, color as cl, operatingsystem as os, rom as ro, " +
            "`order` as od, `status` as st, products as pd ,valueurl as vu WHERE od.StatusId = st.Id " +
            " AND pd.ProductId = od.ProductId AND ct.Id=pd.CategoryId AND cl.Id = pd.ColorId " +
            " AND os.Id = pd.OperatingSystemId AND ra.Id = pd.RAMId AND ro.Id = pd.ROMId " +
            " AND vu.ProductsId = pd.ProductId";
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {
            var arr = [];
            conn.query(sqlOrder, function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    for (var i = 0; i < resultsQuery.length; i++) {
                        arr[i] = resultsQuery[i].CustomerId + "/" + resultsQuery[i].DateOrder;
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
                    var orders = [];
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

                    for (let h = 0; h < item2.length; h++) {
                        var itemID = parseInt(item2[h]);
                        var product = [];
                        for (let j = 0; j < item2[h].length; j++) {
                            var value = [];
                            
                            for(let t = 0; t < 3; t++){
                                console.log(resultsQuery[item2[h][j][t]]);
                                
                                // value[j] = {
                                //     "valueId": resultsQuery[item2[h][j][t]].vuId,
                                //     "valueImg": resultsQuery[item2[h][j][t]].vuImage,
                                //     "valueVideo": resultsQuery[item2[h][j][t]].vuVideo
                                // }
                            }
                            product[j] = {
                                "product_id": resultsQuery[item2[h][j]].ProductId,
                                value
                            }
                        }
                        var k = resultsQuery[itemID];
                        var abc = {
                            id: k.id,
                            customerId: k.CustomerId,
                            DateOrder: k.DateOrder,
                            product
                        };
                        orders.push(abc);
                    }
                    callback(null, orders);
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