var config = require('../config');
var mysql = require('promise-mysql');

exports.create = function(req,res) {
    message = '';
    if(req.method == "POST"){
       var post  = req.body;
       var title= post.title;
       var description= post.description;
 
       
       title = title.replace(/'/g, '\\\'');
       description = description.replace(/'/g, '\\\'');

       if (!req.files)
                 return res.status(400).send('No files were uploaded.');
 
         var file = req.files.uploaded_image;
         if (typeof file == "undefined") {
            res.cookie('message', 'Please upload an image! ')
            res.cookie('icon', 'error')
            res.cookie('heading', 'Error')
            res.render('causes.ejs',{message: message});
        }
        else {
            var img_name=file.name;
 
            if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                  
               file.mv('public/images/upload_images/'+file.name, function(err) {
                              
                   if (err)
 
                     return res.status(500).send(err);
                           var sql = "INSERT INTO `causes`(`Title`,`Description`,`Image`) VALUES ('" + title + "','" + description + "','" + img_name + "')";
 
                             var query = db.query(sql, function(err, result) {
                                 
                                  res.cookie('message', 'Cause is successfully created.')
                                  res.cookie('icon', 'success')
                                  res.cookie('heading', 'Success')
                                  res.redirect('/home');
                             });
                        });
           } else {
             message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
             res.cookie('message', message)
             res.cookie('icon', 'error')
             res.cookie('heading', 'Error')
             res.render('causes.ejs',{message: message});
           }
        }
         
    } else {
       res.render('causes');
    } 
}



exports.edit = function(req, res){
    var message = '';
    var id = req.params.id;
    if(req.method == "POST"){
        var sql = "";
        var post  = req.body;
        var title= post.title;
        var description= post.description;
        
       title = title.replace(/'/g, '\\\'');
       description = description.replace(/'/g, '\\\'');
       
        if (!req.files) {
            console.log("in if")
            sql = "update `cause` set Title = '"+ title+"' , description = '" + description+ "' where id = " + id;
           // var sql = "INSERT INTO `causes`(`Title`,`Description`,`Image`) VALUES ('" + title + "','" + description + "','" + img_name + "')";
            
            var query = db.query(sql, function(err, result) {
                    res.cookie('message', 'Cause is successfully updated.')
                    res.cookie('icon', 'success')
                    res.cookie('heading', 'Success')
                   return res.redirect('/home');
            });
        }
                 // return res.status(400).send('No files were uploaded.');
  
          var file = req.files.uploaded_image;
          if (typeof file == "undefined") {
            console.log("in if")
            sql = "update `causes` set Title = '"+ title+"' , description = '" + description+ "' where id = " + id;
           // var sql = "INSERT INTO `causes`(`Title`,`Description`,`Image`) VALUES ('" + title + "','" + description + "','" + img_name + "')";
            
            var query = db.query(sql, function(err, result) {
                console.log("Err",err);

                
                res.cookie('message', 'Cause is successfully updated.')
                res.cookie('icon', 'success')
                res.cookie('heading', 'Success')
                    res.redirect('/home');
            });
          }
          else {
            var img_name=file.name;
            
          
                       if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                             
                          file.mv('public/images/upload_images/'+file.name, function(err) {
                                         
                              if (err)
            
                                return res.status(500).send(err);
                                      
                                      sql = "update `causes` set Title = '"+ title+"' , description = '" + description+ "' , image = '"+ img_name + "' where id = " + id;
            
                                        var query = db.query(sql, function(err, result) {
                                            
                                                res.cookie('message', 'Cause is successfully updated.')
                                                res.cookie('icon', 'success')
                                                res.cookie('heading', 'Success')
                                                res.redirect('/home');
                                        });
                                   });
                      } else {
                        message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
                        res.render('causeedit.ejs',{message: message});
                      }
          }

    }
    else {
        var sql="SELECT * FROM `causes` WHERE ID ="+id; 
        db.query(sql, function(err, result){
          if(result.length <= 0)
          message = "Cause not found!";
          
          res.render('causeedit.ejs',{causes:result, message: message});
       });
    }
};


exports.list = function(req,res){
    var sql = "Select * From causes order by ID desc";
    console.log("Sql", sql);
    db.query(sql, function(err, result){
        if(result.length >= 0){
            res.send({data: result});
        }else{
            res.send({data:[]})
        }

    });

}

exports.getDonationUrlsByCause = function(req,res) {
    var message = '';
    var id = req.params.causeId;
    var sql = "SELECT * FROM `donationurls` WHERE `CauseId`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "donationurls not found!";
      
        res.send({ data: result, message: message });
    });
}

exports.search = function(req,res) {
    var message = '';
    var title = req.query.title;
    var causeId = req.params.causeId;

    var sql = "Select `events`.*, causes.Title as CauseTitle from \
    `events` INNER JOIN causes on `events`.CauseId = causes.ID where  \
    `events`.Title like '%" + title+"%' and causes.ID =" + causeId;
    
    var connection;
    mysql.createConnection(config.dbConfig).then(function(conn){
        connection = conn;
        var result = connection.query(sql);
        connection.end();
        return result;
    }).then(function(rows){
        res.send({data:rows});
    })
}

exports.getAll = function (req, res) {



}
