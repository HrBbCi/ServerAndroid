'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');

module.exports = {
    getHome: (req, res) => {
        let sqlBanner = 'SELECT vu.Id, vu.BannerId, vu.UrlImage, vu.UrlVideo FROM banner as bn, valueurl as vu where ' +
            ' vu.BannerId = bn.Id;'
        var arrayOfFuncs = [];

        //Get Banner
        var func_1 = function (callback) {
            conn.query(sqlBanner, function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var banner = [];
                    var value = {
                        id: "",
                        urlImage: "",
                        urlVideo: ""
                    };
                    for (var i = 0; i < resultsQuery.length; i++) {
                        banner[i] = {
                            id: parseInt(resultsQuery[i].BannerId),
                            option: 1,
                            type: 1,
                            value: {
                                id: resultsQuery[i].Id,
                                urlImage: resultsQuery[i].UrlImage,
                                urlVideo: resultsQuery[i].UrlVideo
                            }
                        };
                    }
                    callback(null, banner);
                }
            })
        }
        arrayOfFuncs.push(func_1);

        //Get Channel
        var sqlChannel = "SELECT vu.ChannelId,ct.Name, vu.UrlImage, vu.UrlVideo FROM category as ct, valueurl as vu " +
            " where vu.ChannelId = ct.Id";
        var func_2 = function (prevData, callback) {
            conn.query(sqlChannel, function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var channel = [];
                    for (var i = 0; i < resultsQuery.length; i++) {
                        channel[i] = {
                            id: parseInt(resultsQuery[i].ChannelId),
                            name: resultsQuery[i].Name,
                            type: 1,
                            value: {
                                id: resultsQuery[i].Id,
                                urlImage: resultsQuery[i].UrlImage,
                                urlVideo: resultsQuery[i].UrlVideo
                            }
                        };
                    }
                    var final = {
                        "banner": prevData,
                        "channel": channel
                    }
                    callback(null, final);
                }
            })
        }
        arrayOfFuncs.push(func_2);

        //Get Act
        var sqlAct = "SELECT vu.ActId, ac.name, vu.UrlImage, vu.UrlVideo FROM act as ac, valueurl as vu " +
            "where vu.ActId = ac.Id";
        var func_3 = function (prevData, callback) {
            conn.query(sqlAct, function (error, resultsQuery, fields) {
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var act = [];
                    for (var i = 0; i < resultsQuery.length; i++) {
                        act[i] = {
                            id: parseInt(resultsQuery[i].ActId),
                            name: resultsQuery[i].Name,
                            value: {
                                id: resultsQuery[i].Id,
                                urlImage: resultsQuery[i].UrlImage,
                                urlVideo: resultsQuery[i].UrlVideo
                            }
                        };
                    }
                    var final = {
                        "banner": prevData.banner,
                        "channel": prevData.channel,
                        "act": act
                    }
                    callback(null, final);
                }
            })
        }
        arrayOfFuncs.push(func_3);

        //Get Seckill
        var sqlSeckill = "SELECT distinct pd.*, sk.*, vu.Id as vuID ,vu.UrlImage as vuImage , vu.UrlVideo as vuVideo," +
            " ct.Id as CategoryId, ct.Name as CategoryName , cl.id as ColorId,cl.Name as ColorName,os.Id as OsId, " +
            " os.Name as OsName , ra.Id as RamId, ra.Name as RamName, ro.Id as RomId, ro.Name as RomName " +
            " FROM products as pd, ram as ra,category as ct, color as cl, seckill as sk," +
            " operatingsystem as os, rom as ro ,valueurl as vu " +
            " where ct.Id=pd.CategoryId AND cl.Id = pd.ColorId AND os.Id = pd.OperatingSystemId" +
            " AND ra.Id = pd.RAMId AND ro.Id = pd.ROMId AND vu.ProductsId = pd.ProductId " +
            " AND sk.ProductId = pd.ProductId AND sk.state = 0";
        var func_3 = function (prevData, callback) {
            var arr = [];
            conn.query(sqlSeckill, function (error, resultsQuery, fields) {
                //  console.log(resultsQuery);
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var k1 = [];
                    for (var i = 0; i < resultsQuery.length; i++) {
                        arr[i] = resultsQuery[i].ProductId;
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
                    var k22 = [];
                    for (let h = 0; h < item2.length; h++) {
                        var itemID = parseInt(item2[h]);


                        var value2 = [];
                        for (let j = 0; j < item2[h].length; j++) {
                            value2[j] = {
                                "valueId": resultsQuery[item2[h][j]].vuID,
                                "valueImg": resultsQuery[item2[h][j]].vuImage,
                                "valueVideo": resultsQuery[item2[h][j]].vuVideo
                            }
                        }
                        var k = resultsQuery[itemID];
                        var abc = {
                            product_id:k.ProductId,
                            name: k.Name,
                            cover_price: parseFloat(k.Cover_price),
                            origin_price: parseFloat(k.Origin_price),
                            figure: parseInt(k.Figure),
                            description: k.Description,
                            title: k.Title,
                            specifications: k.Specifications,
                            rate: k.Rate,
                            sim: k.Sim,
                            screen: k.Screen,
                            cpu: k.Cpu,
                            gpu: k.Gpu,
                            frontcam: k.FrontCamera,
                            cam: k.Camera,
                            battery: k.Battery,
                            connectivity: k.Connectivity,
                            color:{
                                id: k.ColorId,
                                name: k.ColorName
                            },
                            os:{
                                id: k.OsId,
                                name: k.OsName
                            },
                            ram:{
                                id: k.RamId,
                                name: k.RamName
                            },
                            rom:{
                                id: k.RomId,
                                name: k.RomName
                            },
                            category:{
                                id: k.CategoryId,
                                name: k.CategoryName
                            },
                            value2
                        };
                        k22.push(abc);
                    }

                    var seckill = {
                        id: parseInt(resultsQuery[i].Id),
                        start_time: resultsQuery[i].Start_time,
                        end_time: resultsQuery[i].End_time,
                        list: k22
                    }
                    var final = {
                        "banner": prevData.banner,
                        "channel": prevData.channel,
                        "act": prevData.act,
                        seckill
                    }
                    callback(null, final);
                }
            })
        }
        arrayOfFuncs.push(func_3);

        //Get HOT
        var sqlHot = "SELECT distinct pd.*, vu.Id as vuID ,vu.UrlImage as vuImage , vu.UrlVideo as vuVideo," +
            " ct.Id as CategoryId, ct.Name as CategoryName , cl.id as ColorId,cl.Name as ColorName,os.Id as OsId, " +
            " os.Name as OsName , ra.Id as RamId, ra.Name as RamName, ro.Id as RomId, ro.Name as RomName " +
            " FROM products as pd, ram as ra,category as ct, color as cl, seckill as sk," +
            " operatingsystem as os, rom as ro ,valueurl as vu " +
            " where ct.Id=pd.CategoryId AND cl.Id = pd.ColorId AND os.Id = pd.OperatingSystemId" +
            " AND ra.Id = pd.RAMId AND ro.Id = pd.ROMId AND vu.ProductsId = pd.ProductId " +
            " AND pd.HotPId = 1";
        var func_4 = function (prevData, callback) {
            var arr = [];
            conn.query(sqlHot, function (error, resultsQuery, fields) {
                //  console.log(resultsQuery);
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var k1 = [];
                    for (var i = 0; i < resultsQuery.length; i++) {
                        arr[i] = resultsQuery[i].ProductId;
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
                    var hot = [];
                    for (let h = 0; h < item2.length; h++) {
                        var itemID = parseInt(item2[h]);

                        var value2 = [];
                        for (let j = 0; j < item2[h].length; j++) {
                            value2[j] = {
                                "valueId": resultsQuery[item2[h][j]].vuID,
                                "valueImg": resultsQuery[item2[h][j]].vuImage,
                                "valueVideo": resultsQuery[item2[h][j]].vuVideo
                            }
                        }
                        var k = resultsQuery[itemID];
                        var abc = {
                            product:{
                                product_id:k.ProductId,
                                name: k.Name,
                                cover_price: parseFloat(k.Cover_price),
                                origin_price: parseFloat(k.Origin_price),
                                figure: parseInt(k.Figure),
                                description: k.Description,
                                title: k.Title,
                                specifications: k.Specifications,
                                rate: k.Rate,
                                sim: k.Sim,
                                screen: k.Screen,
                                cpu: k.Cpu,
                                gpu: k.Gpu,
                                frontcam: k.FrontCamera,
                                cam: k.Camera,
                                battery: k.Battery,
                                connectivity: k.Connectivity,
                                color:{
                                    id: k.ColorId,
                                    name: k.ColorName
                                },
                                os:{
                                    id: k.OsId,
                                    name: k.OsName
                                },
                                ram:{
                                    id: k.RamId,
                                    name: k.RamName
                                },
                                rom:{
                                    id: k.RomId,
                                    name: k.RomName
                                },
                                category:{
                                    id: k.CategoryId,
                                    name: k.CategoryName
                                },
                                value2
                            }
                        };
                        hot.push(abc);
                    }
                    var final = {
                        "banner": prevData.banner,
                        "channel": prevData.channel,
                        "act": prevData.act,
                        "seckill": prevData.seckill,
                        hot
                    }
                    callback(null, final);
                }
            })
        }
        arrayOfFuncs.push(func_4);

        //Get HOT
        var sqlRecommend = "SELECT distinct pd.*, vu.Id as vuID ,vu.UrlImage as vuImage , vu.UrlVideo as vuVideo," +
            " ct.Id as CategoryId, ct.Name as CategoryName , cl.id as ColorId,cl.Name as ColorName,os.Id as OsId, " +
            " os.Name as OsName , ra.Id as RamId, ra.Name as RamName, ro.Id as RomId, ro.Name as RomName " +
            " FROM products as pd, ram as ra,category as ct, color as cl, seckill as sk," +
            " operatingsystem as os, rom as ro ,valueurl as vu " +
            " where ct.Id=pd.CategoryId AND cl.Id = pd.ColorId AND os.Id = pd.OperatingSystemId" +
            " AND ra.Id = pd.RAMId AND ro.Id = pd.ROMId AND vu.ProductsId = pd.ProductId " +
            " AND pd.RecommendedPId = 1";
        var func_5 = function (prevData, callback) {
            var arr = [];
            conn.query(sqlRecommend, function (error, resultsQuery, fields) {
                //  console.log(resultsQuery);
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    var k1 = [];
                    for (var i = 0; i < resultsQuery.length; i++) {
                        arr[i] = resultsQuery[i].ProductId;
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
                    var recommend = [];
                    for (let h = 0; h < item2.length; h++) {
                        var itemID = parseInt(item2[h]);

                        var value2 = [];
                        for (let j = 0; j < item2[h].length; j++) {
                            value2[j] = {
                                "valueId": resultsQuery[item2[h][j]].vuID,
                                "valueImg": resultsQuery[item2[h][j]].vuImage,
                                "valueVideo": resultsQuery[item2[h][j]].vuVideo
                            }
                        }
                        var k = resultsQuery[itemID];
                        var abc = {
                            product:{
                                product_id:k.ProductId,
                                name: k.Name,
                                cover_price: parseFloat(k.Cover_price),
                                origin_price: parseFloat(k.Origin_price),
                                figure: parseInt(k.Figure),
                                description: k.Description,
                                title: k.Title,
                                specifications: k.Specifications,
                                rate: k.Rate,
                                sim: k.Sim,
                                screen: k.Screen,
                                cpu: k.Cpu,
                                gpu: k.Gpu,
                                frontcam: k.FrontCamera,
                                cam: k.Camera,
                                battery: k.Battery,
                                connectivity: k.Connectivity,
                                color:{
                                    id: k.ColorId,
                                    name: k.ColorName
                                },
                                os:{
                                    id: k.OsId,
                                    name: k.OsName
                                },
                                ram:{
                                    id: k.RamId,
                                    name: k.RamName
                                },
                                rom:{
                                    id: k.RomId,
                                    name: k.RomName
                                },
                                category:{
                                    id: k.CategoryId,
                                    name: k.CategoryName
                                },
                                value2
                            }
                        };
                        recommend.push(abc);
                    }
                    var final = {
                        "banner": prevData.banner,
                        "channel": prevData.channel,
                        "act": prevData.act,
                        "seckill": prevData.seckill,
                        "hot":prevData.hot,
                         recommend
                    }
                    callback(null, final);
                }
            })
        }
        arrayOfFuncs.push(func_5);
        async.waterfall(arrayOfFuncs, function (errString, finalResult) {
            if (errString) {
                return res.send(errString);
            } else {
                return res.send(finalResult);
            }
        });
    }
}