
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
            res.redirect('/talkingpoints/view/'+result.insertId);
        });
    } else {
        var sql = "SELECT `ID`, `Title` FROM `Causes`";
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Causes not found!";
    
            res.render('talkingpoints.ejs', { data: result, message: message });
        });
    }
}



exports.edit = function (req, res) {
    var message = '';
    var id = req.params.id;
    var sql = "SELECT * FROM `talkingpoints` WHERE `id`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "Cause not found!";
      
        res.render('talkingpoints.ejs', { data: result, message: message });
    });
};