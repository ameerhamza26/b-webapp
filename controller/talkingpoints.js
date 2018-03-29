var authentication =require('../helpers/authentication');
var mysql = require('promise-mysql');
var config = require('../config');

exports.create = function (req, res) {
    message = '';

    if (req.method == "POST") {
        
        var post = req.body;
        var cause_id = post.cause;
        var title = post.title;
        var description = post.description;

        var sql = "INSERT INTO `talkingpoints`(`CauseId`,`Title`,`Description`) VALUES ('" + cause_id + "','" + title + "','" + description + "')";

        var query = db.query(sql, function (err, result) {
            console.log(query.sql);
            console.log('result------',result.insertId);
            res.redirect('/talkingpoints');
        });
    } else {
        var sql = "SELECT `ID`, `Title` FROM `causes`";
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Talking points not found!";
    
            res.render('talkingpoints.ejs', { data: result, message: message });
        });
    }
}



exports.edit = function (req, res) {
    var message = '';
    var id = req.params.id;
    if (req.method == 'POST') {
        var post = req.body;
        var cause_id = post.cause;
        var title = post.title;
        var description = post.description;
        
        var sql ="Update  `talkingpoints` set CauseId = " + cause_id + " , \
        Title = '" + title + "' , \
        Description = '" + description + "' where id = " + id;

        var query = db.query(sql, function (err, result) {
            console.log(query.sql);
            console.log('result------',result.insertId);
            res.redirect('/talkingpoints');
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
                sql = "SELECT `ID`, `Title` FROM `Causes`";
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

    var sql = "Select * From talkingpoints";
    db.query(sql, function(err, result){
        if(result.length >= 0){
            res.render('talkingpointlist',{data: result});
        }else{
            res.render('talkingpointlist',{data:[]})
        }

    });

}

exports.search = function(req,res) {
    var message = '';
    var title = req.query.title;
    
    var sql = "select talkingpoints.* from talkingpoints \
    inner join \
    causes \
    on talkingpoints.CauseId = causes.ID \
    where talkingpoints.Title like '%"+ title+"%' \
    or causes.Title like '%"+ title +"%' "; 

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