var authentication =require('../helpers/authentication');

exports.create = function (req, res) {
    message = '';
    if (req.method == "POST") {
        
        var post = req.body;
        var name = post.name;
        var contact = post.contact;

        var cityId = post.cityId;
        var stateId = post.stateId;
        var countryId = post.countryId;

        
        var file = req.files.uploaded_image;
        var img_name=file.name;

        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                  
            file.mv('public/images/upload_images/'+file.name, function(err) {
                           
                if (err)

                  return res.status(500).send(err);

                  var sql = "INSERT INTO `LocalMedia`(`Name`,`Contact`,`Image`,`CityId`, `StateId`, `CountryId`) VALUES ('" + name + "','" + contact + "','" + img_name + "'," + cityId + "," + stateId + "," + countryId + ")";

                    var query = db.query(sql, function (err, result) {
                        res.redirect('/localmedia/edit/'+result.insertId);
                    });

                });
        } else {
          message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
          res.render('addlocalmedia.ejs',{message: message});
        }


        
    } else {
        var sql = "SELECT `id`, `name` FROM `Countries`";
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Countries not found!";
    
            res.render('addlocalmedia.ejs', { data: result, message: message });
        });
    }
}


exports.edit = function (req, res) {
    var message = '';
    var id = req.params.id;
    var sql = "SELECT * FROM `LocalMedia` WHERE `id`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "LocalMedia not found!";
      
        res.render('localmediaedit.ejs', { data: result, message: message });
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
        sql = "Select * from LocalMedia";
    }
    else {
        sql = "Select * from LocalMedia";
    }
    
    db.query(sql, function(err, result){
        if(result.length >= 0){
            res.render('localmedia.ejs',{data: result});
        }else{
            res.render('localmedia.ejs',{data:[]})
        }
    });
}
