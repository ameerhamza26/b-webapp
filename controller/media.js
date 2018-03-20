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
        var sql = "SELECT `id`, `name` FROM `countries`";
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
        if (result) {
            if(result.length >= 0){
                res.render('localmedia.ejs',{data: result});
            } else{
                res.render('localmedia.ejs',{data:[]})
            }
        } else{
            res.render('localmedia.ejs',{data:[]})
        }

    });
}



exports.search = function(req,res) {
    var message = '';
    var text = req.query.text;
    
    var sql = "select localmedia.*, cities.`name` as CityName, states.`name` as StateName, countries.`name` as CountryName  from countries \
    inner join \
    states \
    on countries.id = states.country_id \
    INNER JOIN \
    cities \
    on states.id = cities.state_id \
    inner JOIN \
    localmedia \
    on cities.id = localmedia.CityId \
    where cities.`name` like '%" + text+ "%' or \
    states.`name` like '%" + text+ "%' or \
    countries.`name` like '%" + text+ "%'";
    
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