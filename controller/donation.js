var authentication =require('../helpers/authentication');
var moment = require('moment');
var mysql = require('promise-mysql');
var config = require('../config');

exports.create = function (req, res) {
    message = '';
    var causeId = req.params.causeId;
    if (req.method == "POST") {
        
        var post = req.body;
        var cause_id = post.cause;
        var url = post.url;
        
        var sql = "INSERT INTO `donationurls`(`CauseId`,`Url`) VALUES ('" + cause_id + "','" + url + "')";

        var query = db.query(sql, function (err, result) {
            
            res.cookie('message', 'Donation url is successfully created')
            res.cookie('icon', 'success')
            res.cookie('heading', 'Success')
            res.redirect('/donationurls/' + causeId);
        });
    } else {
        var sql = "SELECT `ID`, `Title` FROM `causes` where ID =" + causeId;
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Causes not found!";
    
            res.render('adddonation.ejs', { causes: result, message: message });
        });
    }
}

exports.get =function(req,res) {
    
        if (!authentication.authenticate(req)){
            res.redirect("/login");
            return;
        }
    
        var sql = "";
        
        var causeId = req.params.causeId;
        if (req.query.title) {
            title= req.query.title;
            sql = "select donationurls.*, causes.Title as CauseTitle from donationurls inner join causes on causes.ID = donationurls.CauseId where CauseTitle like '%" + title+"%'";
        }
        else {
            sql = "select donationurls.*, causes.Title as CauseTitle from donationurls inner join causes on causes.ID = donationurls.CauseId";
        }

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
        res.render('donationlist',final_obj);
    })

        
       
    }