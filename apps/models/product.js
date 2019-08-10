'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');
var ValueUrl = function (valueId, valueImg, valueVideo) {
    this.valueId = valueId;
    this.valueImg = valueImg;
    this.valueVideo = valueVideo;
};


ValueUrl.getAll = function (req, res) {
    let sql = "SELECT distinct pd.*, vu.Id,vu.UrlImage,vu.UrlVideo," +
        " ct.Id as CategoryId, ct.Name as CategoryName , cl.id as ColorId,cl.Name as ColorName," +
        " os.Id as OsId, os.Name as OsName ,ra.Id as RamId, ra.Name as RamName, ro.Id as RomId," +
        " ro.Name as RomName FROM products as pd, ram as ra,category as ct, color as cl," +
        " operatingsystem as os, rom as ro ,valueurl as vu " +
        " where ct.Id=pd.CategoryId AND cl.Id = pd.ColorId AND os.Id = pd.OperatingSystemId" +
        " AND ra.Id = pd.RAMId AND ro.Id = pd.ROMId AND vu.ProductsId = pd.ProductId";

    var arrayOfFuncs = [];
    var func_2 = function (callback) {
        var arr = [];
        conn.query(sql, function (error, resultsQuery, fields) {
            if (error) {
                console.log('error');
                callback(error, null);
            } else {
                var arr1 = [];
                var arr2 = [];

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
                for (const [key, value] of Object.entries(element_obj)) {
                    var result = "";
                    var item = [];
                    for (var i = 0; i < value.length; i++) {
                        console.log(resultsQuery[value[i]]);
                        result += resultsQuery[value[i]].Id + ":" + resultsQuery[value[i]].UrlImage + ":" +
                            resultsQuery[value[i]].UrlVideo + ":" + resultsQuery[value[i]].Name +
                            ":" + resultsQuery[value[i]].Cover_price + ":" + resultsQuery[value[i]].Origin_price +
                            ":" + resultsQuery[value[i]].Figure + ":" + resultsQuery[value[i]].Description +
                            ":" + resultsQuery[value[i]].Title + ":" + resultsQuery[value[i]].Specifications +
                            ":" + resultsQuery[value[i]].Rate + ":" + resultsQuery[value[i]].Sim +
                            ":" + resultsQuery[value[i]].Screen + ":" + resultsQuery[value[i]].Cpu +
                            ":" + resultsQuery[value[i]].Gpu + ":" + resultsQuery[value[i]].FrontCamera +
                            ":" + resultsQuery[value[i]].Cam + ":" + resultsQuery[value[i]].Battery +
                            ":" + resultsQuery[value[i]].Connectivity + ":" + resultsQuery[value[i]].ColorId +
                            ":" + resultsQuery[value[i]].ColorName + ":" + resultsQuery[value[i]].OsId +
                            ":" + resultsQuery[value[i]].OsName + ":" + resultsQuery[value[i]].RamId +
                            ":" + resultsQuery[value[i]].RamName + ":" + resultsQuery[value[i]].RomId +
                            ":" + resultsQuery[value[i]].RomName + ":" + resultsQuery[value[i]].CategoryId +
                            ":" + resultsQuery[value[i]].CategoryName +
                            ";";
                    }
                    result = result.substring(0, result.length - 1);
                    result = result.split(";");
                    var arr3 = [];
                    var name = "",
                        cover_price = "",
                        origin_price = "",
                        figure = "",
                        description = "",
                        title = "",
                        specifications = "",
                        rate = "",
                        sim = "",
                        screen = "",
                        cpu = "",
                        gpu = "",
                        frontcam = "",
                        cam = "",
                        battery = "",
                        connectivity = "";
                    var color = {
                        id: "",
                        name: ""
                    };
                    var os = {
                        id: "",
                        name: ""
                    };
                    var ram = {
                        id: "",
                        name: ""
                    };
                    var rom = {
                        id: "",
                        name: ""
                    };
                    var category = {
                        id: "",
                        name: ""
                    };
                    for (let i = 0; i < result.length; i++) {
                        item[i] = result[i].split(":");
                        // console.log(item[i]);
                        name = item[i][3];
                        cover_price = item[i][4];
                        origin_price = item[i][5];
                        figure = item[i][6];
                        description = item[i][7];
                        title = item[i][8];
                        specifications = item[i][9];
                        rate = item[i][10];
                        sim = item[i][11];
                        screen = item[i][12];
                        cpu = item[i][13];
                        gpu = item[i][14];
                        frontcam = item[i][15];
                        cam = item[i][16];
                        battery = item[i][17];
                        connectivity = item[i][18];
                        color.id = item[i][19];
                        color.name = item[i][20];
                        os.id = item[i][21];
                        os.name = item[i][22];
                        ram.id = item[i][23];
                        ram.name = item[i][24];
                        rom.id = item[i][25];
                        rom.name = item[i][26];
                        category.id = item[i][27];
                        category.name = item[i][28];
                        arr3[i] = {
                            "valueId": item[i][0],
                            "valueImg": item[i][1],
                            "valueVideo": item[i][2]
                        };
                    }
                    var xyz = {
                        "product_id": key,
                        "name": name,
                        "cover_price": parseFloat(cover_price),
                        "origin_price": parseFloat(origin_price),
                        "figure": parseInt(figure),
                        "description": description,
                        "title": title,
                        "specifications": specifications,
                        "rate": rate,
                        "screen": screen,
                        "cpu": cpu,
                        "gpu": gpu,
                        "frontcam": frontcam,
                        "battery": battery,
                        "connectivity": connectivity,
                        color,
                        os,
                        ram,
                        rom,
                        category,
                        "value": arr3
                    }
                    arr1.push(xyz)
                }
                callback(null, arr1);
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
}
ValueUrl.getProductCategory = function (req, res) {
    let sql = "SELECT distinct pd.*, vu.Id,vu.UrlImage,vu.UrlVideo," +
        " ct.Id as CategoryId, ct.Name as CategoryName , cl.id as ColorId,cl.Name as ColorName," +
        " os.Id as OsId, os.Name as OsName ,ra.Id as RamId, ra.Name as RamName, ro.Id as RomId," +
        " ro.Name as RomName FROM products as pd, ram as ra,category as ct, color as cl," +
        " operatingsystem as os, rom as ro ,valueurl as vu " +
        " where ct.Id=pd.CategoryId AND cl.Id = pd.ColorId AND os.Id = pd.OperatingSystemId" +
        " AND ra.Id = pd.RAMId AND ro.Id = pd.ROMId AND vu.ProductsId = pd.ProductId AND ct.Id =?";

    var arrayOfFuncs = [];
    var func_2 = function (callback) {
        var arr = [];
        conn.query(sql, [req.params.Id], function (error, resultsQuery, fields) {
            if (error) {
                console.log('error');
                callback(error, null);
            } else {
                var arr1 = [];
                var arr2 = [];

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
                for (const [key, value] of Object.entries(element_obj)) {
                    var result = "";
                    var item = [];
                    for (var i = 0; i < value.length; i++) {
                        console.log(resultsQuery[value[i]]);
                        result += resultsQuery[value[i]].Id + ":" + resultsQuery[value[i]].UrlImage + ":" +
                            resultsQuery[value[i]].UrlVideo + ":" + resultsQuery[value[i]].Name +
                            ":" + resultsQuery[value[i]].Cover_price + ":" + resultsQuery[value[i]].Origin_price +
                            ":" + resultsQuery[value[i]].Figure + ":" + resultsQuery[value[i]].Description +
                            ":" + resultsQuery[value[i]].Title + ":" + resultsQuery[value[i]].Specifications +
                            ":" + resultsQuery[value[i]].Rate + ":" + resultsQuery[value[i]].Sim +
                            ":" + resultsQuery[value[i]].Screen + ":" + resultsQuery[value[i]].Cpu +
                            ":" + resultsQuery[value[i]].Gpu + ":" + resultsQuery[value[i]].FrontCamera +
                            ":" + resultsQuery[value[i]].Camera + ":" + resultsQuery[value[i]].Battery +
                            ":" + resultsQuery[value[i]].Connectivity + ":" + resultsQuery[value[i]].ColorId +
                            ":" + resultsQuery[value[i]].ColorName + ":" + resultsQuery[value[i]].OsId +
                            ":" + resultsQuery[value[i]].OsName + ":" + resultsQuery[value[i]].RamId +
                            ":" + resultsQuery[value[i]].RamName + ":" + resultsQuery[value[i]].RomId +
                            ":" + resultsQuery[value[i]].RomName + ":" + resultsQuery[value[i]].CategoryId +
                            ":" + resultsQuery[value[i]].CategoryName +
                            ";";
                    }
                    result = result.substring(0, result.length - 1);
                    result = result.split(";");
                    var arr3 = [];
                    var name = "",
                        cover_price = "",
                        origin_price = "",
                        figure = "",
                        description = "",
                        title = "",
                        specifications = "",
                        rate = "",
                        sim = "",
                        screen = "",
                        cpu = "",
                        gpu = "",
                        frontcam = "",
                        cam = "",
                        battery = "",
                        connectivity = "";
                    var color = {
                        id: "",
                        name: ""
                    };
                    var os = {
                        id: "",
                        name: ""
                    };
                    var ram = {
                        id: "",
                        name: ""
                    };
                    var rom = {
                        id: "",
                        name: ""
                    };
                    var category = {
                        id: "",
                        name: ""
                    };
                    for (let i = 0; i < result.length; i++) {
                        item[i] = result[i].split(":");
                        // console.log(item[i]);
                        name = item[i][3];
                        cover_price = item[i][4];
                        origin_price = item[i][5];
                        figure = item[i][6];
                        description = item[i][7];
                        title = item[i][8];
                        specifications = item[i][9];
                        rate = item[i][10];
                        sim = item[i][11];
                        screen = item[i][12];
                        cpu = item[i][13];
                        gpu = item[i][14];
                        frontcam = item[i][15];
                        cam = item[i][16];
                        battery = item[i][17];
                        connectivity = item[i][18];
                        color.id = item[i][19];
                        color.name = item[i][20];
                        os.id = item[i][21];
                        os.name = item[i][22];
                        ram.id = item[i][23];
                        ram.name = item[i][24];
                        rom.id = item[i][25];
                        rom.name = item[i][26];
                        category.id = item[i][27];
                        category.name = item[i][28];
                        arr3[i] = {
                            "valueId": item[i][0],
                            "valueImg": item[i][1],
                            "valueVideo": item[i][2]
                        };
                    }
                    var xyz = {
                        "product_id": key,
                        "name": name,
                        "cover_price": parseFloat(cover_price),
                        "origin_price": parseFloat(origin_price),
                        "figure": parseInt(figure),
                        "description": description,
                        "title": title,
                        "specifications": specifications,
                        "rate": rate,
                        "sim": sim,
                        "screen": screen,
                        "cpu": cpu,
                        "gpu": gpu,
                        "frontcam": frontcam,
                        "cam": cam,
                        "battery": battery,
                        "connectivity": connectivity,
                        color,
                        os,
                        ram,
                        rom,
                        category,
                        "value": arr3
                    }
                    arr1.push(xyz)
                }
                callback(null, arr1);
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
}
ValueUrl.detail = (req, res) => {
    let sql = 'SELECT * FROM products WHERE id = ?'
    conn.query(sql, [req.params.productId], (err, response) => {
        if (err) throw err
        res.json(response[0])
    })
}
ValueUrl.update = (req, res) => {
    let data = req.body;
    let productId = req.params.productId;
    let sql = 'UPDATE products SET ? WHERE id = ?'
    conn.query(sql, [data, productId], (err, response) => {
        if (err) throw err
        res.json({
            message: 'Update success!'
        })
    })
}
ValueUrl.save = (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO products SET ?'
        conn.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Insert success!'
            })
        })
    },
    ValueUrl.delete = (req, res) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        conn.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Delete success!'
            })
        })
    }
module.exports = ValueUrl;