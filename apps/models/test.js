'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');

function generateIdOrder(IDD) {
    console.log(IDD);
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

function element_obj_f(arr) {
    var element_obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] in element_obj) {
            element_obj[arr[i]].push(i);
        } else {
            element_obj[arr[i]] = [i];
        }
    }
    return element_obj;
}

function convertToArr(resultsQuery, arr1) {

    var element_obj = element_obj_f(arr1);
    var k11 = [];
    //K11
    for (const [key, value] of Object.entries(element_obj)) {
        var result = "";
        for (var i = 0; i < value.length; i++) {
            result += value[i] + ":";
        }
        k11.push({
            result,
            value
        });
    }
    return k11;
}

function convertToArr2(resultsQuery, arr1) {
    var element_obj = element_obj_f(arr1);
    var k11 = [];
    //K11
    for (const [key1, value] of Object.entries(element_obj)) {
        var result = "";
        for (var i = 0; i < value.length; i++) {
            result += value[i] + ":";
        }
        k11.push({
            key1,
            result
        });
    }
    return k11;
}

//Product ID
function getProduct1(resultsQuery) {
    var arr1 = [];
    for (var i = 0; i < resultsQuery.length; i++) {
        arr1[i] = resultsQuery[i].odId + "";
    }
    var k11 = convertToArr(resultsQuery, arr1);

    //Tách ProductID
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
    return item2;

}
//Get key product 2
function getProduct2(resultsQuery) {
    // Bắt đầu detail product
    //Color
    var arr2 = [];
    for (var i = 0; i < resultsQuery.length; i++) {
        arr2[i] = resultsQuery[i].pdId + "//" + resultsQuery[i].TotalFigure + "//" + resultsQuery[i].Description + "//" + resultsQuery[i].Type +
            "//" + resultsQuery[i].Size + "//" + resultsQuery[i].Tittle + "//" + resultsQuery[i].CoverPrice + "//" + resultsQuery[i].OriginPrice + "//" + resultsQuery[i].clId;
    }
    //Size
    //K12
    var k12 = convertToArr2(resultsQuery, arr2);

    var keyy = [];
    for (let h1 = 0; h1 < k12.length; h1++) {
        var result_key = k12[h1].key1;

        var result_key_split = result_key.split("//");

        var result_value = k12[h1].result;
        var result_value_split = result_value.split(":");

        keyy.push({
            "product_id": result_key_split[0],
            "figure": result_key_split[1],
            "description": result_key_split[2],
            "size": result_key_split[4],
            "indexQ": result_value_split[0]
        });
    }
    return keyy;
}

//Get product from result getProduct2
function getProduct3(keyy) {
    //Convert
    var arr2_1 = [];
    for (var i = 0; i < keyy.length; i++) {
        arr2_1[i] = keyy[i].product_id + ";" + keyy[i].size;
    }
    //Size
    var element_obj1_1 = element_obj_f(arr2_1);
    var k12_1 = [];
    //K12_1
    for (const [key, value] of Object.entries(element_obj1_1)) {
        var result = "";
        var figure = "";
        var description = "";
        var indexQ = "";

        for (var i = 0; i < value.length; i++) {
            result += value[i] + ":";
            figure = keyy[value[i]].figure;
            description = keyy[value[i]].description;
            indexQ += keyy[value[i]].indexQ + ":";
        }
        k12_1.push({
            key,
            result,
            figure,
            description,
            indexQ
        });
    }
    return k12_1;
}

//Url Image, Video
function getProduct4(resultsQuery) {
    var arr3 = [];

    for (var i = 0; i < resultsQuery.length; i++) {
        arr3[i] = resultsQuery[i].pdId + "//" + resultsQuery[i].vuId + "//" + resultsQuery[i].vuImage;
    }
    var element_obj_3 = element_obj_f(arr3);
    var k1_3 = [];
    //K13
    for (const [key3, value3] of Object.entries(element_obj_3)) {
        var result = "";
        for (var i = 0; i < value3.length; i++) {
            result = value3[i] + ":";
        }
        k1_3.push({
            key3,
            result
        });
    }

    var urlImg = [];
    for (let index = 0; index < k1_3.length; index++) {
        var element = k1_3[index];
        var result_key = element.key3;
        var result_key_split = result_key.split("//");

        urlImg.push({
            "vuId": result_key_split[1],
            "vuImage": result_key_split[2],
            "vuVideo": null,
            "product_id": result_key_split[0]
        });
    }

    //Convert
    var urlImg_1 = [];
    for (var i = 0; i < urlImg.length; i++) {
        urlImg_1[i] = urlImg[i].product_id;
    }
    //Size
    var element_obj1_urlImg_1 = element_obj_f(urlImg_1);
    var k_urlImg_1 = [];
    //K12_1
    for (const [key, value] of Object.entries(element_obj1_urlImg_1)) {
        var vuId = "";
        var vuImage = "";
        // var description = "";
        var indexQ = "";

        for (var i = 0; i < value.length; i++) {
            vuId += urlImg[value[i]].vuId + ":";
            indexQ += value[i] + ":";
            vuImage += urlImg[value[i]].vuImage + ":";
        }
        k_urlImg_1.push({
            key,
            vuId,
            vuImage,
            indexQ
        });

    }
    return k_urlImg_1;
}
//Product ID
function getProduct5(resultsQuery) {
    var arr1 = [];
    for (var i = 0; i < resultsQuery.length; i++) {
        arr1[i] = resultsQuery[i].CustomerId + "//" + resultsQuery[i].DateOrder + "//" + resultsQuery[i].TypeOrder;
    }
    var k11 = convertToArr(resultsQuery, arr1);
    // for (let index = 0; index < k11.length; index++) {
    //     console.log(k11[index].result);
    // }
    //Tách ProductID
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
    return item2;

}

module.exports = {
    getOrderByCusIdAndStIdV2: (req, res) => {
        let sqlOrder = "SELECT *  FROM `order` where CustomerId = ? and StatusId = ?";
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {

            conn.query(sqlOrder, [req.params.CustomerId, req.params.statusId], function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var orders = [];
                    if (resultsQuery.length === 0 || resultsQuery === null) {
                        orders = [];
                    } else {
                        for (let index = 0; index < resultsQuery.length; index++) {
                            const k = resultsQuery[index];
                            var abc = {
                                "id": k.Id,
                                "customerId": k.CustomerId,
                                "shippingId": k.ShippingId,
                                "statusId": k.StatusId,
                                "paymentMethodId": k.PaymentMethodId,
                                "ProductId": k.ProductId,
                                "number": k.Number,
                                "dateOrder": k.DateOrder,
                                "datePayment": k.DatePayment,
                                "typeOrder": k.TypeOrder,
                            };
                            orders.push(abc);
                        }
                        
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