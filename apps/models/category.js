'use strict'
var sql = require('../common/database.js');
var conn = sql.getConnection();
var Category = function (category) {
    this.category = category.category;
    this.status = category.status;
    this.created_at = new Date();
};
Category.createCategory = function (newCategory, result) {
    conn.query("INSERT INTO category set ?", newCategory, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Category.getCategoryById = function (categoryId, result) {
    conn.query("Select name from category where id = ? ", categoryId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Category.getAllCategory = function (result) {
    conn.query("Select * from category", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('category : ', res);
            result(null, res);
        }
    });
};
Category.getFiveCategory = function (result) {
    conn.query("Select * from category LIMIT 5", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('category : ', res);
            result(null, res);
        }
    });
};
Category.updateById = function (id, category, result) {
    conn.query("UPDATE category SET name = ? WHERE id = ?", [category.name, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Category.remove = function (id, result) {
    conn.query("DELETE FROM category WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};
module.exports = Category;