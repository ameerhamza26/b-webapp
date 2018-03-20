var authentication =require('../helpers/authentication');

exports.get =function(req,res) {

    if (!authentication.authenticate(req)){
        res.redirect("/login");
        return;
    }

    var sql = "";
    
    if (req.query.title) {
        title= req.query.title;
        sql = "Select * from Survey";
    }
    else {
        sql = "Select * from Survey";
    }
    
    db.query(sql, function(err, result){
        if (result) {
            if(result.length >= 0){
                res.render('survey.ejs',{data: result});
            } else{
                res.render('survey.ejs',{data:[]})
            }
        } else{
            res.render('survey.ejs',{data:[]})
        }
    });
};

exports.create = function (req, res) {
    message = '';
    if (req.method == "POST") {
        
        var post = req.body;
        var cause_id = post.causeId;
        var title = post.title;
        
        var sql = "INSERT INTO `Survey`(`CauseId`,`Title`) VALUES ('" + cause_id + "','" + title + "')";

        var query = db.query(sql, function (err, result) {
            res.redirect('/survey/edit/'+result.insertId);
        });
    } else {
        var sql = "SELECT `ID`, `Title` FROM `Causes`";
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Causes not found!";
    
            res.render('createsurvey.ejs', { data: result, message: message });
        });
    }
};