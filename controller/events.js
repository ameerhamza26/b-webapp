var authentication =require('../helpers/authentication');

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
            res.redirect('/events/edit/'+result.insertId);
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
    var sql = "SELECT * FROM `events` WHERE `id`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "Cause not found!";
      
        res.render('eventedit.ejs', { data: result, message: message });
    });
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