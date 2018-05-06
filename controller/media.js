var authentication =require('../helpers/authentication');

var mysql = require('promise-mysql');
var config = require('../config');

exports.create = function (req, res) {
    message = '';
    var causeId = req.params.causeId;
    if (req.method == "POST") {
        
        var post = req.body;
        var name = post.name;
        var contact = post.contact;

        var cityId = post.cityId;
        var stateId = post.stateId;
        var countryId = post.countryId;
                
        name = name.replace(/'/g, '\\\'');
        
        var file = req.files.uploaded_image;
        var img_name=file.name;

        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                  
            file.mv('public/images/upload_images/'+file.name, function(err) {
                           
                if (err)

                  return res.status(500).send(err);

                  var sql = "INSERT INTO `localmedia`(`Name`,`Contact`,`Image`,`CityId`, `StateId`, `CountryId`) VALUES ('" + name + "','" + contact + "','" + img_name + "'," + cityId + "," + stateId + "," + countryId + ")";

                    var query = db.query(sql, function (err, result) {
                        res.cookie('message', 'Local media is successfully created')
                        res.cookie('icon', 'success')
                        res.cookie('heading', 'Success')

                        res.redirect('/localmedia/'+causeId);
                    });

                });
        } else {
          message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
          res.render('addlocalmedia.ejs',{message: message});
        }


        
    } else {
        var sql = "SELECT `id`, `name` FROM `countries`";

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
            res.render('addlocalmedia',final_obj);
        })
    }
}


exports.edit = function (req, res) {
    var message = '';
    var id = req.params.id;
    var causeId = req.params.causeId;
    if (req.method == 'POST') {
        var post = req.body;
        var name = post.name;
        var contact = post.contact;

        var cityId = post.cityId;
        var stateId = post.stateId;
        var countryId = post.countryId;

        
        var file = req.files.uploaded_image;
        var sql = "";
        if (typeof file == "undefined") {
            console.log("in if")
           sql = "update `localmedia` set Name = '" + name+ "' , Contact = '" + contact + "' , \
           CityId =  " + cityId + " , StateId = " +stateId + " , CountryId = " + countryId + " \
            where id = " + id;
            
            
            var query = db.query(sql, function(err, result) {
                console.log("Err",err);

                        res.cookie('message', 'Local media is successfully updated')
                        res.cookie('icon', 'success')
                        res.cookie('heading', 'Success')
                    res.redirect('/localmedia');
            });
          }
          else {
            var img_name=file.name;

            if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                      
                file.mv('public/images/upload_images/'+file.name, function(err) {
                               
                    if (err)
    
                      return res.status(500).send(err);
    
                      sql = "update `localmedia` set Name = '" + name+ "' , Contact = '" + contact + "' , \
                      CityId =  " + cityId + " , StateId = " +stateId + " , CountryId = " + countryId + " , Image = '"+ img_name + "' \
                       where id = " + id;
                        var query = db.query(sql, function (err, result) {
                            console.log("errr",err);


                            res.cookie('message', 'Local media is successfully updated')
                            res.cookie('icon', 'success')
                            res.cookie('heading', 'Success')
                            res.redirect('/localmedia');
                        });
    
                    });
            } else {
              message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
              res.render('localmediaedit.ejs',{message: message});
            }
    
    
          }


    }
    else {
        var sql = "SELECT * FROM `localmedia` WHERE `id`='" + id + "'";
        var final_obj = {};
        var connection;
        mysql.createConnection(config.dbConfig).then(function(conn){
            connection = conn;
            var result = connection.query(sql);
       
            return result;
        }).then(function(rows){
            final_obj.data = rows;
            sql = "SELECT * FROM `countries`";
            result = connection.query(sql);
            // Logs out a list of hobbits
            //connection.end();
            return result;
        }).then(function(rows) {
            final_obj.countries = rows
            sql = "SELECT * FROM `states` where country_id = " + final_obj.data[0].CountryId;
            result = connection.query(sql);
            // Logs out a list of hobbits
            //connection.end();
            return result;
        }).then(function(rows) {
            final_obj.states = rows
            sql = "SELECT * FROM `cities` where state_id =  " + final_obj.data[0].StateId;
            result = connection.query(sql);
            // Logs out a list of hobbits
            //connection.end();
            return result;
        }).then(function(rows) {
            final_obj.cities = rows;
            sql = "SELECT * FROM causes where ID =  " + causeId;
            result = connection.query(sql);
            // Logs out a list of hobbits
            //connection.end();
            return result;

        }).then(function(rows) {
            final_obj.causes = rows;
            final_obj.message = message;
            // Logs out a list of hobbits
            connection.end();
            
            res.render('localmediaedit.ejs', final_obj);
            return result;
        })

    }
};


exports.get =function(req,res) {

    if (!authentication.authenticate(req)){
        res.redirect("/login");
        return;
    }

    var sql = "";
    var causeId = req.params.causeId;
    
    if (req.query.title) {
        title= req.query.title;
        sql = "Select * from localmedia";
    }
    else {
        sql = "Select * from localmedia";
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
        res.render('localmedia',final_obj);
    })

}



exports.search = function(req,res) {
    var message = '';
    var text = req.query.text;
    var causeId = req.params.causeId;
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