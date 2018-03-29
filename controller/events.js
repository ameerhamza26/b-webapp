var authentication =require('../helpers/authentication');
var moment = require('moment');
var mysql = require('promise-mysql');
var config = require('../config');


exports.create = function (req, res) {
    message = '';
    if (req.method == "POST") {
        
        var post = req.body;
        var cause_id = post.cause;
        var title = post.title;
        var location = post.location;
        var start_date = post.start_date;
        var end_date = post.end_date;
        var notes = post.notes;
        
        var sql = "INSERT INTO `Events`(`CauseId`,`Title`,`Location`,`StartDate`, `EndDate`, `Notes`) VALUES ('" + cause_id + "','" + title + "','" + location + "','" + start_date + "','" + end_date + "','" + notes + "')";

        var query = db.query(sql, function (err, result) {
            res.redirect('/events');
        });
    } else {
        var sql = "SELECT `ID`, `Title` FROM `Causes`";
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Causes not found!";
    
            res.render('events.ejs', { data: result, message: message });
        });
    }
}



exports.edit = function (req, res) {
    var message = '';
    var id = req.params.id;
    if (req.method == "POST") {
        var post = req.body;
        var cause_id = post.cause;
        var title = post.title;
        var location = post.location;
        var start_date = post.start_date;
        var end_date = post.end_date;
        var notes = post.notes;

        var sql = "Update `events` set CauseId = " + cause_id + " , Title = '" + title + "' , Location = '" + location + "' , StartDate = '" + start_date + "' , EndDate = '" + end_date + "' , Notes = '"+ notes +"' where id = " + id;
        var query = db.query(sql, function (err, result) {
            console.log(err);
            res.redirect('/events');
        });
    }
    else {
        var sql = "SELECT * FROM `events` WHERE `id`='" + id + "'";
        
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
                final_obj.moment = moment;
                final_obj.message = message;
                res.render('eventedit.ejs', final_obj);
            })
    }

};


exports.get =function(req,res) {

    if (!authentication.authenticate(req)){
        res.redirect("/login");
        return;
    }

    var sql = "";
    
    if (req.query.title) {
        title= req.query.title;
        sql = "Select `events`.*, causes.Title as CauseTitle from `events` INNER JOIN causes on `events`.CauseId = causes.ID where CauseTitle like '%" + title+"%'";
    }
    else {
        sql = "Select `events`.*, causes.Title as CauseTitle from `events` INNER JOIN causes on `events`.CauseId = causes.ID";
    }
    
    db.query(sql, function(err, result){
        if (result) {
            if(result.length >= 0){
                res.render('eventslist',{data: result});
            } else{
                res.render('eventslist',{data:[]})
            }
        } else{
            res.render('eventslist',{data:[]})
        }

    });
}

exports.getByCause = function(req,res) {
    var message = '';
    var id = req.params.causeId;
    var sql = "SELECT * FROM `events` WHERE `CauseId`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "Cause not found!";
      
        res.send({ data: result, message: message });
    });
}