var q = require("q");
var db = require('../common/database.js');

var conn = db.getConnection();

function getAllPost(user) {
    
        var defer = q.defer();
        var query = conn.query('Select * from post', function(error, results, fields) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(results);
            }
            // Neat!
        });
        console.log(query.sql);
        return defer.promise;

   
}
function addPost(params) {
    if (params) {
        var defer = q.defer();
        var query = conn.query('INSERT INTO post SET ?', params, function(error, results, fields) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(results);
            }
            // Neat!
        });
        console.log(query.sql);
        return defer.promise;

    }
    return false;
}

function getPostByID(id){
    var defer = q.defer();
    var query = conn.query('Select * from post where ?',{id:id}, function(error, results, fields) {
        if (error) {
            defer.reject(error);
        } else {
            defer.resolve(results);
        }
        // Neat!
    });
    console.log(query.sql);
    return defer.promise;
}

module.exports={
    getAllPost : getAllPost,
    addPost :addPost,
    getPostByID: getPostByID
}