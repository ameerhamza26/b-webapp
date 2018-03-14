
exports.create = function (req, res) {
    message = '';
    if (req.method == "POST") {
        console.log('Post');

        var post = req.body;
        var cause_id = post.cause;
        var title = post.title;
        var description = post.description;

        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        var file = req.files.res_file;
        var file_name = file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" || file) {

            file.mv('public/files/upload_files/' + file.name, function (err) {

                if (err)

                    return res.status(500).send(err);
                    console.log(cause_id);
                    
                var sql = "INSERT INTO `Resources`(`Title`,`CauseId`, `Description`,`File`) VALUES ('" + title + "', '" + cause_id + "','" + description + "','" + file_name + "')";

                var query = db.query(sql, function (err, result) {
                    res.redirect('/resources/edit/' + result.insertId);
                });
            });
        } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('resources.ejs', { message: message });
        }
    } else {
        console.log('Hello');
        var sql = "SELECT `ID`, `Title` FROM `Causes`";
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Causes not found!";

            res.render('resources.ejs', { data: result, message: message });
        });
    }
}



exports.edit = function (req, res) {
    var message = '';
    var id = req.params.id;
    var sql = "SELECT * FROM `Resources` WHERE `id`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "Resources not found!";

        res.render('resourceedit.ejs', { data: result, message: message });
    });
};