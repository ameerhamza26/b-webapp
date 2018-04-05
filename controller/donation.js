var authentication =require('../helpers/authentication');
var moment = require('moment');
var mysql = require('promise-mysql');
var config = require('../config');

exports.create = function (req, res) {
    message = '';
    if (req.method == "POST") {
        
        var post = req.body;
        var cause_id = post.cause;
        var url = post.url;
        
        var sql = "INSERT INTO `donationurls`(`CauseId`,`Url`) VALUES ('" + cause_id + "','" + url + "')";

        var query = db.query(sql, function (err, result) {
            
            res.cookie('message', 'Donation url is successfully created')
            res.cookie('icon', 'success')
            res.cookie('heading', 'Success')
            res.redirect('/donationurls');
        });
    } else {
        var sql = "SELECT `ID`, `Title` FROM `causes`";
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Causes not found!";
    
            res.render('adddonation.ejs', { data: result, message: message });
        });
    }
}

exports.get =function(req,res) {
    
        if (!authentication.authenticate(req)){
            res.redirect("/login");
            return;
        }
    
        var sql = "";
        
        if (req.query.title) {
            title= req.query.title;
            sql = "select donationurls.*, causes.Title as CauseTitle from donationurls inner join causes on causes.ID = donationurls.CauseId where CauseTitle like '%" + title+"%'";
        }
        else {
            sql = "select donationurls.*, causes.Title as CauseTitle from donationurls inner join causes on causes.ID = donationurls.CauseId";
        }
        
        db.query(sql, function(err, result){
            if (result) {
                if(result.length >= 0){
                    res.render('donationlist',{data: result});
                } else{
                    res.render('donationlist',{data:[]})
                }
            } else{
                res.render('donationlist',{data:[]})
            }
    
        });
    }