var authentication =require('../helpers/authentication');
var moment = require('moment');
var mysql = require('promise-mysql');
var config = require('../config');

exports.create = function (req, res) {
    message = '';
    var causeId = req.params.causeId; 
    if (req.method == "POST") {
        console.log('Post');

        var post = req.body;
        var cause_id = post.cause;
        var title = post.title;
        var description = post.description;

        description = description.replace(/'/g, '\\\'');
        
        title = title.replace(/'/g, '\\\'');

        var sql = "INSERT INTO `resources`(`Title`,`CauseId`, `Description`) VALUES ('" + title + "', '" + cause_id + "','" + description + "')";
        var connection;
        var resource;
        mysql.createConnection(config.dbConfig).then(function(conn){
            connection = conn;
            var result = connection.query(sql);
       
            return result;
        }).then(function(row){
            resource = row;
            if (!post.url1) {
               return ;
            }
            sql = "Insert into `resourceurls` (`ResourceId`, `Url`) values (" + resource.insertId+ ",'" + post.url1 +"' )";
            var result = connection.query(sql);
            
            return result;
        }).then(function(row) {
            if (!post.url2) {
                return ;
            }
            else {

            }
            sql = "Insert into `resourceurls` (`ResourceId`, `Url`) values (" + resource.insertId+ ",'" + post.url2 +"' )";
            var result = connection.query(sql);
            
            return result;
        }).then(function(row) {
            if (!post.url3) {
                return ;
            }
            sql = "Insert into resourceurls (`ResourceId`, `Url`) values (" + resource.insertId+ ",'" + post.url3 +"' )";
            var result = connection.query(sql);
            
            return result;
        }).then(function(row) {
            connection.end();
            res.cookie('message', 'Resources is successfully created')
            res.cookie('icon', 'success')
            res.cookie('heading', 'Success')

            res.redirect('/resources/'+causeId);
        }).catch(function(err) {
            console.log(err);
           // done(err);
        });
        // var query = db.query(sql, function (err, result) {
        //     res.redirect('/resources');
        // });
        // if (!req.files)
        //     return res.status(400).send('No files were uploaded.');

        // var file = req.files.res_file;
        // var file_name = file.name;

        // if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" || file) {

        //     file.mv('public/files/upload_files/' + file.name, function (err) {

        //         if (err)

        //             return res.status(500).send(err);
        //             console.log(cause_id);
                    
        //         var sql = "INSERT INTO `resources`(`Title`,`CauseId`, `Description`,`File`) VALUES ('" + title + "', '" + cause_id + "','" + description + "','" + file_name + "')";

        //         var query = db.query(sql, function (err, result) {
        //             res.redirect('/resources/edit/' + result.insertId);
        //         });
        //     });
    } else {
        var sql = "SELECT * FROM `causes` where ID = " + causeId;
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Causes not found!";

            res.render('resources.ejs', { causes: result, message: message });
        });
    }
}



exports.edit = function (req, res) {
    var message = '';
    var id = req.params.id;
    var connection;
    var causeId = req.params.causeId; 

    if (req.method == 'POST' ) {
        var resourceUrls;
        var post = req.body;
        var cause_id = post.cause;
        var title = post.title;
        var description = post.description;

        
        description = description.replace(/'/g, '\\\'');
        
        title = title.replace(/'/g, '\\\'');
        
        var sql = "Update `resources` set CauseId = " + cause_id + " , \
        Title =  '" + title +"' , \
        Description = '" + description + "' where ID = " + id; 
        mysql.createConnection(config.dbConfig).then(function(conn){
            connection = conn;
            var result = connection.query(sql);
            return result;
        }).then(function(rows) {
            sql = "Select * from `resourceurls` where ResourceId = " + id;
            var result = connection.query(sql);
            return result;
        }).then(function(rows) {
            resourceUrls = rows;
            if (!post.url1) {
                if (typeof resourceUrls[0] == "undefined") {
                    return ;
                }
                else {
                    sql = "delete from `resourceurls` where id = " + resourceUrls[0].ID;
                    var result = connection.query(sql);
                    return result;
                } 

            } else {
                if (typeof resourceUrls[0] == "undefined") {
                    sql = "Insert into `resourceurls` (`ResourceId`, `Url`) values (" + id + ",'" + post.url1 +"' )";
                }
                else {
                    sql = "Update `resourceurls` set ResourceId = " + id + " , \
                    Url = '" + post.url1 + "' where id = " + resourceUrls[0].ID;
                }
                var result = connection.query(sql);
                return result;
            }
        }).then(function(rows) {
            if (!post.url2) {
                if (typeof resourceUrls[1] == "undefined") {
                    return ;
                }
                else {
                    sql = "delete from `resourceurls` where id = " + resourceUrls[1].ID;
                    var result = connection.query(sql);
                    return result;
                } 

            } else {
                if (typeof resourceUrls[1] == "undefined") {
                    sql = "Insert into `resourceurls` (`ResourceId`, `Url`) values (" + id + ",'" + post.url2 +"' )";
                }
                else {
                    sql = "Update `resourceurls` set ResourceId = " + id + " , \
                    Url = '" + post.url2 + "' where id = " + resourceUrls[1].ID;
                }
                var result = connection.query(sql);
                return result;
            }
        }).then(function(rows) {
            if (!post.url3) {
                if (typeof resourceUrls[2] == "undefined") {
                    return ;
                }
                else {
                    sql = "delete from `resourceurls` where id = " + resourceUrls[2].ID;
                    var result = connection.query(sql);
                    return result;
                } 

            } else {
                if (typeof resourceUrls[2] == "undefined") {
                    sql = "Insert into `resourceurls` (`ResourceId`, `Url`) values (" + id + ",'" + post.url3 +"' )";
                }
                else {
                    sql = "Update `resourceurls` set ResourceId = " + id + " , \
                    Url = '" + post.url3 + "' where id = " + resourceUrls[2].ID;
                }
                var result = connection.query(sql);
                return result;
            }
        }).then(function(row) {
            connection.end();

            
            res.cookie('message', 'Resources is successfully updated')
            res.cookie('icon', 'success')
            res.cookie('heading', 'Success')
            res.redirect('/resources/'+causeId);
        }).catch(function(err) {
            console.log(err);
           // done(err);
        });
    }
    else {
        var sql = "SELECT * FROM `resources` WHERE `id`='" + id + "'";
        
        var final_obj = {};

        var resource ;
        mysql.createConnection(config.dbConfig).then(function(conn){
            connection = conn;
            var result = connection.query(sql);
       
            return result;
        }).then(function(rows){
            final_obj.data = rows;
            
            sql = "SELECT *  FROM `causes` where ID = " + causeId;
            result = connection.query(sql);
            return result;
        }).then(function(rows){
            final_obj.causes = rows;
            if (!final_obj.data[0]) {
                return;
            }
            sql = "SELECT * FROM `resourceurls` where ResourceId = " + final_obj.data[0].ID ;
            result = connection.query(sql);
            // Logs out a list of hobbits
            connection.end();
            return result;
        }).then(function(rows) {
            final_obj.url = rows;
            final_obj.message = message;
            res.render('resourceedit.ejs', final_obj);
        })
    }
};

exports.getByCause = function(req,res) {
    var message = '';
    var id = req.params.causeId;
    var sql = "SELECT * FROM `resources` WHERE `CauseId`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "resources not found!";
      
        res.send({ data: result, message: message });
    });
}

exports.getResourceUrls = function(req,res) {
    var message = '';
    var id = req.params.resourceId;
    var sql = "SELECT * FROM `resourceurls` WHERE `ResourceId`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "resourceurls not found!";
      
        res.send({ data: result, message: message });
    });
} 

exports.list = function(req,res) {
    if (!authentication.authenticate(req)){
        res.redirect("/login");
        return;
    }

    var causeId = req.params.causeId; 
    var sql = "Select * From resources where causeId = " + causeId;
    var final_obj = {};
    var connection;
    mysql.createConnection(config.dbConfig).then(function(conn){
        connection = conn;
        var result = connection.query(sql);
   
        return result;
    }).then(function(rows){
        final_obj.data = rows;
        sql = "SELECT * FROM `causes` where ID =" + causeId;
        result = connection.query(sql);
        // Logs out a list of hobbits
        connection.end();
        return result;
    }).then(function(rows) {
        final_obj.causes = rows;
        res.render('resourceslist',final_obj);
    })
}


exports.search = function(req,res) {
    var message = '';
    var title = req.query.title;
    var causeId = req.params.causeId; 

    var sql = "select resources.* from resources \
    inner join \
    causes \
    on resources.CauseId = causes.ID \
    where resources.Title like '%"+ title+"%' \
    and causes.ID = "+ causeId; 

    db.query(sql, function(err, result){
        if (err) {
            res.send({data:[]})
        }
        
        if(result.length >= 0){
            res.send({data: result});
        }else{
            res.send({data:[]})
        }
   });
}

exports.delete = function(req,res) {
    var message = '';
    var id = req.params.id;

    var sql = "delete FROM `resources` where `id` =" + id;
        
    var final_obj = {};
    var connection;
    mysql.createConnection(config.dbConfig).then(function(conn){
        connection = conn;
        var result = connection.query(sql);
   
        return result;
    }).then(function(rows) {
        res.cookie('message', 'Resource is deleted successfully')
        res.cookie('icon', 'success')
        res.cookie('heading', 'Success')
        res.send({status: 'success'});
    })
}