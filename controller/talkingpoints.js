var authentication =require('../helpers/authentication');
var mysql = require('promise-mysql');
var config = require('../config');

exports.create = function (req, res) {
    message = '';
    var causeId = req.params.causeId;
    if (req.method == "POST") {
        
        var post = req.body;
        var cause_id = post.cause;
        var title = post.title;
        var description = post.description;
        description = description.replace(/'/g, '\\\'');
        
        title = title.replace(/'/g, '\\\'');

        var sql = "INSERT INTO `talkingpoints`(`CauseId`,`Title`,`Description`) VALUES ('" + cause_id + "','" + title + "','" + description + "')";

        var query = db.query(sql,  function (err, result) {
            console.log("Err",err);
            console.log(query.sql);
            console.log('result------',result.insertId);

            res.cookie('message', 'Talking point is successfully created')
            res.cookie('icon', 'success')
            res.cookie('heading', 'Success')
            res.redirect('/talkingpoints/'+causeId);
        });
    } else {
        var sql = "SELECT * FROM `causes` where ID = " + causeId;
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Talking points not found!";
    
            res.render('talkingpoints.ejs', { causes: result, message: message });
        });
    }
}



exports.edit = function (req, res) {
    var message = '';
    var id = req.params.id;
    var causeId = req.params.causeId;
    if (req.method == 'POST') {
        var post = req.body;
        var cause_id = post.cause;
        var title = post.title;
        var description = post.description;
        
        description = description.replace(/'/g, '\\\'');
        
        title = title.replace(/'/g, '\\\'');
        
        var sql ="Update  `talkingpoints` set CauseId = " + cause_id + " , \
        Title = '" + title + "' , \
        Description = '" + description + "' where id = " + id;

        var query = db.query(sql, function (err, result) {
            console.log(query.sql);
            console.log('result------',result.insertId);

            res.cookie('message', 'Talking point is successfully updated')
            res.cookie('icon', 'success')
            res.cookie('heading', 'Success')
            res.redirect('/talkingpoints/'+ causeId);
        });
    }
    else {
        var sql = "SELECT * FROM `talkingpoints` WHERE `id`='" + id + "'";
        
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
                final_obj.message = message;
                res.render('talkingpointedit.ejs', final_obj);
            })
    }
};

exports.getByCause = function(req,res) {
    var message = '';
    var id = req.params.causeId;
    var sql = "SELECT * FROM `talkingpoints` WHERE `CauseId`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "talkingpoints not found!";
      
        res.send({ data: result, message: message });
    });
}

exports.list = function(req,res){
    if (!authentication.authenticate(req)){
        res.redirect("/login");
        return;
    }


    var causeId = req.params.causeId;

    var sql = "Select * From talkingpoints where causeId = " + causeId;

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
        res.render('talkingpointlist',final_obj);
    })

}

exports.search = function(req,res) {
    var message = '';
    var title = req.query.title;
    var causeId = req.params.causeId;

    var sql = "select talkingpoints.* from talkingpoints \
    inner join \
    causes \
    on talkingpoints.CauseId = causes.ID \
    where talkingpoints.Title like '%"+ title+"%' \
    and causes.ID =  " + causeId; 

    var connection;
    mysql.createConnection(config.dbConfig).then(function(conn){
        connection = conn;
        var result = connection.query(sql);
        connection.end();
        return result;
    }).then(function(rows){
        res.send({data:rows});
    })
}

exports.delete = function(req,res) {
    var message = '';
    var id = req.params.id;

    var sql = "delete FROM `talkingpoints` where `id` =" + id;
        
    var final_obj = {};
    var connection;
    mysql.createConnection(config.dbConfig).then(function(conn){
        connection = conn;
        var result = connection.query(sql);
   
        return result;
    }).then(function(rows) {
        res.cookie('message', 'Talking point is deleted successfully')
        res.cookie('icon', 'success')
        res.cookie('heading', 'Success')
        res.send({status: 'success'});
    })
}