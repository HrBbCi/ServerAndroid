'use strict';
var db = require('../common/database.js');
var conn = db.getConnection();
var async = require('async');
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

function log(arr) {
    for (var i = 0; i < arr.length; i++) {
        
    }
}
//Product ID
function getProduct1(resultsQuery){
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
function getProduct2(resultsQuery){
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
function getProduct3(keyy){
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
function getProduct4(resultsQuery){
	var arr3 = [];

	for (var i = 0; i < resultsQuery.length; i++) {
		arr3[i] = resultsQuery[i].pdId + "//" + resultsQuery[i].vuId+ "//" + resultsQuery[i].vuImage;
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
//Url Image, Video 2
function getProduct5(resultsQuery){
	return item2_seckill;
}
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
                
                    for (var i = 0; i < resultsQuery.length; i++) {
                        banner[i] = {
                            id: parseInt(resultsQuery[i].BannerId),
                            option: 1,
                            type: 1,
                            value: {
                                vuId: resultsQuery[i].Id,
                                vuImage: resultsQuery[i].UrlImage,
                                vuVideo: resultsQuery[i].UrlVideo
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
                                vuId: resultsQuery[i].Id,
                                vuImage: resultsQuery[i].UrlImage,
                                vuVideo: resultsQuery[i].UrlVideo
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
                                vuId: resultsQuery[i].Id,
                                vuImage: resultsQuery[i].UrlImage,
                                vuVideo: resultsQuery[i].UrlVideo
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
        var sqlSeckill = "SELECT distinct pd.Id as pdId, pd.Figure as TotalFigure, pd.Description, " +
         " pd.Rate, pd.Material,pd.Type, dp.Size, dp.Tittle, dp.Name as dpName, dp.CoverPrice,dp.OriginPrice,dp.Figure as DpFirgure,  " +
         " cl.Id as clId, cl.Name as clName, ct.Id as ctId, ct.Name as ctName,  " +
         " vu.Id as vuId ,vu.UrlImage as vuImage ,vu.UrlVideo as vuVideo , sk.Id as skId, sk.Start_time , sk.End_time" +
         " from product as pd, detailproduct as dp, color as cl, category as ct, seckill as sk, " +
         " valueurl as vu where pd.Id = dp.ProductId and cl.Id = dp.ColorId " +
         " AND ct.Id = pd.CategoryId AND vu.ProductsId = pd.Id " +
         " AND pd.Id = sk.ProductId AND sk.State = 0;";
        var func_3 = function (prevData, callback) {
            var arr_seckill = [];
            conn.query(sqlSeckill, function (error, resultsQuery, fields) {
                
                if (error) {
                    console.log('error');
                    callback(error, null);
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
						arr_vuId = arr_vuId.substring(0,arr_vuId.length-1);
						rvs = arr_vuId.split(":");
						
						var arr_vuImage = k_urlImg_1[indexkk].vuImage;
						arr_vuId = arr_vuId.substring(0,arr_vuId.length-1);
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

            
					for (var i = 0; i < resultsQuery.length; i++) {
						arr_seckill[i] = resultsQuery[i].pdId;
					}
					var element_obj_seckill = element_obj_f(arr_seckill);
					var k11_seckill = [];
					for (const [key, value] of Object.entries(element_obj_seckill)) {
						var result = "";
						for (var i = 0; i < value.length; i++) {
							result += value[i] + ":";
						}
						k11_seckill.push({
							result,
							key
						});
					}
					
					var result2_seckill = "";
					for (let index = 0; index < k11_seckill.length; index++) {
						result2_seckill += k11_seckill[index].result + ";";
					}
					result2_seckill = result2_seckill.substring(0, result2_seckill.length - 1);
					var item_seckill = result2_seckill.split(";");

					var item2_seckill = [];
					for (let index = 0; index < item_seckill.length; index++) {
						var x = item_seckill[index] + "";
						x = x.substring(0, x.length - 1);
						item2_seckill[index] = x.split(":");
					}
                  
					
                    var k22_seckill = [];
					
					var products = [];
                    for (let index_seckill = 0; index_seckill < item2_seckill.length; index_seckill++) {
						
						var itemID_2_seckill = parseInt(item2_seckill[index_seckill]);

						var k_2_seckill = resultsQuery[itemID_2_seckill];
						
						
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
							var count = 0;
							for (let index_1 = 0; index_1 < value_1.length; index_1++) {							
								if(k_2.pdId === value_1[index_1].product_id ){		
									var length = value_1[index_1].value_1_1.length;
									var xxx =[];
									for (let index_1_1 = 0; index_1_1 < length; index_1_1++) {	
										var abc = value_1[index_1].value_1_1[index_1_1];
										var abcd = {
											"vuId": abc.vuId,
											"vuImage": abc.vuImage,
											"vuVideo": null
										}
										xxx.push(abcd);
									}				
									value=xxx;							
								//	value=value_1[index_1].value_1_1;
								}
							}		
							
							var category = {
								"id": k_2.ctId,
								"name": k_2.ctName
							}
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
						for(let i_products = 0 ; i_products < item2.length; i_products++ ){						
							if(k_2_seckill.pdId === products[i_products].product_id){
								
								k22_seckill.push(products[i_products]);
							}	
						}		
					}
                    var seckill = {
                        id: parseInt(resultsQuery[i].skId),
                        start_time: resultsQuery[i].Start_time,
                        end_time: resultsQuery[i].End_time,
                        list: k22_seckill
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
       var sqlHot = "SELECT distinct pd.Id as pdId, pd.Figure as TotalFigure, pd.Description, " +
        " pd.Rate, pd.Material,pd.Type, dp.Size, dp.Tittle, dp.Name as dpName, dp.CoverPrice,dp.OriginPrice,dp.Figure as DpFirgure,   " +
        " cl.Id as clId, cl.Name as clName, ct.Id as ctId, ct.Name as ctName,  " +
        " vu.Id as vuId ,vu.UrlImage as vuImage ,vu.UrlVideo as vuVideo " +
        " from product as pd, detailproduct as dp, color as cl, category as ct, " +
        " valueurl as vu where pd.Id = dp.ProductId and cl.Id = dp.ColorId " +
        " AND ct.Id = pd.CategoryId AND vu.ProductsId = pd.Id AND pd.HotPId = 1 ";
        var func_4 = function (prevData, callback) {
            var arr_hot = [];
            conn.query(sqlHot, function (error, resultsQuery, fields) {
                
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    //Product
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
						arr_vuId = arr_vuId.substring(0,arr_vuId.length-1);
						rvs = arr_vuId.split(":");
						
						var arr_vuImage = k_urlImg_1[indexkk].vuImage;
						arr_vuId = arr_vuId.substring(0,arr_vuId.length-1);
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
					//Hot
                    for (var i = 0; i < resultsQuery.length; i++) {
                        arr_hot[i] = resultsQuery[i].pdId;
                    }
                    var element_obj_hot =  element_obj_f(arr_hot);
                    var k11_hot = [];
                    for (const [key, value] of Object.entries(element_obj_hot)) {
                        var result = "";
                        for (var i = 0; i < value.length; i++) {
                            result += value[i] + ":";
                        }
                        k11_hot.push({
                            result,
                            key
                        });
                    }
					
                    var result2_hot = "";
                    for (let index = 0; index < k11_hot.length; index++) {
                        result2_hot += k11_hot[index].result + ";";
                    }
					
                    result2_hot = result2_hot.substring(0, result2_hot.length - 1);
                    var item_hot = result2_hot.split(";");

                    var item2_hot = [];
                    for (let index = 0; index < item_hot.length; index++) {
                        var x = item_hot[index] + "";
                        x = x.substring(0, x.length - 1);
                        item2_hot[index] = x.split(":");
                    }
							
                    var hot = [];
					var products = [];
                    for (let h = 0; h < item2_hot.length; h++) {
						
                        var itemID_hot = parseInt(item2_hot[h]);
						var k_2_hot = resultsQuery[itemID_hot];
						
						
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
							var count = 0;
							for (let index_1 = 0; index_1 < value_1.length; index_1++) {							
								if(k_2.pdId === value_1[index_1].product_id ){		
									var length = value_1[index_1].value_1_1.length;
									var xxx =[];
									for (let index_1_1 = 0; index_1_1 < length; index_1_1++) {	
										var abc = value_1[index_1].value_1_1[index_1_1];
										var abcd = {
											"vuId": abc.vuId,
											"vuImage": abc.vuImage,
											"vuVideo": null
										}
										xxx.push(abcd);
									}				
									value=xxx;							
								//	value=value_1[index_1].value_1_1;
								}
							}		
							
							var category = {
								"id": k_2.ctId,
								"name": k_2.ctName
							}
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
						
						for(let i_products = 0 ; i_products < item2.length; i_products++ ){						
							if(k_2_hot.pdId === products[i_products].product_id){
								hot.push({"product":products[i_products]});
							}	
						}	
                        
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
        var sqlRecommend = "SELECT distinct pd.Id as pdId, pd.Figure as TotalFigure, pd.Description, " +
        " pd.Rate, pd.Material,pd.Type, dp.Size, dp.Tittle, dp.Name as dpName, dp.CoverPrice,dp.OriginPrice,dp.Figure as DpFirgure,   " +
        " cl.Id as clId, cl.Name as clName, ct.Id as ctId, ct.Name as ctName,  " +
        " vu.Id as vuId ,vu.UrlImage as vuImage ,vu.UrlVideo as vuVideo " +
        " from product as pd, detailproduct as dp, color as cl, category as ct, " +
        " valueurl as vu where pd.Id = dp.ProductId and cl.Id = dp.ColorId " +
        " AND ct.Id = pd.CategoryId AND vu.ProductsId = pd.Id AND pd.RecommendedPId = 1 ";
        var func_5 = function (prevData, callback) {
            var arr_recommend = [];
            conn.query(sqlRecommend, function (error, resultsQuery, fields) {
             
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    //Product
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
						arr_vuId = arr_vuId.substring(0,arr_vuId.length-1);
						rvs = arr_vuId.split(":");
						
						var arr_vuImage = k_urlImg_1[indexkk].vuImage;
						arr_vuId = arr_vuId.substring(0,arr_vuId.length-1);
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
					//Hot
                    for (var i = 0; i < resultsQuery.length; i++) {
                        arr_recommend[i] = resultsQuery[i].pdId;
                    }
                    var element_obj_recommend =  element_obj_f(arr_recommend);
                    var k11_recommend = [];
                    for (const [key, value] of Object.entries(element_obj_recommend)) {
                        var result = "";
                        for (var i = 0; i < value.length; i++) {
                            result += value[i] + ":";
                        }
                        k11_recommend.push({
                            result,
                            key
                        });
                    }
					
                    var result2_recommend = "";
                    for (let index = 0; index < k11_recommend.length; index++) {
                        result2_recommend += k11_recommend[index].result + ";";
                    }
					
                    result2_recommend = result2_recommend.substring(0, result2_recommend.length - 1);
                    var item_recommend = result2_recommend.split(";");

                    var item2_recommend = [];
                    for (let index = 0; index < item_recommend.length; index++) {
                        var x = item_recommend[index] + "";
                        x = x.substring(0, x.length - 1);
                        item2_recommend[index] = x.split(":");
                    }
							
                    var recommend = [];
					var products = [];
                    for (let h = 0; h < item2_recommend.length; h++) {
						
                        var itemID_recommend = parseInt(item2_recommend[h]);
						var k_2_recommend = resultsQuery[itemID_recommend];
						
						
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
							var count = 0;
							for (let index_1 = 0; index_1 < value_1.length; index_1++) {							
								if(k_2.pdId === value_1[index_1].product_id ){		
									var length = value_1[index_1].value_1_1.length;
									var xxx =[];
									for (let index_1_1 = 0; index_1_1 < length; index_1_1++) {	
										var abc = value_1[index_1].value_1_1[index_1_1];
										var abcd = {
											"vuId": abc.vuId,
											"vuImage": abc.vuImage,
											"vuVideo": null
										}
										xxx.push(abcd);
									}				
									value=xxx;							
								//	value=value_1[index_1].value_1_1;
								}
							}		
							
							var category = {
								"id": k_2.ctId,
								"name": k_2.ctName
							}
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
						
						for(let i_products = 0 ; i_products < item2.length; i_products++ ){						
							if(k_2_recommend.pdId === products[i_products].product_id){
								recommend.push({"product":products[i_products]});
							}	
						}	
                        
                    }
                    var result = {
                        "result": {
                            "banner": prevData.banner,
                            "channel": prevData.channel,
                            "act": prevData.act,
                            "seckill": prevData.seckill,
                            "hot": prevData.hot,
                            recommend
                        }
                    };

                    callback(null, result);
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