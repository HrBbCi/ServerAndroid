'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');

function generateIdOrder(string) {
    var string2 = string;
    string = string.substring(2, string.length);
    var id = string2.substring(0, 2);
    var lent = string.length;
    var num = parseInt(string) + 1;
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
        arr1[i] = resultsQuery[i].pdId;
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
    getOrder: (req, res) => {
        let sqlOrder = "SELECT distinct od.Id as odId, od.CustomerId as odCusId, st.Id as stId,st.Status as stName, sp.Id as spId, sp.region, sp.priceShiping, " +
            " od.PaymentMethodId, od.Number as odNumber, od.Discount as odDiscount, od.DateOrder as odDateOrder, " +
            " od.TypeOrder as odTypeOrder, pd.Id as pdId, pd.Figure as TotalFigure, pd.Description, " +
            " pd.Rate, pd.Material,pd.Type, dp.Size, dp.Tittle, dp.Name as dpName, dp.CoverPrice,dp.OriginPrice,dp.Figure as DpFirgure, " +
            " cl.Id as clId, cl.Name as clName, ct.Id as ctId, ct.Name as ctName, " +
            " vu.Id as vuId ,vu.UrlImage as vuImage ,vu.UrlVideo as vuVideo " +
            " from product as pd, detailproduct as dp, color as cl, category as ct, customer as cus, `order` as od," +
            " valueurl as vu, shipping as sp , status as st" +
            " where pd.Id = dp.ProductId and cl.Id = dp.ColorId " +
            " AND ct.Id = pd.CategoryId AND vu.ProductsId = pd.Id and cus.Id = od.CustomerId and " +
            " pd.Id = od.ProductId and od.StatusId = st.Id and od.ShippingId = sp.id ";
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {

            conn.query(sqlOrder, function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var orders = [];
                    if (resultsQuery.length === 0 || resultsQuery === null) {
                        orders = [];
                    } else {
                        var item2 = getProduct1(resultsQuery);
                        // Bắt đầu detail product
                        //Color	
                        var keyy = getProduct2(resultsQuery);
                        var k12_1 = getProduct3(keyy);
                        // Kết thúc detail

                        //UrlImage, UrlVideo					
                        var k_urlImg_1 = getProduct4(resultsQuery);


                        var value = [];

                        //Split VuImage
                        var rvs = [];
                        var rvs_1 = [];
                        var value_1 = [];

                        for (let indexkk = 0; indexkk < k_urlImg_1.length; indexkk++) {
                            var arr_vuId = k_urlImg_1[indexkk].vuId;
                            arr_vuId = arr_vuId.substring(0, arr_vuId.length - 1);
                            rvs = arr_vuId.split(":");

                            var arr_vuImage = k_urlImg_1[indexkk].vuImage;
                            arr_vuId = arr_vuId.substring(0, arr_vuId.length - 1);
                            rvs_1 = arr_vuImage.split(":");

                            var value_1_1 = [];
                            for (let i1_1 = 0; i1_1 < rvs.length; i1_1++) {
                                var index1_1 = rvs[i1_1];
                                var index1_2 = rvs_1[i1_1];
                                value_1_1[i1_1] = {
                                    "product_id": k_urlImg_1[indexkk].key,
                                    "vuId": index1_1,
                                    "vuImage": index1_2,
                                    "vuVideo": null
                                }

                            }
                            value_1.push({
                                "product_id": k_urlImg_1[indexkk].key,
                                value_1_1
                            })
                        }

                        // End Product
                        var arr_order = [];
                        for (var i = 0; i < resultsQuery.length; i++) {
                            arr_order[i] = resultsQuery[i].odCusId + "/" + resultsQuery[i].odDateOrder;
                        }
                        var element_obj_order = element_obj_f(arr_order);
                        var k11_order = [];

                        for (const [key, value] of Object.entries(element_obj_order)) {
                            var result = "";
                            for (var i = 0; i < value.length; i++) {
                                result += value[i] + ":";
                            }
                            k11_order.push({
                                result,
                                key
                            });
                        }

                        var result2_order = "";
                        for (let index = 0; index < k11_order.length; index++) {
                            result2_order += k11_order[index].result + ";";
                        }
                        result2_order = result2_order.substring(0, result2_order.length - 1);

                        var item_order = result2_order.split(";");

                        var item2_order = [];
                        for (let index = 0; index < item_order.length; index++) {
                            var x = item_order[index] + "";
                            x = x.substring(0, x.length - 1);
                            item2_order[index] = x.split(":");
                        }

                        var product = [];
                        for (let h = 0; h < item2_order.length; h++) {
                            var itemID_order = parseInt(item2_order[h]);
                            var products = [];
                            var k = resultsQuery[itemID_order];
                            for (let index = 0; index < item2.length; index++) {

                                var result_value_split = [];
                                var detail_1 = [];

                                var itemID_2 = parseInt(item2[index]);

                                var k_2 = resultsQuery[itemID_2];

                                for (let i = 0; i < k12_1.length; i++) {
                                    var result_value = k12_1[i].indexQ;

                                    result_value = result_value.substring(0, result_value.length - 1);
                                    result_value_split = result_value.split(":");

                                    var color = [];
                                    for (let i1 = 0; i1 < result_value_split.length; i1++) {
                                        var index1 = result_value_split[i1];
                                        var k_1 = resultsQuery[index1];
                                        color[i1] = {
                                            id: k_1.clId,
                                            name: k_1.clName
                                        }
                                    }
                                    var itemID_1_2 = parseInt(result_value);
                                    var k_1_2 = resultsQuery[itemID_1_2];
                                    var detail_product = {
                                        product_id: k_1_2.pdId,
                                        size: k_1_2.Size,
                                        title: k_1_2.Tittle,
                                        name: k_1_2.dpName,
                                        cover_price: k_1_2.CoverPrice,
                                        origin_price: k_1_2.OriginPrice,
                                        figure: k_1_2.DpFigure,
                                        color
                                    };


                                    detail_1.push(detail_product);
                                }


                                // Detail	
                                var detail = [];
                                for (let i = 0; i < k12_1.length; i++) {
                                    if (k_2.pdId === detail_1[i].product_id) {
                                        detail.push(detail_1[i]);
                                    }
                                }

                                //Url

                                for (let index_1 = 0; index_1 < value_1.length; index_1++) {
                                    if (k_2.pdId === value_1[index_1].product_id) {
                                        var length = value_1[index_1].value_1_1.length;
                                        var xxx = [];
                                        for (let index_1_1 = 0; index_1_1 < length; index_1_1++) {
                                            var abc = value_1[index_1].value_1_1[index_1_1];
                                            var abcd = {
                                                "vuId": abc.vuId,
                                                "vuImage": abc.vuImage,
                                                "vuVideo": null
                                            }
                                            xxx.push(abcd);
                                        }
                                        value = xxx;
                                        //	value=value_1[index_1].value_1_1;
                                    }
                                }
                                var category = {
                                    "id": k_2.ctId,
                                    "name": k_2.ctName
                                };
                                var abc = {
                                    product_id: k_2.pdId,
                                    figure: k_2.TotalFigure,
                                    description: k_2.Description,
                                    rate: k_2.Rate,
                                    material: k_2.Material,
                                    type: k_2.Type,
                                    detail,
                                    category,
                                    value
                                };
                                products.push(abc);
                            }

                            for (let i_products = 0; i_products < item2.length; i_products++) {
                                if (k.pdId === products[i_products].product_id) {
                                    product.push(products[i_products]);
                                }
                            }

                            var abc = {
                                "id": k.odId,
                                "customerId": k.odCusId,
                                "shipping": {
                                    "id": k.spId,
                                    "priceShiping": k.priceShiping,
                                    "region": k.region
                                },
                                "status": {
                                    "id": k.stId,
                                    "name": k.stName
                                },
                                "paymentMethodId": k.PaymentMethodId,
                                "number": k.odNumber,
                                "discount": k.odDiscount,
                                "dateOrder": k.odDateOrder,
                                "typeOrder": k.typeOrder,
                                product
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
    },
    getOrderByCusId: (req, res) => {
        let sqlOrder = "SELECT distinct od.Id as odId, od.CustomerId as odCusId, st.Id as stId,st.Status as stName, sp.Id as spId, sp.region, sp.priceShiping, " +
            " od.PaymentMethodId, od.Number as odNumber, od.Discount as odDiscount, od.DateOrder as odDateOrder, " +
            " od.TypeOrder as odTypeOrder, pd.Id as pdId, pd.Figure as TotalFigure, pd.Description, " +
            " pd.Rate, pd.Material,pd.Type, dp.Size, dp.Tittle, dp.Name as dpName, dp.CoverPrice,dp.OriginPrice,dp.Figure as DpFirgure, " +
            " cl.Id as clId, cl.Name as clName, ct.Id as ctId, ct.Name as ctName, " +
            " vu.Id as vuId ,vu.UrlImage as vuImage ,vu.UrlVideo as vuVideo " +
            " from product as pd, detailproduct as dp, color as cl, category as ct, customer as cus, `order` as od," +
            " valueurl as vu, shipping as sp , status as st" +
            " where pd.Id = dp.ProductId and cl.Id = dp.ColorId " +
            " AND ct.Id = pd.CategoryId AND vu.ProductsId = pd.Id and cus.Id = od.CustomerId and " +
            " pd.Id = od.ProductId and od.StatusId = st.Id and od.ShippingId = sp.id and od.CustomerId = ?";
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {
            conn.query(sqlOrder, [req.params.CustomerId], function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var orders = [];
                    if (resultsQuery.length === 0 || resultsQuery === null) {
                        orders = [];
                    } else {
                        var item2 = getProduct1(resultsQuery);
                        // Bắt đầu detail product
                        //Color	
                        var keyy = getProduct2(resultsQuery);
                        var k12_1 = getProduct3(keyy);
                        // Kết thúc detail

                        //UrlImage, UrlVideo					
                        var k_urlImg_1 = getProduct4(resultsQuery);


                        var value = [];

                        //Split VuImage
                        var rvs = [];
                        var rvs_1 = [];
                        var value_1 = [];

                        for (let indexkk = 0; indexkk < k_urlImg_1.length; indexkk++) {
                            var arr_vuId = k_urlImg_1[indexkk].vuId;
                            arr_vuId = arr_vuId.substring(0, arr_vuId.length - 1);
                            rvs = arr_vuId.split(":");

                            var arr_vuImage = k_urlImg_1[indexkk].vuImage;
                            arr_vuId = arr_vuId.substring(0, arr_vuId.length - 1);
                            rvs_1 = arr_vuImage.split(":");

                            var value_1_1 = [];
                            for (let i1_1 = 0; i1_1 < rvs.length; i1_1++) {
                                var index1_1 = rvs[i1_1];
                                var index1_2 = rvs_1[i1_1];
                                value_1_1[i1_1] = {
                                    "product_id": k_urlImg_1[indexkk].key,
                                    "vuId": index1_1,
                                    "vuImage": index1_2,
                                    "vuVideo": null
                                }

                            }
                            value_1.push({
                                "product_id": k_urlImg_1[indexkk].key,
                                value_1_1
                            })
                        }

                        // End Product
                        var arr_order = [];
                        for (var i = 0; i < resultsQuery.length; i++) {
                            arr_order[i] = resultsQuery[i].odCusId + "/" + resultsQuery[i].odDateOrder;
                        }
                        var element_obj_order = element_obj_f(arr_order);
                        var k11_order = [];

                        for (const [key, value] of Object.entries(element_obj_order)) {
                            var result = "";
                            for (var i = 0; i < value.length; i++) {
                                result += value[i] + ":";
                            }
                            k11_order.push({
                                result,
                                key
                            });
                        }

                        var result2_order = "";
                        for (let index = 0; index < k11_order.length; index++) {
                            result2_order += k11_order[index].result + ";";
                        }
                        result2_order = result2_order.substring(0, result2_order.length - 1);

                        var item_order = result2_order.split(";");

                        var item2_order = [];
                        for (let index = 0; index < item_order.length; index++) {
                            var x = item_order[index] + "";
                            x = x.substring(0, x.length - 1);
                            item2_order[index] = x.split(":");
                        }

                        var product = [];
                        for (let h = 0; h < item2_order.length; h++) {
                            var itemID_order = parseInt(item2_order[h]);
                            var products = [];
                            var k = resultsQuery[itemID_order];
                            for (let index = 0; index < item2.length; index++) {

                                var result_value_split = [];
                                var detail_1 = [];

                                var itemID_2 = parseInt(item2[index]);

                                var k_2 = resultsQuery[itemID_2];

                                for (let i = 0; i < k12_1.length; i++) {
                                    var result_value = k12_1[i].indexQ;

                                    result_value = result_value.substring(0, result_value.length - 1);
                                    result_value_split = result_value.split(":");

                                    var color = [];
                                    for (let i1 = 0; i1 < result_value_split.length; i1++) {
                                        var index1 = result_value_split[i1];
                                        var k_1 = resultsQuery[index1];
                                        color[i1] = {
                                            id: k_1.clId,
                                            name: k_1.clName
                                        }
                                    }
                                    var itemID_1_2 = parseInt(result_value);
                                    var k_1_2 = resultsQuery[itemID_1_2];
                                    var detail_product = {
                                        product_id: k_1_2.pdId,
                                        size: k_1_2.Size,
                                        title: k_1_2.Tittle,
                                        name: k_1_2.dpName,
                                        cover_price: k_1_2.CoverPrice,
                                        origin_price: k_1_2.OriginPrice,
                                        figure: k_1_2.DpFigure,
                                        color
                                    };


                                    detail_1.push(detail_product);
                                }


                                // Detail	
                                var detail = [];
                                for (let i = 0; i < k12_1.length; i++) {
                                    if (k_2.pdId === detail_1[i].product_id) {
                                        detail.push(detail_1[i]);
                                    }
                                }

                                //Url

                                for (let index_1 = 0; index_1 < value_1.length; index_1++) {
                                    if (k_2.pdId === value_1[index_1].product_id) {
                                        var length = value_1[index_1].value_1_1.length;
                                        var xxx = [];
                                        for (let index_1_1 = 0; index_1_1 < length; index_1_1++) {
                                            var abc = value_1[index_1].value_1_1[index_1_1];
                                            var abcd = {
                                                "vuId": abc.vuId,
                                                "vuImage": abc.vuImage,
                                                "vuVideo": null
                                            }
                                            xxx.push(abcd);
                                        }
                                        value = xxx;
                                        //	value=value_1[index_1].value_1_1;
                                    }
                                }
                                var category = {
                                    "id": k_2.ctId,
                                    "name": k_2.ctName
                                };
                                var abc = {
                                    product_id: k_2.pdId,
                                    figure: k_2.TotalFigure,
                                    description: k_2.Description,
                                    rate: k_2.Rate,
                                    material: k_2.Material,
                                    type: k_2.Type,
                                    detail,
                                    category,
                                    value
                                };
                                products.push(abc);
                            }

                            for (let i_products = 0; i_products < item2.length; i_products++) {
                                if (k.pdId === products[i_products].product_id) {
                                    product.push(products[i_products]);
                                }
                            }

                            var abc = {
                                "id": k.odId,
                                "customerId": k.odCusId,
                                "shipping": {
                                    "id": k.spId,
                                    "priceShiping": k.priceShiping,
                                    "region": k.region
                                },
                                "status": {
                                    "id": k.stId,
                                    "name": k.stName
                                },
                                "paymentMethodId": k.PaymentMethodId,
                                "number": k.odNumber,
                                "discount": k.odDiscount,
                                "dateOrder": k.odDateOrder,
                                "typeOrder": k.typeOrder,
                                product
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
    },
    getOrderByCusIdAndStId: (req, res) => {
        let sqlOrder = "SELECT distinct od.Id as odId, od.CustomerId as odCusId, st.Id as stId,st.Status as stName, sp.Id as spId, sp.region, sp.priceShiping, " +
            " od.PaymentMethodId, od.Number as odNumber, od.Discount as odDiscount, od.DateOrder as odDateOrder, od.DatePayment as odDatePayment, " +
            " od.TypeOrder as odTypeOrder, pd.Id as pdId, pd.Figure as TotalFigure, pd.Description, " +
            " pd.Rate, pd.Material,pd.Type, dp.Size, dp.Tittle, dp.Name as dpName, dp.CoverPrice,dp.OriginPrice,dp.Figure as DpFirgure, " +
            " cl.Id as clId, cl.Name as clName, ct.Id as ctId, ct.Name as ctName, " +
            " vu.Id as vuId ,vu.UrlImage as vuImage ,vu.UrlVideo as vuVideo " +
            " from product as pd, detailproduct as dp, color as cl, category as ct, customer as cus, `order` as od," +
            " valueurl as vu, shipping as sp , status as st" +
            " where pd.Id = dp.ProductId and cl.Id = dp.ColorId " +
            " AND ct.Id = pd.CategoryId AND vu.ProductsId = pd.Id and cus.Id = od.CustomerId and " +
            " pd.Id = od.ProductId and od.StatusId = st.Id and od.ShippingId = sp.id and od.CustomerId = ? and st.Id = ?";
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
                        var item2 = getProduct1(resultsQuery);
                        // Bắt đầu detail product
                        //Color	
                        var keyy = getProduct2(resultsQuery);
                        var k12_1 = getProduct3(keyy);
                        // Kết thúc detail

                        //UrlImage, UrlVideo					
                        var k_urlImg_1 = getProduct4(resultsQuery);


                        var value = [];

                        //Split VuImage
                        var rvs = [];
                        var rvs_1 = [];
                        var value_1 = [];

                        for (let indexkk = 0; indexkk < k_urlImg_1.length; indexkk++) {
                            var arr_vuId = k_urlImg_1[indexkk].vuId;
                            arr_vuId = arr_vuId.substring(0, arr_vuId.length - 1);
                            rvs = arr_vuId.split(":");

                            var arr_vuImage = k_urlImg_1[indexkk].vuImage;
                            arr_vuId = arr_vuId.substring(0, arr_vuId.length - 1);
                            rvs_1 = arr_vuImage.split(":");

                            var value_1_1 = [];
                            for (let i1_1 = 0; i1_1 < rvs.length; i1_1++) {
                                var index1_1 = rvs[i1_1];
                                var index1_2 = rvs_1[i1_1];
                                value_1_1[i1_1] = {
                                    "product_id": k_urlImg_1[indexkk].key,
                                    "vuId": index1_1,
                                    "vuImage": index1_2,
                                    "vuVideo": null
                                }

                            }
                            value_1.push({
                                "product_id": k_urlImg_1[indexkk].key,
                                value_1_1
                            })
                        }

                        // End Product
                        var arr_order = [];
                        for (var i = 0; i < resultsQuery.length; i++) {
                            arr_order[i] = resultsQuery[i].odCusId + "/" + resultsQuery[i].odDateOrder;
                        }
                        var element_obj_order = element_obj_f(arr_order);
                        var k11_order = [];

                        for (const [key, value] of Object.entries(element_obj_order)) {
                            var result = "";
                            for (var i = 0; i < value.length; i++) {
                                result += value[i] + ":";
                            }
                            k11_order.push({
                                result,
                                key
                            });
                        }

                        var result2_order = "";
                        for (let index = 0; index < k11_order.length; index++) {
                            result2_order += k11_order[index].result + ";";
                        }
                        result2_order = result2_order.substring(0, result2_order.length - 1);

                        var item_order = result2_order.split(";");

                        var item2_order = [];
                        for (let index = 0; index < item_order.length; index++) {
                            var x = item_order[index] + "";
                            x = x.substring(0, x.length - 1);
                            item2_order[index] = x.split(":");
                        }

                        var product = [];
                        for (let h = 0; h < item2_order.length; h++) {
                            var itemID_order = parseInt(item2_order[h]);
                            var products = [];
                            var k = resultsQuery[itemID_order];
                            for (let index = 0; index < item2.length; index++) {

                                var result_value_split = [];
                                var detail_1 = [];

                                var itemID_2 = parseInt(item2[index]);

                                var k_2 = resultsQuery[itemID_2];

                                for (let i = 0; i < k12_1.length; i++) {
                                    var result_value = k12_1[i].indexQ;

                                    result_value = result_value.substring(0, result_value.length - 1);
                                    result_value_split = result_value.split(":");

                                    var color = [];
                                    for (let i1 = 0; i1 < result_value_split.length; i1++) {
                                        var index1 = result_value_split[i1];
                                        var k_1 = resultsQuery[index1];
                                        color[i1] = {
                                            id: k_1.clId,
                                            name: k_1.clName
                                        }
                                    }
                                    var itemID_1_2 = parseInt(result_value);
                                    var k_1_2 = resultsQuery[itemID_1_2];
                                    var detail_product = {
                                        product_id: k_1_2.pdId,
                                        size: k_1_2.Size,
                                        title: k_1_2.Tittle,
                                        name: k_1_2.dpName,
                                        cover_price: k_1_2.CoverPrice,
                                        origin_price: k_1_2.OriginPrice,
                                        figure: k_1_2.DpFigure,
                                        color
                                    };


                                    detail_1.push(detail_product);
                                }


                                // Detail	
                                var detail = [];
                                for (let i = 0; i < k12_1.length; i++) {
                                    if (k_2.pdId === detail_1[i].product_id) {
                                        detail.push(detail_1[i]);
                                    }
                                }

                                //Url

                                for (let index_1 = 0; index_1 < value_1.length; index_1++) {
                                    if (k_2.pdId === value_1[index_1].product_id) {
                                        var length = value_1[index_1].value_1_1.length;
                                        var xxx = [];
                                        for (let index_1_1 = 0; index_1_1 < length; index_1_1++) {
                                            var abc = value_1[index_1].value_1_1[index_1_1];
                                            var abcd = {
                                                "vuId": abc.vuId,
                                                "vuImage": abc.vuImage,
                                                "vuVideo": null
                                            }
                                            xxx.push(abcd);
                                        }
                                        value = xxx;
                                        //	value=value_1[index_1].value_1_1;
                                    }
                                }
                                var category = {
                                    "id": k_2.ctId,
                                    "name": k_2.ctName
                                };
                                var abc = {
                                    product_id: k_2.pdId,
                                    figure: k_2.TotalFigure,
                                    description: k_2.Description,
                                    rate: k_2.Rate,
                                    material: k_2.Material,
                                    type: k_2.Type,
                                    detail,
                                    category,
                                    value
                                };
                                products.push(abc);
                            }

                            for (let i_products = 0; i_products < item2.length; i_products++) {
                                if (k.pdId === products[i_products].product_id) {
                                    product.push(products[i_products]);
                                }
                            }

                            var abc = {
                                "id": k.odId,
                                "customerId": k.odCusId,
                                "shipping": {
                                    "id": k.spId,
                                    "priceShiping": k.priceShiping,
                                    "region": k.region
                                },
                                "status": {
                                    "id": k.stId,
                                    "name": k.stName
                                },
                                "paymentMethodId": k.PaymentMethodId,
                                "number": k.odNumber,
                                "discount": k.odDiscount,
                                "dateOrder": k.odDateOrder,
                                "datePayment": k.odDatePayment,
                                "typeOrder": k.typeOrder,
                                product
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
    },
    saveOrder: (req, res) => {
        let data = req.body;
        var arrayOfFuncs = [];

        //Get Id Customer
        let sqlIdOrder = "SELECT * FROM shoes.order ORDER BY ID DESC LIMIT 1";
        var func_2 = function (callback) {
            conn.query(sqlIdOrder, (error, response) => {
                if (error) {
                    console.log('sqlIdOrder');
                    callback(null, {
                        "mes": "null"
                    });
                } else {
                    var result = generateIdOrder(response[0].Id);
                    var final1 = {
                        "result": result
                    };
                    callback(null, final1);
                }
            })
        }
        arrayOfFuncs.push(func_2);

        let sql = 'INSERT INTO shoes.order(Id,CustomerId,ShippingId,CartId,StatusId,PaymentMethodId,ProductId,Number,Discount,DateOrder,DatePayment,TypeOrder) ' +
            ' VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        var func_sql = function (prevData, callback) {
            if (prevData.mes !== "null") {
                conn.query(sql, [prevData.result, data.CustomerId, data.ShippingId, '1', '1', data.PaymentMethodId, data.ProductId, data.Number,'0', data.DateOrder, 'null', 'app'],
                    (error, response) => {
                        if (error) {
                            console.log('error' + error);
                            callback(error, null);
                        } else {
                            var mes = {
                                'mes': 'ok'
                            };
                            callback(null, mes);
                        }
                    })
            } else {
                callback(null, {
                    "mes1": "null"
                });
            }

        }
        arrayOfFuncs.push(func_sql);
        async.waterfall(arrayOfFuncs, function (errString, finalResult) {
            if (errString) {
                return res.send(errString);
            } else {
                return res.send(finalResult);
            }
        });
    },
    getAllStatus: (req, res) => {
        let sql = 'SELECT * FROM status'
        conn.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    getOrderV2: (req, res) => {
        let sqlOrder = "SELECT od.Id, od.CustomerId, sp.priceShiping, sp.region, st.status, pm.Name as payment, od.ProductId, od.Number, "+
        " od.Discount, od.DateOrder,od.DatePayment,od.TypeOrder " +
        " FROM shoes_test.order as od, shipping as sp, shoes_test.status as st, paymentmethod as pm "+
        " where sp.id = od.ShippingId and od.StatusId = st.Id and pm.id = od.PaymentMethodId ";
        var arrayOfFuncs = [];
        //Get Banner
        var func_1 = function (callback) {

            conn.query(sqlOrder, function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var orders = [];
                    if (resultsQuery.length === 0 || resultsQuery === null) {
                        orders = [];
                    } else {
                        var item2 = getProduct5(resultsQuery);
                        for (let index = 0; index < item2.length; index++) {
                            var element = item2[index];
                            
                            var product = [];
                            for (let i = 0; i < element.length; i++) {
                                var element1 = item2[index][i];
                                product.push(resultsQuery[element1].ProductId);
                            }
                            var abc = {
                                "id": resultsQuery[element[0]].Id,
                                "customerId": resultsQuery[element[0]].CustomerId,
                                "region": resultsQuery[element[0]].region,
                                "shippingId": resultsQuery[element[0]].ShippingId,
                                "status": resultsQuery[element[0]].status,
                                "payment": resultsQuery[element[0]].payment,
                                "Number": resultsQuery[element[0]].Number,
                                "Discount": resultsQuery[element[0]].Discount,
                                "DateOrder": resultsQuery[element[0]].DateOrder,
                                "DatePayment": resultsQuery[element[0]].DatePayment,
                                "TypeOrder": resultsQuery[element[0]].TypeOrder,
                                 product
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